const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const MessageSchema = new mongoose.Schema(
  {
    type: String,
    recipient: Object,
    body: Object,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model("Message", MessageSchema);
