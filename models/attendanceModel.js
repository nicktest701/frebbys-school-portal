const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const AttendanceSchema = new mongoose.Schema(
  {
    level: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Level",
    },
    date: String,
    status: Array,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model("Attendance", AttendanceSchema);
