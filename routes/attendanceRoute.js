const router = require("express").Router();
const _ = require("lodash");
const asyncHandler = require("express-async-handler");
const Attendance = require("../models/attendanceModel");
const {
  Types: { ObjectId },
} = require("mongoose");

//@GET All school Attendance
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const attendance = await Attendance.find({ active: true });
    if (_.isEmpty(attendance)) {
      return res.status(200).json([]);
    }

    res.status(200).json(attendance);
  })
);

//@GET School Attendance by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;
    console.log(id, date);
    const attendance = await Attendance.findOne({
      level: ObjectId(id),
      date,
    });

    res.status(200).json(attendance);
  })
);

//Add new School Attendance
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { date, level } = req.body;

    //Find if a attendance already exits
    const exists = await Attendance.findOne({
      level: ObjectId(level),
      date: date,
      active: true,
    });

    if (!_.isEmpty(exists)) {
      return res.status(400).json("Attendance already exists.");
    }

    //Create new Attendance
    const attendance = await Attendance.create(req.body);
    if (_.isEmpty(attendance)) {
      return res
        .status(404)
        .json("Error creating new attendance.Try again later!!!");
    }

    return res.status(201).json("New Attendance created Successfully!!!");
  })
);

//@PUT Update Existing School Attendance
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const modifiedAttendance = await Attendance.findByIdAndUpdate(
      req.body.id,
      req.body
    );

    if (_.isEmpty(modifiedAttendance)) {
      return res
        .status(404)
        .send("Error updating attendance info.Try again later");
    }

    res
      .status(201)
      .json("Attendance information has been updated successfully!!!");
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedAttendance = await Attendance.findByIdAndUpdate(id, {
      $set: {
        active: false,
      },
    });

    if (_.isEmpty(deletedAttendance)) {
      return res
        .status(404)
        .json("Error removing attendance info.Try again later");
    }

    res.status(201).json(" Attendance have been removed successfully!!!");
  })
);

// router.delete(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const deletedAttendance = await Attendance.findByIdAndRemove(id);

//     if (_.isEmpty(deletedAttendance)) {
//       return res
//         .status(404)
//         .json("Error removing attendance info.Try again later");
//     }

//     res.status(201).json(" Attendance have been removed successfully!!!");
//   })
// );

module.exports = router;
