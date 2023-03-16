const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const OverAllScoreSchema = new mongoose.Schema(
  {
   
    currentLevelDetail: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "CurrentLevelDetail",
    },
    score: Number,

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model("OverAllScore", OverAllScoreSchema);
