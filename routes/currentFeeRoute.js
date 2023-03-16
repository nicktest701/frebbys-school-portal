const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const CurrentFee = require("../models/currentFeeModel");
const _ = require("lodash");
const {
  Types: { ObjectId },
} = require("mongoose");

//@GET All school current fees
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const currentFees = await CurrentFee.find();
    res.status(200).json(currentFees);
  })
);

//@GET School current Fees by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const currentFee = await CurrentFee.findById(req.params.id);
    res.status(200).json(currentFee);
  })
);

//GET Student fee History
router.post(
  "/history",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, levelId, studentId, feeId } = req.body;
    let studentFeeHistory = {};

    //Find All Student fee info
    if (feeId) {
      studentFeeHistory = await CurrentFee.findById(feeId)
        .populate("student")
        .populate("term")
        .populate("level")
        .populate("fee");
    } else {
      studentFeeHistory = await CurrentFee.findOne({
        session: ObjectId(sessionId),
        term: ObjectId(termId),
        level: ObjectId(levelId),
        student: ObjectId(studentId),
      })
        .populate("student")
        .populate("term")
        .populate("level")
        .populate("fee");
    }

    if (_.isEmpty(studentFeeHistory)) {
      return res.status(200).json({});
    }
    // console.log(studentFeeHistory);
    const { student, term, level, payment } = studentFeeHistory;

    const modifiedFeeHistory = {
      fullName: `${student?.surname} ${student?.firstname} ${student?.othername}`,
      profile: student?.profile,
      term: term.term,
      levelType: `${level?.level?.name}${level?.level?.type}`,
      payment: _.sortBy(payment, "date"),
    };

    res.status(200).json(modifiedFeeHistory);
  })
);

//GET Student All fee History
router.get(
  "/history/all",
  asyncHandler(async (req, res) => {
    const { student } = req.query;
    console.log(student);

    //Find All Student fee info
    const studentFeeHistory = await CurrentFee.find({
      student: ObjectId(student),
    })
      .populate("student")
      .populate("session")
      .populate("term")
      .populate("level")
      .populate("fee");

    if (_.isEmpty(studentFeeHistory)) {
      return res.status(200).json({});
    }
   

    const feeHistory = studentFeeHistory.map(
      ({ _id, term, level, session }) => {
        return {
          id: _id,
          academicYear: session.academicYear,
          term: term.term,
          levelId: level._id,
          levelType: `${level.level?.name}${level.level?.type}`,
        };
      }
    );

    // console.log(feeHistory);

    //Group selected terms in ascending order
    const groupedByTerms = _.groupBy(
      _.sortBy(feeHistory, "term"),
      "academicYear"
    );

    const currentStudent = studentFeeHistory[0]?.student;

    const allFeeHistory = {
      studentId: currentStudent?._id,
      fullName: `${currentStudent.surname} ${currentStudent.firstname} ${currentStudent.othername}`,
      profile: currentStudent.profile,
      fees: Object.entries(groupedByTerms),
    };

    res.status(200).json(allFeeHistory);
    // res.status(200).json(Object.entries(groupedByTerms));
  })
);

