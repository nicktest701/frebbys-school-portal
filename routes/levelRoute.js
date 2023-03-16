const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Level = require("../models/levelModel");
const Examination = require("../models/examinationModel");
const CurrentLevelDetails = require("../models/currentLevelDetailModel");
const CurrentLevel = require("../models/currentLevelModel");
const _ = require("lodash");
const {
  Types: { ObjectId },
} = require("mongoose");

//@GET all current level by current school session
router.get(
  "/session",
  asyncHandler(async (req, res) => {
    const { session, term } = req.query;
    const levels = await Level.find({
      session: ObjectId(session),
      term: ObjectId(term),
      active: true,
    });

    // console.log(levels);

    res.status(200).json(levels);
  })
);

router.post(
  "/students/all",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, type } = req.body;

    const AllStudents = await Level.find({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
    })
      .populate("level")
      .populate({
        path: "students",
        match: { active: true },
      });

    if (!AllStudents) {
      return res.status(200).json([]);
    }

    if (type === "search") {
      const modifiedStudents = AllStudents.flatMap(
        ({ _id, students, level }) => {
          return students.map((student) => {
            const fullName = _.startCase(
              `${student?.surname} ${student?.firstname} ${student?.othername}`
            );
            return {
              id: student?._id,
              fullName,
              levelId: _id,
              levelName: `${level?.name}${level.type}`,
            };
          });
        }
      );

      return res.status(200).json(modifiedStudents);
    }

    const modifiedStudents = AllStudents.flatMap(({ _id, students, level }) => {
      return students.map((student) => {
        const fullName = _.startCase(
          `${student?.surname} ${student?.firstname} ${student?.othername}`
        );
        return {
          ...student._doc,
          fullName,
          levelId: _id,
          levelName: `${level?.name}${level.type}`,
        };
      });
    });

    res.status(200).json(modifiedStudents);
  })
);

//@GET all students by current level Details
router.post(
  "/students",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, levelId } = req.body;

    const students = await Level.findOne({
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

//Generate next term level details if not exists
router.post(
  "/generate",
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.body;

    //FInd if current level exists
    const currentLevels = await Level.find({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
    });

    if (!_.isEmpty(currentLevels)) {
      return res.status(200).json([]);
    }

    //find prevoius levels
    //FInd if levels exists
    const levels = await Level.find({
      session: ObjectId(sessionId),
    });

    if (_.isEmpty(levels)) {
      return res.status(200).json([]);
    }

    //GET all existing students
    const previousLevels = await Level.find({
      session: ObjectId(sessionId),
    }).populate({
      path: "students",
      match: { active: true },
    });

    const selectedLevels = previousLevels.map(
      ({ level, subjects, students }) => {
        return {
          level,
          subjects,
          students,
          levelName: `${level.name}${level.type}`,
        };
      }
    );

    // //Merge all levels with same name
    const mergedLevels = _.values(
      _.merge(_.keyBy(selectedLevels, "levelName"))
    );

    //GENERATE New Level info
    const students = mergedLevels.map(({ level, subjects, students }) => {
      return {
        session: ObjectId(sessionId),
        term: ObjectId(termId),
        level,
        subjects,
        students: _.uniqWith(students, _.isEqual),
        rollNumber: students?.length || 0,
        attendance: 0,
      };
    });

    //ADD Students to new class
    const newLevels = await Level.insertMany(students);

    //GENERATE examination info of students
    const newStudents = newLevels.flatMap(({ _id, students }) => {
      return students.map((student) => {
        return {
          session: sessionId,
          term: termId,
          level: _id,
          student: student?._id,
          scores: [],
          overallScore: 0,
          comment: {},
        };
      });
    });

    await Examination.insertMany(newStudents);

    res.sendStatus(201);
  })
);
//@GET all current level by current school session
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const id = req.query.id;
    const level = await Level.findById(id).populate({
      path: "students",
      match: { active: true },
    });

    if (level.students?.length !== 0) {
      const modifiedStudents = level?.students.map((student) => {
        return {
          ...student?._doc,
          fullName: _.startCase(
            `${student?.surname} ${student?.firstname} ${student?.othername}`
          ),
          levelId: id,
          levelName: `${level.level?.name}${level.level?.type}`,
        };
      });

      const modifiedLevel = {
        ...level?._doc,
        students: modifiedStudents,
      };
      // console.log(modifiedLevel);
      return res.status(200).json(modifiedLevel);
    }

    res.status(200).json(level);
  })
);

