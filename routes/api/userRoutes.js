const express = require("express");
const router = express.Router();

//methods within the controller handle CRUD requests. The methods are imported here
const {
  getUsers,
  getSingleUser,
  createUser,
  modifyUser,
  logoutUser,
  authenticateUser,
} = require("../../controllers/userController");

//logout user
router.route("/logout").get(logoutUser);
//login user
router.route("/login").post(loginUser);
//authentication request via text message
router.route("/auth/:userId").put(authenticateUser);
//authentication check via token recieved via text
router.route("/auth/token/:userId").post(authenticateUser);
//all users -> create and get
router.route("/").post(createUser).get(getUsers);
//single user -> modify and get
router.route("/:userId").put(modifyUser).get(getSingleUser).delete(deleteUser);
//login user

module.exports = router;
