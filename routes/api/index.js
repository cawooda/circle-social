//import the Router method to create a Router
const router = require("express").Router();

//import a route for Users
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
const { loginUser } = require("../../controllers/userController");

//mount the middlewhere to handle all calls to /api/users
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

router.get("/", (req, res) => {
  res.status(200).json({ message: "reached api" });
});

module.exports = router;
