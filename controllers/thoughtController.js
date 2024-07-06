//require the model for retureivng information from database
const { Thought, User } = require("../models");

//actions information is passed with every return. This helps the client know what options are available via this endpoint.
//an improvement ot this can be with the actions being further customised for example having user or thought id's passed in the return so that
// the front end is always passed correct and up to date route options.

const actions = [
  {
    action: "getThoughts",
    method: "GET",
    uri: "api/thoughts/",
    permissions: ["user"],
  },
  {
    action: "getSingleThought",
    method: "GET",
    uri: "api/thoughts/:thoughtId",
    permissions: ["user"],
  },
  {
    action: "createThought",
    method: "POST",
    uri: "api/thoughts/",
    permissions: ["user"],
  },
];

//export all the modules in one go. this can be done by defining and then calling module.exports

//a get request for all thoughts
getThoughts = async (req, res) => {
  try {
    //do the call the db for all thoughts
    const thoughts = await Thought.find().populate();
    //return them all
    const data = { data: thoughts, actions };
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

getSingleThought = async (req, res) => {
  console.log("get single:", req.params.thoughtId);
  try {
    const thought = await Thought.findOne({
      _id: req.params.thoughtId,
    })
      .select("-__v")
      .populate();
    //handle situations where a thought doesent exust by that id
    if (!thought) {
      return res.status(404).json({
        message: "No Thought with that Id",
        idRecieved: req.params.thoughtId,
      });
    } else {
      //return the thought
      const data = { data: thought, actions };
      res.json(data);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

createThought = async (req, res) => {
  console.log("reached create thought");
  const userId = req.params.userId;
  console.log(userId);
  const { thoughtText } = req.body;
  console.log(thoughtText);
  let username;
  try {
    const user = await User.findOne({ _id: userId });
    console.log("user", user);
    username = user.username;
    console.log("username", username);
    //username = user.username;
    console.log(user);
    console.log(thoughtText);
    if (!username || !thoughtText) {
      console.log("reached create thought");
      return res
        .status(200)
        .json({ message: "user and content required for thoughting" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "error finding user to create thought for", actions })
      .end();
  }
  //begin creating the thought
  try {
    const dbThoughtData = await Thought.create({
      username,
      thoughtText,
    });
    dbThoughtData.save();
    // update the users array of thoughts
    await User.findOneAndUpdate(
      { username: username },
      { $addToSet: { thoughts: dbThoughtData._id } },
      { new: true }
    );
    // prepare and send the data back
    const data = { data: dbThoughtData, actions };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

modifyThought = async (req, res) => {
  const body = req.body;
};

deleteThought = async (req, res) => {
  console.log("delete single:", req.params.thoughtId);
  try {
    const thought = await Thought.deleteOne({
      _id: req.params.thoughtId,
    });
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
  getThoughts,
  getSingleThought,
  createThought,
  modifyThought,
  deleteThought,
};
