const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    // date: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);
expenseSchema.index({ userId: 1 });

module.exports = mongoose.model("Expense", expenseSchema);
