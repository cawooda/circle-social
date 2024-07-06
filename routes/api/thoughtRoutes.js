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
const {
  createReaction,
  deleteReaction,
} = require("../../controllers/reactionController");

//all Thoughts
router.route("/:userId").post(createThought);
router.route("/").get(getThoughts);
//single Thought

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
router.route("/:thoughtId/reactions").post(createReaction);

router
  .route("/:thoughtId")
  .put(modifyThought)
  .get(getSingleThought)
  .delete(deleteThought);

module.exports = router;
