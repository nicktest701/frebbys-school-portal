const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const ParentSchema = new mongoose.Schema(
  {
    profile: String,
    firstname: {
      type: String,
      lowercase: true,
      required: true,
    },
    surname: {
      type: String,
      lowercase: true,
      required: true,
    },
    gender: String,
    email: {
      type: String,
      lowercase: true,
    },
    phonenumber: String,
    address: String,
    nationality: String,

    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
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
module.exports = db.model("Parent", ParentSchema);
