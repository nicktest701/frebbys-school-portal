const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const CurrentLevel = require("../models/currentLevelModel");
const _ = require("lodash");
const {
  Types: { ObjectId },
} = require("mongoose");

//@GET all current level by current school session
router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log(req.query);
    const sessionId = req.query.sessionId;
    const termId = req.query.termId;

    const currentLevels = await CurrentLevel.find({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
      active: true,
    }).populate("level");

    const modifiedCurrentLevel = currentLevels.map(
      ({ _id, level, students }) => {
        return {
          _id,
          levelId: level?._id,
          levelType: level.type,
          noOfStudents: students.length,
        };
      }
    );

    console.log(modifiedCurrentLevel);

    res.status(200).json(modifiedCurrentLevel);
  })
);
//@GET all current level by current level id
router.get(
  "/current",
  asyncHandler(async (req, res) => {
    const currentLevelId = req.query.currentLevelId;
    const currentLevel = await CurrentLevel.findById(currentLevelId);

    // console.log(currentLevel);

    res.status(200).json(currentLevel);
  })
);

//@GET all current level by current level id
router.get(
  "/previous",
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.query;
    const currentLevel = await CurrentLevel.find({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
    })
      .select("levelType")
      .populate({
        path: "students",
        match: { active: true },
      });

    res.status(200).json(currentLevel);
  })
);

//@GET all students by session
router.post(
  "/students/all",
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.body;

    const students = await CurrentLevel.find({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
    })
      .populate("level")
      .populate({
        path: "students",
        // match: { active: true },
      });

    if (!students) {
      return res.status(200).json([]);
    }

    const modifiedStudents = students.flatMap(
      ({ students, level, levelType }) => {
        return students.map((student) => {
          const fullName = _.startCase(
            `${student?.surname} ${student?.firstname} ${student?.othername}`
          );
          return {
            ...student._doc,
            fullName,
            levelId: level._id,
            levelName: levelType,
          };
        });
      }
    );

    res.status(200).json(modifiedStudents);
  })
);
//@GET all student by current level Details
router.post(
  "/student",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, levelId } = req.body;

    const students = await CurrentLevel.findOne({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
      level: ObjectId(levelId),
    }).select("students");

    if (!students) {
      return res.status(200).json([]);
    }

    if (students?.students?.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(students);
  })
);
//@GET all students by current level Details
router.post(
  "/students",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, levelId } = req.body;

    const students = await CurrentLevel.findOne({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
      level: ObjectId(levelId),
    })
      .populate("level")
      .populate({
        path: "students",
        match: { active: true },
      });

    if (_.isEmpty(students)) {
      return res.status(200).json([]);
    }

    const modifiedStudents = students.students.map((student) => {
      const fullName = _.startCase(
        `${student?.surname} ${student?.firstname} ${student?.othername}`
      );
      return {
        ...student?._doc,
        fullName,
        levelId: students.level._id,
        levelName: students.level.type,
      };
    });

    const modifiedCurrentLevel = {
      _id: students._id,
      students: modifiedStudents,
    };

    res.status(200).json(modifiedCurrentLevel);
  })
);

//@GET all current subjects by current level id
router.get(
  "/subjects/all",
  asyncHandler(async (req, res) => {
    const currentLevelId = req.query.currentLevelId;
    const subjects = await CurrentLevel.findById(currentLevelId).select(
      "subjects"
    );

    res.status(200).json(subjects);
  })
);

//@POST add new level to current school session
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newLevel = req.body;
    const levels = await CurrentLevel.create(newLevel);
    if (!levels) {
      return res.status(404).send("Error creating new levels.Try again later");
    }

    res.send(levels);
  })
);

//@POST add new subjects to current level

router.put(
  "/subjects",
  asyncHandler(async (req, res) => {
    const { currentLevelId, subjects } = req.body;
    const newSubjects = await CurrentLevel.findByIdAndUpdate(currentLevelId, {
      subjects,
    });
    if (!newSubjects) {
      return res
        .status(404)
        .send("Error creating new new Subjects.Try again later");
    }

    res.send(newSubjects);
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const updatedSession = req.body;
    const session = await CurrentLevel.findByIdAndUpdate(
      req.body._id,
      updatedSession
    );
    if (!session) {
      return res
        .status(404)
        .send("Error updating session info.Try again later");
    }

    res.send(session);
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const _id = req.query._id;
    await CurrentLevel.findByIdAndRemove(_id);

    res.sendStatus(201);
  })
);

module.exports = router;
