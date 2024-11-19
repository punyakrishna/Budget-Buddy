const express = require("express");
const dashboardRoutes = express.Router();
const Budget = require("../models/budget");
const Expense = require("../models/expense");
const { userAuth } = require("../utils/auth");

dashboardRoutes.get("/dashboard", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const totalBudget = await Budget.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const recentExpenses = await Expense.find({ userId })
      .sort({ createdAt: -1 })
      .limit(4)
      .populate("categoryId", "name");
    // .populate("userId", "firstName lastName");

    const totalBudgetAmount = totalBudget[0]?.total || 0;
    const totalExpenseAmount = totalExpense[0]?.total || 0;
    const remainingAmount = totalBudgetAmount - totalExpenseAmount;

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
