const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Examination = require("../models/examinationModel");
const CurrentLevelDetail = require("../models/currentLevelDetailModel");
const _ = require("lodash");
const ordinal = require("ordinal-suffix");
const getPosition = require("../config/rank");
const {
  Types: { ObjectId },
} = require("mongoose");

//@GET

router.get(
  "/details",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, levelId } = req.query;

    //GET all Students scores
    const students = await Examination.find({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
      level: ObjectId(levelId),
    })
      .populate("level", "subjects")
      .select("overallScore");

    if (_.isEmpty(students)) {
      return res.status(200).json({
        noOfStudents: 0,
        highestMarks: 0,
        lowestMarks: 0,
        averageMarks: 0,
        passStudents: 0,
        failStudents: 0,
      });
    }

    const examsDetails = {
      noOfStudents: students.length ?? 0,
      highestMarks: _.maxBy(students, "overallScore").overallScore ?? 0,
      lowestMarks: _.minBy(students, "overallScore").overallScore ?? 0,
      averageMarks: _.sumBy(students, "overallScore") / students.length ?? 0,
    };

    //FIND Numnber of subjects
    const noOfSubjects = students[0]?.level?.subjects?.length ?? 0;
    //Calculate cumulative marks
    let passMark = (noOfSubjects * 100) / 2;

    const studentsAboveAverage = [];
    const studentsBelowAverage = [];

    students.forEach(({ overallScore }) => {
      if (overallScore >= passMark) {
        studentsAboveAverage.push(overallScore);
      } else {
        studentsBelowAverage.push(overallScore);
      }
    });
    examsDetails.passStudents = studentsAboveAverage.length ?? 0;
    examsDetails.failStudents = studentsBelowAverage.length ?? 0;

    res.status(200).json(examsDetails);
  })
);

//@GET
router.get(
  "/student",
  asyncHandler(async (req, res) => {
    const { examsId } = req.query;
    const studentRecord = await Examination.findById(examsId)
      .populate("term")
      .populate("level")
      .populate("student");

    const { _id, term, level, student, scores, overallScore, comments } =
      studentRecord;
    const modifiedStudentRecord = {
      _id,
      academicYear: term.academicYear,
      term: term.term,
      vacationDate: term.vacationDate,
      reOpeningDate: term.reOpeningDate,
      rollNumber: level.rollNumber,
      totalLevelAttendance: level.attendance,
      fullName: _.startCase(
        `${student.surname} ${student.firstname} ${student.othername}`
      ),
      level: level.level?.name,
      levelId: level._id,
      profile: student.profile,
      scores,
      overallScore,
      comments,
    };

    res.status(200).json(modifiedStudentRecord);
  })
);

//@GET Current exams Details

router.post(
  "/student/current",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, studentId, levelId } = req.body;
    const studentRecord = await Examination.findOne({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
      student: ObjectId(studentId),
    })
      .populate("term")
      .populate("level")
      .populate("student");

    if (_.isEmpty(studentRecord)) {
      return res.status(200).json({});
    }

    const allStudentsOverallScore = await Examination.find({
      level: ObjectId(levelId),
    }).select("overallScore");

    const { _id, term, level, student, scores, overallScore, comments } =
      studentRecord;

    //GET student position
    const positions = getPosition(allStudentsOverallScore);

    const position =
      positions.find((exams) => {
        console.log(exams._id);
        return exams._id.toString() === _id.toString();
      }).position || "";

    const modifiedStudentRecord = {
      _id,
      academicYear: term.academicYear,
      term: term.term,
      vacationDate: term.vacationDate,
      reOpeningDate: term.reOpeningDate,
      rollNumber: level.students?.length,
      totalLevelAttendance: level.attendance,
      fullName: _.startCase(
        `${student?.surname} ${student?.firstname} ${student?.othername}`
      ),
      level: `${level?.level?.name}${level?.level?.type}`,
      levelId: level?._id,
      profile: student?.profile,
      scores,
      overallScore,
      position: ordinal(position),
      comments,
    };
    // console.log(modifiedStudentRecord);

    res.status(200).json(modifiedStudentRecord);
  })
);

