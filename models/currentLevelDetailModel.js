const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const CurrentLevelDetailSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Term",
    },
    teacher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Teacher",
    },
    fee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Fee",
    },
    level: Object,
    subjects: Array,
    students: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Student" }],
    rollNumber: Number,
    attendance: Number,

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model("CurrentLevelDetail", CurrentLevelDetailSchema);
