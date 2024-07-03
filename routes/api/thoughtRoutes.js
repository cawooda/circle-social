const express = require("express");
const router = express.Router();

//methods within the controller handle CRUD requests. The methods are imported here
const {
  getThoughts,
  getSingleThought,
  createThought,
  modifyThought,
  deleteThought,
} = require("../../controllers/thoughtController");

//all Thoughts
router.route("/:userId").post(createThought);
router.route("/").get(getThoughts);
//single Thought
router
  .route("/:thoughtId")
  .put(modifyThought)
  .get(getSingleThought)
  .delete(deleteThought);

module.exports = router;
