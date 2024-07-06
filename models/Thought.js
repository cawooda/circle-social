const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reactions");

//definde thoughtel schema
const thoughtSchema = new Schema(
  //first come the paths, like properties
  {
    thoughtText: { type: String, required: true },
    username: { type: String, required: true },
    reactions: [reactionSchema],
    createdAt: {
      type: Date,
      immutable: true, //this prevents changes to the date once created
      default: () => Date.now(), //runs a function to get the current date when populating
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  //then come the
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//This is some middleware intercpeting before save is made
thoughtSchema.pre("save", async function (next) {
  if (this.isModified("content") || this.isNew) {
    try {
      this.updatedAt = Date.now;
    } catch (error) {
      console.error(error);
    }
    next();
  }
});

thoughtSchema.pre("deleteOne", async function (next) {
  const { User } = require("./index");
  try {
    console.log(User);
    const user = User.find({ username: this.username });
    user.updateOne({}, { $pull: { thoughts: this._id } });
    console.log(user);
    next();
  } catch (error) {
    console.error("Error while deleting thoughts", error);
    next();
  }
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//create the model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
