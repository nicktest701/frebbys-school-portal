const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Fee = require("../models/feeModel");
const Level = require("../models/levelModel");
const CurrentFee = require("../models/currentFeeModel");
const _ = require("lodash");
const {
  Types: { ObjectId },
} = require("mongoose");
const { currencyConverter } = require("../config/currencyConverter");

//@GET All school fees
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const fees = await Fee.find().populate("level");
    if (_.isEmpty(fees)) return res.status(200).json([]);

    const modifiedFees = fees.map(({ _id, level, amount }) => {
      return {
        _id,
        level: level.type,
        fees: currencyConverter(_.sumBy(amount, "amount")),
        amount,
      };
    });

    res.status(200).json(modifiedFees);
  })
);

//@GET All school fees by session
router.post(
  "/all",
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.body;

    const fees = await Fee.find({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
    }).populate("level");

    //Check if null
    if (_.isEmpty(fees)) return res.status(200).json([]);

    const modifiedFees = fees.map(({ _id, level, amount }) => {
      const total = _.sumBy(amount, "amount");
      const noOfStudents = level?.students?.length;
      return {
        _id,
        level: `${level?.level?.name}${level?.level?.type}`,
        fees: currencyConverter(total),
        noOfStudents,
        totalFees: currencyConverter(total * noOfStudents),
        amount,
      };
    });

    res.status(200).json(modifiedFees);
  })
);

//@GET  school fees by current level
router.post(
  "/current-level",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, level } = req.body;

    const fees = await Fee.findOne({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
      level: ObjectId(level),
    }).populate("level");

    //Check if null
    if (_.isEmpty(fees)) return res.status(200).json({});

    const modifiedFees = {
      id: fees?._id,
      level: fees?.level.type,
      fees: _.sumBy(fees?.amount, "amount"),
      amount: fees?.amount,
    };

    res.status(200).json(modifiedFees);
  })
);

//@GET  school fees by current level
router.post(
  "/current-level/all",
  asyncHandler(async (req, res) => {
    const { session, term } = req.body;

    const fees = await Fee.find({
      session: ObjectId(session),
      term: ObjectId(term),
    }).populate("level");

    //Check if null
    if (_.isEmpty(fees)) return res.status(200).json([]);

    const modifiedFee = fees.map(({ _id, level, amount }) => {
      return {
        feesId: _id,
        levelId: level?._id,
        levelType: `${level.level?.name}${level.level?.type}`,
        fees: _.sumBy(amount, "amount"),
      };
    });

    res.status(200).json(modifiedFee);
  })
);

//@GET School Fees by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const fee = await Fee.findById(req.params.id).populate("level");
    if (_.isEmpty(fee)) return res.status(200).json([]);

    const modifiedFee = {
      _id: fee._id,
      level: fee.level?.type,
      amount: fee.amount,
    };

    res.status(200).json(modifiedFee);
  })
);

//Add new School Fees
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { session, term, level } = req.body;
    console.log(req.body);
    //Create new Fees

    const exists = await Fee.findOne({
      session: ObjectId(session),
      term: ObjectId(term),
      level: ObjectId(level),
    });

    if (!_.isEmpty(exists)) {
      return res.status(404).send("Fees for this level already exists");
    }

    const fee = await Fee.create(req.body);

    if (_.isEmpty(fee)) {
      return res.status(404).send("Error creating new Fee.Try again later");
    }

    const currentStudents = await Level.findByIdAndUpdate(
      level,
      {
        $set: {
          fee: fee?._id,
        },
      },
      {
        new: true,
      }
    ).populate({
      path: "students",
      match: { active: true },
    });
    console.log(currentStudents);

    const modifiedStudents = currentStudents.students.map((student) => {
      return {
        session,
        term,
        level,
        student: student?._id,
        fee: fee._id,
      };
    });

    const studentCurrentFees = await CurrentFee.insertMany(modifiedStudents);

    console.log(studentCurrentFees);

    res.status(201).json("New Fee created");
  })
);

//@PUT Update Existing School Fees
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const modifiedFee = await Fee.findByIdAndUpdate(req.body._id, {
      amount: req.body.amount,
    });

    if (_.isEmpty(modifiedFee)) {
      return res.status(404).send("Error updating Fees info.Try again later");
    }

    res.status(201).json("Fee details has been updated successfully!!!");
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Fee.findByIdAndRemove(id);

    res.status(201).json("Fee has been removed successfully");
  })
);

// router.delete(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     await Fee.findByIdAndRemove(id);

//     res.sendStatus(201);
//   })
// );

module.exports = router;
