//require the model for retureivng information from database
const { Types } = require("mongoose");
const { Thought, Reaction /*schema only*/ } = require("../models");

//actions information is passed with every return. This helps the client know what options are available via this endpoint.
//an improvement ot this can be with the actions being further customised for example having user or thought id's passed in the return so that
// the front end is always passed correct and up to date route options.

const actions = [
  {
    action: "createReaction",
    method: "POST",
    uri: "api/thoughts/:thoughtId/reactions",
    permissions: ["user"],
  },
];

//export all the modules in one go. this can be done by defining and then calling module.exports

// /api/thoughts/:thoughtId/reactions
createReaction = async (req, res) => {
  const thoughtId = req.params.thoughtId;
  let { userName, reactionBody } = req.body;
  console.log(userName);
  console.log(reactionBody);
  //try to find the thought
  try {
    const reaction = {
      userName,
      reactionBody,
      createdAt: Date.now(), // Ensure createdAt is included
    };
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $push: { reactions: reaction },
      },
      { new: true }
    );

    console.log(thought);
    res
      .status(200)
      .json({
        message: "thought updated with reaction",
        thought,
        actions,
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error thought or user", actions }).end();
  }

  try {
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "error finding user to create thought for", actions })
      .end();
  }
};

// /api/thoughts/:thoughtId/reactions/:reactionId
deleteReaction = async (req, res) => {
  //
  const { thoughtId, reactionId } = req.params;
  console.log(thoughtId);
  console.log(reactionId);
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    ).populate("reactions");
    console.log(thought);
    //handle situations where a thought doesent exust by that id
    if (!thought) {
      return res.status(404).json({
        message: "No Thought with that Id",
        idRecieved: req.params.thoughtId,
      });
    }
    //return the thought
    const data = { data: thought, actions };
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createReaction,
  deleteReaction,
};
