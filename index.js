require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();

//require the connection to database
const db = require("./config/connection");

//session storage
const session = require("express-session");
const MongoStore = require("connect-mongo");
//setup the middleware for session storage:
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGOOSE_URI ||
        "mongodb://localhost:27017/circle_social_db",
      mongooseConnection: db,
    }),
  })
);

//import the routes
const routes = require("./routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

db.once("open", () => {
  app.listen(
    PORT,
    console.log(`server running on port ${PORT} http://localhost:${PORT}
      http://localhost:${PORT}/api
      `)
  );
});
