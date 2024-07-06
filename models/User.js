const bcrypt = require("bcrypt");
//import the Schema and model from mongoose.
const { Schema, model } = require("mongoose");
const { validateEmail } = require("../utils/helpers");
const dayjs = require("dayjs");
const TOKEN_EXPIREY_TIME = 9000000;

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
      authToken: { type: String },
      isExpired: { type: Boolean, required: true, default: true },
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

userSchema.method("updateToken", function (token) {
  this.authenticate.authToken = token;
  this.authenticate.isExpired = false;
  setTimeout(() => {
    console.log("interval");
    this.authenticate.authToken = "";
    this.authenticate.isExpired = true;
  }, TOKEN_EXPIREY_TIME);
  return this.save();
});

userSchema.method("checkToken", function (token) {
  console.log("this", this);
  console.log("this", this.authenticate.authToken);
  console.log("this", this.authenticate.isExpired);

  if (
    this.authenticate.authToken == token &&
    this.authenticate.authToken != "" &&
    !this.authenticate.isExpired
  ) {
    console.log("looking good");
    this.authenticate.token = "";
    this.authenticate.isExpired = true;
    this.save();
    return true;
  } else {
    console.log("looks like we didnt get a match");
    this.authenticate.token = "";
    this.authenticate.isExpired = true;
    this.save();
    return false;
  }
});

userSchema.method("addFriend", function (friendId) {
  if (this.friends.indexOf(friendId) == -1) {
    this.friends.push(friendId);
    this.save();
    return true;
  } else {
    console.log("friend already in");
    return false;
  }
});

userSchema.method("removeFriend", function (friendId) {
  if (this.friends.indexOf(friendId) > -1) {
    this.friends = this.friends.filter((friend) => {
      return friend == friendId ? false : true;
    });
    this.save();
    return true;
  } else {
    console.log("friend already gone");
    return false;
  }
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//initialise User Model. creates a collection called user based on the defined user schema
const User = model("user", userSchema);

module.exports = User;