//GET Student fee info
router.post(
  "/student",
  asyncHandler(async (req, res) => {
    const { session, term, level, student } = req.body;
    let allStudentFee = [];

    //Find All Student fee info
    allStudentFee = await CurrentFee.find({
      student: ObjectId(student),
    })
      .populate("fee")
      .select("payment")
      .select("createdAt");

    console.log(allStudentFee);

    ///GET all fees for the terms
    const allFees = [];
    const allPaidAmount = [];
    const allFeesBalance = [];

    //GET total fees paid for each term and remaining
    const modifiedStudentFees = allStudentFee.map(
      ({ _id, fee, payment, createdAt }) => {
        //fees
        const fees = _.sumBy(fee?.amount, "amount");
        allFees.push(fees);

        ///all fees paid
        const amountPaid = _.sumBy(payment, "paid");
        allPaidAmount.push(amountPaid);

        //all fees balance
        const balance = _.sumBy(payment, "balance");
        allFeesBalance.push(balance);

        //outstanding fees
        const remaining = fees - amountPaid;
        return {
          id: _id,
          fees,
          amountPaid,
          remaining: remaining < 0 ? 0 : remaining,
          balance,
          createdAt,
        };
      }
    );

    console.log(modifiedStudentFees);

    //SUM All fees for all terms
    const totalFees = _.sum(allFees);
    const totalAmountPaid = _.sum(allPaidAmount);
    // const totalBalance = _.sum(allFeesBalance);
    const totalArreas = totalFees - totalAmountPaid;

    //Find Student Current fee info
    const currentStudentFee = await CurrentFee.findOne({
      session: ObjectId(session),
      term: ObjectId(term),
      level: ObjectId(level),
      student: ObjectId(student),
    })
      .populate("fee")
      .select("payment")
      .select("createdAt");

    //Check if current fee info is empty
    if (_.isEmpty(currentStudentFee)) {
      return res.status(200).json({
        all: modifiedStudentFees,
        current: {},
        totalFees,
        totalAmountPaid,
        totalArreas,
      });
    }

    //filter out prevoius terms fees
    const filteredFees = modifiedStudentFees.filter(
      ({ createdAt }) => createdAt < currentStudentFee.createdAt
    );
    console.log("previous fees");
    console.log(filteredFees);

    //GET total arreas of student for previous terms without current term
    const previousFees = _.sumBy(filteredFees, "fees");
    const previousAmountPaid = _.sumBy(filteredFees, "amountPaid");
    const previousArreas = previousFees - previousAmountPaid;

    //Fees for current term
    const fees = _.sumBy(currentStudentFee.fee?.amount, "amount");
    const amountPaid = _.sumBy(currentStudentFee.payment, "paid");
    const remainingFees = fees - amountPaid;
    const balance = _.sumBy(currentStudentFee.payment, "balance");

    const modifiedStudentCurrentFees = {
      id: currentStudentFee._id,
      fees,
      amountPaid,
      remaining: remainingFees < 0 ? 0 : remainingFees,
      balance,
      createdAt: currentStudentFee.createdAt,
    };

    res.status(200).json({
      all: filteredFees,
      current: modifiedStudentCurrentFees,
      totalFees: totalFees,
      totalAmountPaid: totalAmountPaid,
      totalArreas: previousArreas,
    });
  })
);

//Add new School current Fees
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { session, term, level, student, payment } = req.body;

    //Find Student Cuurent fee info
    const currentStudentFee = await CurrentFee.findOne({
      session: ObjectId(session),
      term: ObjectId(term),
      level: ObjectId(level),
      student: ObjectId(student),
    });

    if (_.isEmpty(currentStudentFee)) {
      //Create new current Fees
      const currentFee = await CurrentFee.create(req.body);

      //if Error adding new fees
      if (!currentFee) {
        return res
          .status(404)
          .send("Error creating new CurrentFee.Try again later");
      }

      return res.status(200).json(currentFee);
    }

    //Update existing fees for term
    const modifiedCurrentFee = await CurrentFee.findByIdAndUpdate(
      currentStudentFee._id,
      {
        $push: {
          payment: payment[0],
        },
      }
    );

    if (!modifiedCurrentFee) {
      return res.status(404).json("Error add new  Fees info.Try again later");
    }

    return res.status(200).json(modifiedCurrentFee);
  })
);

//@PUT Update Existing School current Fees
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const modifiedCurrentFee = await CurrentFee.findByIdAndUpdate(
      req.body.id,
      req.body
    );

    if (!modifiedCurrentFee) {
      return res
        .status(404)
        .send("Error updating current Fees info.Try again later");
    }

    res.send(modifiedCurrentFee);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await CurrentFee.findByIdAndRemove(id);

    res.sendStatus(201);
  })
);

module.exports = router;
