const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const CurrentLevelDetail = require("../models/currentLevelDetailModel");
const Level = require("../models/levelModel");
const CurrentLevel = require("../models/currentLevelModel");
const _ = require("lodash");
const {
  Types: { ObjectId },
} = require("mongoose");

//@GET All current levels
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.query;

    const currentLevelDetails = await CurrentLevelDetail.find({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
    })
      .populate("level")
      .populate("teacher");
    //

    if (_.isEmpty(currentLevelDetails)) {
      return res.status(200).json([]);
    }

    const modifiedLevelsDetails = currentLevelDetails.map(
      ({ _id, level, teacher }) => {
        return {
          _id,
          levelType: level?.type,
          teacher: teacher || "",
        };
      }
    );
    //

    res.status(200).json(modifiedLevelsDetails);
  })
);

//Add new School New CurrentLevel Detail
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newCurrentLevelDetail = await CurrentLevelDetail.create(req.body);

    if (_.isEmpty(newCurrentLevelDetail)) {
      return res
        .status(404)
        .json("Error creating new Current Level Detail.Try again later");
    }

    res.status(201).json(newCurrentLevelDetail);
  })
);

//@PUT Update Existing School New CurrentLevel Detail
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const modifiedLevelsDetails = await CurrentLevelDetail.findByIdAndUpdate(
      req.body.id,
      req.body
    );

    if (_.isEmpty(modifiedLevelsDetails)) {
      return res
        .status(404)
        .json("Error updating level details.Try again later");
    }

    res.status(201).json(modifiedLevelsDetails);
  })
);

//@GET Teacher current level
router.post(
  "/assign-teacher",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, teacher } = req.body;

    const currentLevelDetails = await CurrentLevelDetail.findOne({
      session: ObjectId(sessionId),
      term: ObjectId(termId),
      teacher: ObjectId(teacher),
    }).populate("level");

    const modifiedLevelsDetails = {
      _id: currentLevelDetails?._id || "",
      levelType: currentLevelDetails?.level?.type || "",
    };

    res.status(200).json(modifiedLevelsDetails);
  })
);

//@PUT Assign a Teacher
router.put(
  "/assign-teacher",
  asyncHandler(async (req, res) => {
    const modifiedLevelsDetails = await CurrentLevelDetail.findByIdAndUpdate(
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

    if (_.isEmpty(modifiedLevelsDetails)) {
      return res.status(404).json("Error assigning Level.Try again later");
    }

    res.status(201).json("Level has been assigned successfully!!!");
  })
);

router.put(
  "/unassign-teacher",
  asyncHandler(async (req, res) => {
    const id = req.body._id;
    const modifiedLevelsDetails = await CurrentLevelDetail.findByIdAndUpdate(
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

    if (_.isEmpty(modifiedLevelsDetails)) {
      return res.status(404).json("Error updating info.Try again later");
    }

    res.status(201).json("Level has been removed successfully!!!");
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await CurrentLevelDetail.findByIdAndRemove(id);

    res.jsonStatus(201);
  })
);

module.exports = router;
