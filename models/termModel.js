const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const TermSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    term: String,
    academicYear: String,
    vacationDate: String,
    reOpeningDate: String,
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model("Term", TermSchema);
