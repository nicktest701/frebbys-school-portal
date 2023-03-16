const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const CurrentFeeSchema = new mongoose.Schema(
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
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
    fee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Fee",
    },

    payment: Array,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }

);
module.exports = db.model("CurrentFee", CurrentFeeSchema);
