const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const FeeSchema = new mongoose.Schema(
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

    amount: Array,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model("Fee", FeeSchema);
