const router = require("express").Router();
const _ = require("lodash");
const asyncHandler = require("express-async-handler");
const Term = require("../models/termModel");
const Session = require("../models/sessionModel");
const {
  Types: { ObjectId },
} = require("mongoose");

//@GET All school Terms
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const terms = await Term.find({ active: true }).populate("session");

    if (_.isEmpty(terms)) {
      return res.status(200).json([]);
    }

    const modifiedTerms = terms.map((term) => {
      return {
        termId: term._id,
        sessionId: term?.session?._id,
        academicYear: term?.session?.academicYear,
        term: term.term,
        from: term?.from,
        to: term?.to,
        vacationDate: term.vacationDate,
        reOpeningDate: term.reOpeningDate,
      };
    });

    const sortedTerms = _.sortBy(modifiedTerms, ["academicYear", "term"]);

    res.status(200).json(sortedTerms);
  })
);

//@GET School Term by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const sessionId = req.query.sessionId;
    const term = await Term.findOne({
      session: ObjectId(sessionId),
      active: true,
    }).populate("session");
    res.status(200).json(term);
  })
);

//Add new School Term
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { academicYear, term } = req.body;

    //Find if a term already exits
    const exists = await Term.find({
      academicYear,
      term,
      active: true,
    });

    if (!_.isEmpty(exists)) {
      return res.status(400).json("Session already exists.");
    }

    //Find if a session already exits
    const session = await Session.findOne({ academicYear });

    if (!_.isEmpty(session)) {
      const sessionId = session._id;
      req.body.session = sessionId;

      //Create new Session with existing session id
      const term = await Term.create(req.body);
      if (_.isEmpty(term)) {
        return res
          .status(404)
          .json("Error creating new session.Try again later!!!");
      }

      return res.status(201).json("New Session created Successfully!!!");
    }

    //Create new Session
    const splittedAcademicYear = academicYear.split("/");
    const newSession = await Session.create({
      from: splittedAcademicYear[0],
      to: splittedAcademicYear[1],
      academicYear: req.body.academicYear,
    });

    if (_.isEmpty(newSession)) {
      return res
        .status(404)
        .json("Error creating new session.Try again later!!!");
    }
    //Create new term with new Session id
    req.body.session = newSession._id;
    const newTerm = await Term.create(req.body);

    if (_.isEmpty(newTerm)) {
      return res
        .status(404)
        .json("Error creating new session.Try again later!!!");
    }

    res.status(201).json("New Session created Successfully!!!");
  })
);

//@PUT Update Existing School Session
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const modifiedSession = await Term.findByIdAndUpdate(req.body.id, req.body);

    if (_.isEmpty(modifiedSession)) {
      return res
        .status(404)
        .send("Error updating session info.Try again later");
    }

    res
      .status(201)
      .json("Session information has been updated successfully!!!");
  })
);

//@PUT Update Existing School Session
router.put(
  "/enable",
  asyncHandler(async (req, res) => {
    const modifiedSession = await Term.findByIdAndUpdate(req.body.id, {
      $set: { enabled: false },
    });

    if (_.isEmpty(modifiedSession)) {
      return res
        .status(404)
        .json("Error updating session info.Try again later");
    }

    res
      .status(201)
      .json("Session information has been updated successfully!!!");
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedTerm = await Term.findByIdAndUpdate(id, {
      $set: {
        active: false,
      },
    });

    if (_.isEmpty(deletedTerm)) {
      return res
        .status(404)
        .json("Error removing session info.Try again later");
    }

    res.status(201).json(" Session have been removed successfully!!!");
  })
);

// router.delete(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const deletedTerm = await Term.findByIdAndRemove(id);

//     if (_.isEmpty(deletedTerm)) {
//       return res
//         .status(404)
//         .json("Error removing session info.Try again later");
//     }

//     res.status(201).json(" Session have been removed successfully!!!");
//   })
// );

module.exports = router;
