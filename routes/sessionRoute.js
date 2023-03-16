const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Session = require("../models/sessionModel");
const _ = require("lodash");

//@GET All school sessions
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  })
);

//@GET School Session by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const session = await Session.findById(req.params.id);
    res.status(200).json(session);
  })
);

//Add new School Session
router.post(
  "/",
  asyncHandler(async (req, res) => {
    //Create new Session
    const session = await Session.create(req.body);
    if (!session) {
      return res.status(404).send("Error creating new session.Try again later");
    }
    console.log(session);
    res.send(session);
  })
);

//@PUT Update Existing School Session
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const modifiedSession = await Session.findByIdAndUpdate(
      req.body.id,
      req.body
    );

    if (!modifiedSession) {
      return res
        .status(404)
        .send("Error updating session info.Try again later");
    }

    res.send(modifiedSession);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Session.findByIdAndRemove(id);

    res.sendStatus(201);
  })
);

module.exports = router;
