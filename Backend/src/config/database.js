const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://punyakrishna2000:oMRVaQgelnYkrmEs@punya-node.rhoit.mongodb.net/BudgetBuddy";

const connectDB = async () => {
  await mongoose.connect(dbUrl);
};

module.exports = connectDB;
