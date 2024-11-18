const Expense = require("../models/expense");
const Category = require("../models/category");
const Budget = require("../models/budget");

const addExpense = async (req, res) => {
  const userId = req.user._id;
  const { categoryId } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        code: 404,
        message: "Category not found.",
      });
    }

    const budgetExists = await Budget.findOne({
      userId: req.user._id,
      categoryId: req.body.categoryId,
    });

    if (!budgetExists) {
      return res.status(400).json({
        code: 400,
        message:
          "No budget set for the selected category. Please set a budget first.",
      });
    }

    const expense = await Expense.create({
      userId,
      ...req.body,
    });

    res.status(200).json({
      code: 200,
      message: "Expense added successfully.",
      data: expense,
    });
  } catch (err) {
    console.log("Error while adding expense:" + err.message);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { categoryId, title, description, amount } = req.body;

    if (!/^[a-f\d]{24}$/i.test(expenseId)) {
      return res.status(400).json({
        code: 400,
        message: "Invalid expense ID.",
      });
    }

    const existingExpense = await Expense.findById(expenseId);
    if (!existingExpense) {
      return res.status(404).json({
        code: 404,
        message: "Expense not found.",
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        code: 404,
        message: "Category not found.",
      });
    }

    const budgetExists = await Budget.findOne({
      userId: req.user._id,
      categoryId: req.body.categoryId,
    });

    if (!budgetExists) {
      return res.status(400).json({
        code: 400,
        message:
          "No budget set for the selected category. Please set a budget first.",
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { categoryId, title, description, amount },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      code: 200,
      message: "Expense updated successfully.",
      data: updatedExpense,
    });
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({
      code: 500,
      message: "Failed to update expense. Please try again later.",
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    if (!/^[a-f\d]{24}$/i.test(expenseId)) {
      return res.status(400).json({ code: 400, message: "Invalid expense ID" });
    }

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ code: 404, message: "Expense not found" });
    }

    res.status(200).json({
      code: 200,
      message: "Expense deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({
      code: 500,
      message: "Failed to delete expense. Please try again later.",
    });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.id;

    if (!/^[a-f\d]{24}$/i.test(expenseId)) {
      return res.status(400).json({ code: 400, message: "Invalid expense ID" });
    }

    const expense = await Expense.findById(expenseId).populate(
      "categoryId",
      "name"
    );

    if (!expense) {
      return res.status(404).json({ code: 404, message: "Expense not found" });
    }

    res.status(200).json({
      code: 200,
      data: expense,
    });
  } catch (err) {
    console.error("Error fetching expense:", err);
    res.status(500).json({
      code: 500,
      message: "Failed to fetch expense. Please try again later.",
    });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user._id;

    const expenses = await Expense.find({ userId }).populate(
      "categoryId",
      "name"
    );

    res.status(200).json({
      code: 200,
      data: expenses,
    });
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({
      code: 500,
      message: "Failed to fetch expenses. Please try again later.",
    });
  }
};

module.exports = {
  addExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
  getAllExpenses,
};
