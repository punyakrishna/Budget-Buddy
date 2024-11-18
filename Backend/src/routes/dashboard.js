const express = require("express");
const dashboardRoutes = express.Router();
const Budget = require("../models/budget");
const Expense = require("../models/expense");
const { userAuth } = require("../utils/auth");

dashboardRoutes.get("/dashboard", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Aggregate total budget
    const totalBudget = await Budget.aggregate([
      { $match: { userId } }, // Match budgets for the logged-in user
      { $group: { _id: null, total: { $sum: "$amount" } } }, // Sum all budget amounts
    ]);

    // Aggregate total expenses
    const totalExpense = await Expense.aggregate([
      { $match: { userId } }, // Match expenses for the logged-in user
      { $group: { _id: null, total: { $sum: "$amount" } } }, // Sum all expense amounts
    ]);

    // Fetch the 4 most recent expenses
    const recentExpenses = await Expense.find({ userId })
      .sort({ createdAt: -1 }) // Sort by creation date (descending)
      .limit(4); // Limit to 4 expenses

    // Calculate remaining amount
    const totalBudgetAmount = totalBudget[0]?.total || 0; // Default to 0 if no budgets exist
    const totalExpenseAmount = totalExpense[0]?.total || 0; // Default to 0 if no expenses exist
    const remainingAmount = totalBudgetAmount - totalExpenseAmount;

    // Respond with aggregated data
    res.status(200).json({
      code: 200,
      data: {
        totalBudget: totalBudgetAmount,
        totalExpense: totalExpenseAmount,
        remainingAmount,
        recentExpenses,
      },
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).json({
      code: 500,
      message: "An error occurred while fetching dashboard data.",
    });
  }
});

module.exports = dashboardRoutes;
