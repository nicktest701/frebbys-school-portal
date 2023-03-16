const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const StudentSchema = new mongoose.Schema(
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
    othername: {
      type: String,
      lowercase: true,
    },
    dateofbirth: String,
    gender: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    phonenumber: String,
    address: String,
    residence: String,
    nationality: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model("Student", StudentSchema);
