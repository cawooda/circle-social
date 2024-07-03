// seed.js
const connection = require("../config/connection");
const { User, Thought, Admin } = require("../models");

// const userData = require("./userData.json");
// const thoughtData = require("./thoughtData.json");

const { userData, thoughtData, adminData } = require("./seedData");

console.time("seeding");
// Set the callback to occur once the connection opens

connection.once("open", async () => {
  // Check if the collections exist and drop them if they do
  const collections = ["users", "thoughts", "comments", "admins"];

  for (let collection of collections) {
    let check = await connection.db
      .listCollections({ name: collection })
      .toArray();
    if (check.length) {
      await connection.dropCollection(collection);
    }
  }

  // Seed the collections
  try {
    const users = await User.insertMany(userData);
    const thoughts = await Thought.insertMany(thoughtData);

    const admins = await Admin.insertMany(adminData);

    const getUsers = await User.find().populate();
    const getThoughts = await Thought.find().populate("user");

    console.log("Users seeded:", getUsers);
    console.log("Thoughts seeded:", getThoughts);

    console.timeEnd("seeding complete 🌱");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
});
