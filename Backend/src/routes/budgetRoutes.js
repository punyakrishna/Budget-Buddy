const express = require("express");
const { userAuth } = require("../utils/auth");
const { validateBudgetData } = require("../utils/validations");
const Category = require("../models/category");
const Budget = require("../models/budget");
const Expense = require("../models/expense");

const budgetRoutes = express.Router();

budgetRoutes.post("/budget", userAuth, validateBudgetData, async (req, res) => {
  try {
    const userId = req.user._id;
    const { categoryId } = req.body;

    const categoryData = await Category.findById(categoryId);

    if (!categoryData) {
      return res.status(400).json({
        code: 400,
        message: "Category not found",
      });
    }

    const existingBudget = await Budget.findOne({ categoryId, userId });
    if (existingBudget) {
      return res.status(400).json({
        code: 400,
        message: "Budget already exist",
      });
    }

    const newBudget = new Budget({
      userId,
      ...req.body,
    });

    await newBudget.save();
    res.status(200).json({
      code: 200,
      message: "Budget created succesfully",
    });
  } catch (err) {
    console.log(err);
  }
});

budgetRoutes.put("/budget/:id", userAuth, async (req, res) => {
  const budgetId = req.params.id;
  const { amount } = req.body;

  try {
    const budget = await Budget.findById(budgetId);

    if (!budget) {
      return res.status(404).json({
        code: 404,
        message: "Budget not found.",
      });
    }

    if (amount <= 0 || isNaN(amount)) {
      return res.status(400).json({
        code: 400,
        message: "Please enter a valid amount",
      });
    }

    if (amount !== undefined) {
      budget.amount = amount;
    }

    await budget.save();

    res.status(200).json({
      code: 200,
      message: "Budget updated successfully.",
      data: budget,
    });
  } catch (err) {
    console.error("Error updating budget:", err);
    res.status(500).json({
      code: 500,
      error: "An error occurred while updating the budget.",
    });
  }
});

budgetRoutes.get("/budget/:id", userAuth, async (req, res) => {
  const budgetId = req.params.id;
  const budget = await Budget.findById(budgetId)
    .populate("userId", "firstName lastName gender")
    .populate("categoryId", "name");

  if (!budget) {
    return res.status(400).json({
      code: 400,
      message: "Budget not found",
    });
  }

  res.status(200).json({
    code: 200,
    message: "Succefully fetched",
    data: budget,
  });
});

budgetRoutes.delete("/budget/:id", userAuth, async (req, res) => {
  const budgetId = req.params.id;

  try {
    if (!/^[a-f\d]{24}$/i.test(budgetId)) {
      return res.status(400).json({
        code: 400,
        message: "Invalid budget ID",
      });
    }
    const deletedBudget = await Budget.findByIdAndDelete(budgetId);

    if (!deletedBudget) {
      return res.status(404).json({
        code: 404,
        message: "Budget not found.",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Budget deleted successfully.",
      data: deletedBudget,
    });
  } catch (err) {
    console.error("Error deleting budget:", err);
    res.status(500).json({
      code: 500,
      error: "An error occurred while deleting the budget.",
    });
  }
});

budgetRoutes.get("/budgets", userAuth, async (req, res) => {
  try {
    // const budgets = await Budget.find().populate("categoryId", "name");

    const expenses = await Expense.aggregate([
      {
        $group: {
          _id: "$categoryId", // Group by categoryId
          totalExpense: { $sum: "$amount" }, // Sum up the amounts
        },
      },
    ]);

    // Step 2: Convert the aggregation result to a key-value map for quick lookup
    const expenseMap = expenses.reduce((acc, curr) => {
      acc[curr._id.toString()] = curr.totalExpense;
      return acc;
    }, {});

    // Step 3: Fetch budgets and enhance with total expense
    const budgets = await Budget.find().populate("categoryId", "name");
    const enhancedBudgets = budgets.map((budget) => {
      const categoryId = budget.categoryId._id.toString();
      return {
        ...budget.toObject(),
        totalExpense: expenseMap[categoryId] || 0, // Add totalExpense (default to 0 if no expenses)
      };
    });

    res.status(200).json({
      code: 200,
      message: "Budgets fetched successfully.",
      data: enhancedBudgets,
    });
  } catch (err) {
    console.error("Error fetching budgets:", err);
    res.status(500).json({
      code: 500,
      error: "An error occurred while fetching the budgets.",
    });
  }
});

module.exports = budgetRoutes;