router.post(
  "/student/all",
  asyncHandler(async (req, res) => {
    const { session, term, level, student } = req.body;

    //find if current term exams details exists
    const exists = await Examination.findOne({
      session: ObjectId(session),
      level: ObjectId(level),
      term: ObjectId(term),
      student: ObjectId(student),
    });

    //create new exams Details for the term
    if (_.isEmpty(exists)) {
      await Examination.create({
        session,
        term,
        level,
        student,
        scores: [],
        overallScore: 0,
      });
    }

    const examination = await Examination.find({
      student: ObjectId(student),
    })
      .populate("term")
      .populate("session")
      .populate("level");

    const modifiedTerms = examination.map(({ _id, session, term, level }) => {
      return {
        _id,
        academicYear: session.academicYear,
        term: term.term,
        levelName: `${level.level?.name}${level.level?.type}`,
        subjects: level.subjects,
      };
    });

    //Group selected terms in ascending order
    const groupedTerms = _.groupBy(
      _.sortBy(modifiedTerms, "term"),
      "academicYear"
    );

    res.status(200).json(Object.entries(groupedTerms));
  })
);

//@POST

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newExamsScore = req.body;

    // Find if student exam details exists
    const examsInfo = await Examination.findById(newExamsScore.examsId);

    // Merge scores with  with same subjects
    const newScores = _.merge(
      _.keyBy([...examsInfo.scores, ...newExamsScore.scores], "subject")
    );

    const updatedScores = await Examination.findByIdAndUpdate(
      examsInfo._id,
      {
        $set: {
          scores: _.values(newScores),
          overallScore: _.sumBy(newScores, "totalScore"),
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.json(updatedScores);
  })
);

router.post(
  "/update",
  asyncHandler(async (req, res) => {
    const { session, scores } = req.body;

    // Find if student exam details exists
    const examsInfo = await Examination.findOne({
      session: ObjectId(session.sessionId),
      term: ObjectId(session.termId),
      student: ObjectId(session.studentId),
      // level: ObjectId(session.levelId),
    });

    if (_.isEmpty(examsInfo)) {
      const currentLevelDetail = await CurrentLevelDetail.findOne({
        session: ObjectId(session.sessionId),
        term: ObjectId(session.termId),
        level: ObjectId(session.levelId),
        active: true,
      });

      await Examination.create({
        session: ObjectId(session.sessionId),
        term: ObjectId(session.termId),
        level: ObjectId(session.levelId),
        currentLevelDetails: currentLevelDetail._id,
        student: ObjectId(session.studentId),
        scores,
        overallScore: _.sumBy(scores, "totalScore"),
        active: true,
      });

      return res
        .status(201)
        .json("Exams Scores has been updated successfully!!!");
    }

    // Merge scores with  with same subjects
    const newScores = _.merge(
      _.keyBy([...examsInfo?.scores, ...scores], "subject")
    );

    const latestScores = _.values(newScores);

    await Examination.findByIdAndUpdate(
      examsInfo._id,
      {
        $set: {
          scores: latestScores,
          overallScore: _.sumBy(latestScores, "totalScore"),
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(201).json("Exams Scores has been updated successfully!!!");
  })
);

//@PUT

router.put(
  "/",
  asyncHandler(async (req, res) => {})
);

//@POST

router.put(
  "/comments",
  asyncHandler(async (req, res) => {
    const newExamsScore = req.body;

    const updatedScores = await Examination.findByIdAndUpdate(
      newExamsScore._id,
      {
        comments: newExamsScore.comments,
      },
      {
        upsert: true,
        new: true,
      }
    );
    if (_.isEmpty(updatedScores)) {
      return res.status(400).json("Error saving remarks.Try again later!!!");
    }

    res.status(201).json(updatedScores.comments);
  })
);

//@DELETE

router.delete(
  "/",
  asyncHandler(async (req, res) => {})
);

module.exports = router;