//@POST add new level to current school session
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newLevel = req.body;

    // console.log(newLevel);

    const level = await Level.create(newLevel);

    if (_.isEmpty(level)) {
      return res.status(404).json("Error creating new levels.Try again later");
    }
    console.log("---------------------level-----------------------------");
    console.log(level);

    res.status(201).json("New Level created successfully!!!");
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const updatedLevel = req.body;
    const level = await Level.findByIdAndUpdate(req.body.id, updatedLevel);
    if (_.isEmpty(level)) {
      return res.status(404).json("Error updating level info.Try again later");
    }

    res.status(201).json("Level details updated successfully!!!");
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, id } = req.query;
    const deletedLevel = await Level.findByIdAndRemove(id);

    if (_.isEmpty(deletedLevel)) {
      return res.status(404).json("Error removing level info.Try again later");
    }
    await CurrentLevelDetails.findOneAndUpdate(
      {
        session: ObjectId(sessionId),
        term: ObjectId(termId),
        level: ObjectId(id),
      },
      {
        $set: {
          active: false,
        },
      }
    );

    await CurrentLevel.findOneAndUpdate(
      {
        session: ObjectId(sessionId),
        term: ObjectId(termId),
        level: ObjectId(id),
      },
      {
        $set: {
          active: false,
        },
      }
    );

    res.status(201).json(" Level has been removed successfully!!!");
  })
);

//@GET all current level by current level id
router.get(
  "/previous",
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.query;
    const previousLevels = await Level.find({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
    })
      .select("level")
      .populate({
        path: "students",
        match: { active: true },
      });

    res.status(200).json(previousLevels);
  })
);

// router.delete(
//   "/",
//   asyncHandler(async (req, res) => {
//     const { sessionId, termId, id } = req.query;
//     const deletedLevel = await Level.findByIdAndRemove(id);

//     if (_.isEmpty(deletedLevel)) {
//       return res.status(404).json("Error removing level info.Try again later");
//     }
//     await CurrentLevelDetails.findOneAndRemove({
//       session: ObjectId(sessionId),
//       term: ObjectId(termId),
//       level: ObjectId(id),
//     });

//     await CurrentLevel.findOneAndRemove({
//       session: ObjectId(sessionId),
//       term: ObjectId(termId),
//       level: ObjectId(id),
//     });

//     res.status(201).json(" Level has been removed successfully!!!");
//   })
// );

router.post(
  "/delete/many",
  asyncHandler(async (req, res) => {
    const ids = req.body.ids;
    const deletedLevels = await Level.deleteMany(ids);

    if (_.isEmpty(deletedLevels)) {
      return res.status(404).json("Error removing levels info.Try again later");
    }

    res.status(201).json(" Levels have been removed successfully!!!");
  })
);

////////////......................SUBJECTS........................\\\\\\\\\\\\\\

//@GET all current subjects by level id
router.get(
  "/subject",
  asyncHandler(async (req, res) => {
    const levelId = req.query.levelId;
    console.log(levelId);
    const subjects = await Level.findById(levelId).select("subjects");
    console.log(subjects);

    res.status(200).json(subjects);
  })
);

//@POST add new subjects to current level

router.put(
  "/subject",
  asyncHandler(async (req, res) => {
    const { levelId, subjects } = req.body;
    const newSubjects = await Level.findByIdAndUpdate(levelId, {
      subjects,
    });
    if (_.isEmpty(newSubjects)) {
      return res
        .status(404)
        .send("Error creating new Subjects.Try again later");
    }

    res.status(201).json("Subjects have been updated successfully!!!");
  })
);

//@GET Teacher current level
router.post(
  "/assign-teacher",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, teacher } = req.body;

    const level = await Level.findOne({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
      teacher: ObjectId(teacher),
    }).populate("level");

    const modifiedLevel = {
      _id: level?._id || "",
      type: `${level?.level?.name}${level?.level?.type}` || "",
    };

    res.status(200).json(modifiedLevel);
  })
);

//@PUT Assign a Teacher
router.put(
  "/assign-teacher",
  asyncHandler(async (req, res) => {
    const level = await Level.findByIdAndUpdate(
      req.body._id,
      {
        $set: {
          teacher: ObjectId(req.body.teacher),
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(level)) {
      return res.status(404).json("Error assigning Level.Try again later");
    }

    res.status(201).json("Level has been assigned successfully!!!");
  })
);

router.put(
  "/unassign-teacher",
  asyncHandler(async (req, res) => {
    const id = req.body._id;
    const level = await Level.findByIdAndUpdate(
      id,
      {
        $set: {
          teacher: null,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(level)) {
      return res.status(404).json("Error updating info.Try again later");
    }

    res.status(201).json("Level has been removed successfully!!!");
  })
);

module.exports = router;
