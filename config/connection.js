require("dotenv").config();
const { connect, connection } = require("mongoose");

connect(process.env.MONGOOSE_URI);

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = connection;
