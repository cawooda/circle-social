//require the model for retureivng information from database
require("dotenv").config();
const session = require("express-session");
const { User } = require("../models");

const { passwordHash, sendText, generateToken } = require("../utils/helpers");
const bcrypt = require("bcrypt");

const actions = [
  {
    action: "getUsers",
    method: "GET",
    uri: "api/users/",
    auth: ["logged_in", "admin"],
  },
  {
    action: "getSingleUser",
    method: "GET",
    uri: "api/users/:userId",
    auth: ["logged_in", "admin"],
  },
  {
    action: "createUser",
    method: "POST",
    uri: "api/users/",
    data: {
      first: "string",
      last: "string",
      email: "string",
      password: "string",
    },
  },
  {
    action: "loginUser",
    method: "GET",
    uri: "api/users/:userId",
    data: {
      email: "string",
      password: "string",
    },
  },
  {
    action: "requestAuthentication",
    method: "GET",
    uri: "api/users/:userId",
  },
  {
    action: "checkAuthentication",
    method: "GET",
    uri: "api/users/:userId/:authId",
  },
];
//export all the modules in one go. this can be done by defining and then calling module.exports

//a get request for all users
getUsers = async (req, res) => {
  if (req.session.loggedIn) {
    try {
      //do the call the db for all users
      const users = await User.find();
      //return them all
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  } else {
    res.json({
      message: "You need to be logged in first",
      actions,
    });
  }
};

getSingleUser = async (req, res) => {
  console.log(`ObjectId(${req.session.userId})`);
  console.log(`ObjectId(${req.params.userId})`);
  if (
    req.session.loggedIn &&
    (`ObjectId(${req.session.userId}` == `ObjectId(${req.params.userId}` ||
      req.session.admin)
  ) {
    console.log("its a match");
    try {
      const user = await User.findById(req.params.userId).select("-__v");
      console.log(user);
      //handle situations where a user doesent exist by that id
      if (!user) {
        return res.status(404).json({ message: "No User with that Id" });
      }
      //return the user
      const data = { data: user };
      res
        .status(200)
        .json({ message: "success, here is your user:", data, actions });
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (
    req.session.loggedIn &&
    !(`ObjectId(${req.session.userId}` == `ObjectId(${req.params.userId}`)
  ) {
    res.status(403).json({
      message: "Only Logged in Users and Admin can get user information",
      actions,
    });
  } else if (!req.session.userId) {
    res
      .status(403)
      .json({ message: "You need to be logged in for this request", actions });
  }
};

createUser = async (req, res) => {
  const { first, last, username, email, password } = req.body;
  //extract the items from the body
  if (!first || !last || !username || !email || !password) {
    return res
      .status(400)
      .json({ message: "need name, email and password for user creation" });
  }
  try {
    const dbUserData = await User.create({
      first,
      last,
      username,
      email,
      password,
    });
    dbUserData.save();
    res.json({
      message: "user successfully created",
      data: { dbUserData },
      actions,
    });
    console.log("user successfully created", dbUserData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

modifyUser = async (req, res) => {
  // console.log(req.session.loggedIn);
  // console.log(req.session.userId);
  console.log(req.body);
  const userId = req.params.userId;
  if (req.session.loggedIn) {
    try {
      console.log("updating..");
      const updatedUser = await User.updateOne(
        { _id: userId },

        { ...req.body }
      );
      res
        .status(200)
        .json({ message: "successfully updated", updatedUser, actions });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "error updating database", actions, error });
    }
  } else {
    res.status(403).json({ message: "need to be logged in", actions });
  }
  const body = req.body;
};

deleteUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const foundUser = await User.deleteOne({ _id: id });
    res
      .status(200)
      .json({ message: "delete successful", user: foundUser, actions });
  } catch (error) {}

  const body = req.body;
};

loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  console.log("reached");
  console.log("body", req.body);
  try {
    const userData = await User.findOne(
      {
        email: email,
      },
      {},
      { new: true }
    );
    if (userData) {
      await bcrypt.compare(password, userData.password, (err, result) => {
        if (err) {
          req.session.loggedIn = false;
          req.session.userId = "";
          res
            .status(403)
            .json({ message: "sorry password didnt match", actions });
        } else if (result) {
          req.session.loggedIn = true;
          req.session.admin = true;
          req.session.userId = userData._id;
          res.status(200).json({ message: "logged in successfully", actions });
          next();
        } else {
          req.session.loggedIn = false;
          req.session.userId = "";
          res.status(401).json({ error: "Invalid username or password" });
        }
      });
    } else res.status(404).json({ message: "user not found", actions });
    console.log("logged in user", userData);
    console.log("logged in session status", req.session.loggedIn);
    console.log("user session id ", req.session.userId);
  } catch (err) {
    console.log(err);
  }
};

logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error destroying session");
    }
    res.status(200).json({ message: "User Logged out", actions });
  });
};

authenticateUser = async (req, res) => {
  const { token, userId } = req.body;
  if (token && userId) {
    try {
      const user = await User.findById(req.params.userId);
      if (user.checkToken(token)) {
        req.session.authenticated = true;
        console.log("session", req.session.authenticated);
        res.status(200).json({
          auth: req.session.authenticated,
          message: "successfully authenticated",
          actions,
        });
      } else {
        res.status(404).json({
          auth: req.session.authenticated,
          message: "authen token didnt work",
          actions,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({
        auth: req.session.authenticated,
        message: "authen token didnt work",
        actions,
      });
    }
  } else {
    try {
      const userId = req.params.userId;
      const user = await User.findById(req.params.userId);
      const number = user.mobile;
      const token = generateToken();
      const link = `${process.env.DOMAIN}/api/users/auth/token/${token}`;
      const message = `circle authenticate request. Secret number is ${token}. Please follow link to authenticate:${link}`;
      await user.updateToken(token);
      console.log(user);
      console.log(token);
      sendText(number, message, "Circle");
      res
        .status(200)
        .json({ message: "we're working on getting that sms out", actions });
      //create and send text with token
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  }
};

addFriend = async (req, res) => {
  const userId = req.params.userId;
  const friendId = req.params.friendId;

  try {
    const user = await User.findById(userId);
    if (await user.addFriend(friendId)) {
      res.status(200).json({
        message: "friend added we think",
        user,
        actions,
      });
    } else {
      res.status(404).json({
        message:
          "we think that the user or friend couldnt be found or that the fried you gave us is already on the user friend list",
        user,
        actions,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error,
      message:
        "an error happened trying to add a friend to a users friends list",
      actions,
    });
  }
};

removeFriend = async (req, res) => {
  const userId = req.params.userId;
  const friendId = req.params.friendId;
  console.log(userId);
  console.log(friendId);
  try {
    const user = await User.findById(userId);
    if (await user.removeFriend(friendId)) {
      res.status(200).json({
        message: "friend removed we think",
        user,
        actions,
      });
    } else {
      res.status(404).json({
        message:
          "we think that the user or friend couldnt be found or that the fried you gave us wasnt on the list",
        user,
        actions,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error,
      message:
        "an error happened trying to add a friend to a users friends list",
      actions,
    });
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  modifyUser,
  loginUser,
  logoutUser,
  addFriend,
  removeFriend,
};
