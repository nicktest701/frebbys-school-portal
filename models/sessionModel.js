const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const SessionSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    academicYear: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model("Session", SessionSchema);
