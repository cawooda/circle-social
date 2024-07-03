const bcrypt = require("bcrypt");
//import the Schema and model from mongoose.
const { Schema, model } = require("mongoose");
const { validateEmail } = require("../utils/helpers");

//definde the user model schema
const userSchema = new Schema(
  //first come the paths, like properties
  {
    username: { type: String, trimmed: true },
    date_of_birth: Date,
    mobile: {
      type: String,
      minLength: 10,
      maxLength: 10,
    },
    email: {
      type: String,
      required: [true, "User phone number required"],
      unique: true,
      toLowerCase: true,
      validate: {
        validator: validateEmail,
        message: "email did not pass validation",
      },
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    password: String,
    authenticate: {
      authToken: String,
      expires: { type: Date, default: Date.now },
    },
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
    id: false,
  }
);

userSchema
  .virtual("fullName")
  //getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  .set(function (value) {
    const splitName = value.split(" ");
    const first = splitName[0];
    const last = splitName[1];
    // I thinmk this next line sets the values for furst and last name in the document
    this.set({ first, last });
  });

userSchema.pre("deleteOne", async function (next) {
  const { Thought } = require("./index");
  try {
    console.log(Thought);
    await Thought.deleteMany({ _id: { $in: this.thoughts } });
    next();
  } catch (error) {
    console.error("Error while deleting thoughts", error);
    next();
  }
});

//This is some middleware intercpeting before a password is saved
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      console.error(error);
    }
    next();
  }
});

userSchema.methods.setAuthToken = function (token, duration) {
  this.authenticate.authToken = token;
  this.authenticate.expires = Date.now() + duration;
  return this.save();
};

userSchema.methods.isAuthTokenExpired = function () {
  return Date.now() < this.authenticate.expires;
};

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//initialise User Model. creates a collection called user based on the defined user schema
const User = model("user", userSchema);

module.exports = User;
