const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const CurrentLevelSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Term",
    },
    level: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Level",
    },
    levelType: String,
    students: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Student" }],
    active: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = db.model("CurrentLevel", CurrentLevelSchema);
