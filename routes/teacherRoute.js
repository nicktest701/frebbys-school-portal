const router = require("express").Router();
const AsyncHandler = require("express-async-handler");
const crypto = require("crypto");
const mongoose = require("mongoose");
const createError = require("http-errors");
const {
  Types: { ObjectId },
} = require("mongoose");
const _ = require("lodash");
const multer = require("multer");
const Teacher = require("../models/teacherModel");

//
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/teachers/");
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split(".")[1];

    cb(null, `${crypto.randomUUID()}.${ext}`);
  },
});
const upload = multer({ storage: Storage });

//-------------------------------------------------------------------------------

//@GET All teachers
router.get(
  "/",
  AsyncHandler(async (req, res) => {
    const teachers = await Teacher.find({});

    if (_.isEmpty(teachers)) {
      return res.status(200).json([]);
    }

    const modifiedTeachers = teachers.map((teacher) => {
      return {
        ...teacher._doc,
        fullName: _.startCase(
          `${teacher?.surname} ${teacher?.firstname} ${teacher?.othername}`
        ),
      };
    });
    res.status(200).json(modifiedTeachers);
  })
);

//@GET Teacher by id
router.get(
  "/:id",
  AsyncHandler(async (req, res) => {
    const id = req.params.id;
    const teacher = await Teacher.findById(id);
    res.status(200).json(teacher);
  })
);

//@POST Teacher
router.post(
  "/",
  upload.single("profile"),
  AsyncHandler(async (req, res) => {
    const newTeacher = req.body;
    newTeacher.profile = req.file.filename;
    const teacher = await Teacher.create(newTeacher);

    if (_.isEmpty(teacher)) {
      return res.status(404).json("Couldnt save Teacher info.Try again.");
    }

    res.status(201).json("New Teacher info has been saved successfully!!!");
  })
);
//@POST Update Teacher profile
router.put(
  "/profile",
  upload.single("profile"),
  AsyncHandler(async (req, res) => {
    const { _id } = req.body;

    const updatedTeacher = await Teacher.findByIdAndUpdate(_id, {
      $set: {
        profile: req.file?.filename,
      },
    });

    if (_.isEmpty(updatedTeacher)) {
      return res
        .status(400)
        .json("Error updating profile image.Try again later.");
    }

    res.status(201).json("Profile image updated!!!");
  })
);

//@PUT teacher
router.put(
  "/",
  AsyncHandler(async (req, res) => {
    const id = req.body._id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json("Invalid Teacher id");
    }

    const modifiedTeacher = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      modifiedTeacher,
      {
        upsert: true,
        new: true,
      }
    );

    if (_.isEmpty(updatedTeacher)) {
      return res.status(404).json("Couldnt update Teacher info.Try again.");
    }

    res.status(201).json("Teacher info has been updated successfully!!!");
  })
);

//@DELETE teacher
router.delete(
  "/:id",
  AsyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(403).json("Invalid information provided.");
    }

    const teacher = await Teacher.findByIdAndUpdate(id, {
      $set: { active: false },
    });

    if (_.isEmpty(teacher)) {
      return res.status(400).json("Couldn't remove Teacher info.Try again.");
    }
    res.status(200).json("Teacher has been removed successfully!!!");
  })
);

// //@DELETE teacher
// router.delete(
//   "/:id",
//   AsyncHandler(async (req, res) => {
//     const id = req.params.id;

//     if (!mongoose.isValidObjectId(id)) {
//       return res.status(403).json("Invalid information provided.");
//     }

//     const teacher = await Teacher.findByIdAndRemove(id);

//     if (_.isEmpty(teacher)) {
//       return res.status(400).json("Couldn't remove Teacher info.Try again.");
//     }
//     res.status(200).json("Teacher has been removed successfully!!!");
//   })
// );

module.exports = router;
