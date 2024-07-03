const bcrypt = require("bcrypt");
//import the Schema and model from mongoose.
const { Schema, Types, model } = require("mongoose");

//definde reactionel schema
const reactionSchema = new Schema(
  //first come the paths, like properties
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
      required: true,
    },
    reactionBody: { type: String, required: true, maxLength: 280 },
    userName: { type: String, required: true },
    createdAt: {
      type: Date,
      immutable: true, //this prevents changes to the date once created
      default: () => Date.now(), //runs a function to get the current date when populating
      required: true,
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  }
);

module.exports = reactionSchema;
