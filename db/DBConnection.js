const mongoose = require("mongoose");

let MONGO_URL;

if (process.env.NODE_ENV !== "production") {
  MONGO_URL = process.env.MONGO_URL_LOCAL;
} else {
  MONGO_URL = process.env.MONGO_URL;
}

const db = mongoose.createConnection(MONGO_URL, {
  keepAlive: true,
});


db.on("connected", () => {
  console.log("db connected");
});

db.on("disconnected", () => {
  console.log("db disconnected");
});

process.on("SIGINT", async () => {
  await db.close();
  process.exit(0);
});

module.exports = db;
