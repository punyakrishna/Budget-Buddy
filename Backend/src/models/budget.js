const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

budgetSchema.index({ userId: 1 });

module.exports = mongoose.model("Budget", budgetSchema);
