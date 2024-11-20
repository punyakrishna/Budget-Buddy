const Category = require("../models/category");
const Budget = require("../models/budget");
const Expense = require("../models/expense");

const addBudget = async (req, res) => {
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
};

const getBudgetById = async (req, res) => {
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
};

const updateBudget = async (req, res) => {
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
};

const deleteBudget = async (req, res) => {
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
};

const getAllBudgets = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      {
        $group: {
          _id: "$categoryId",
          totalExpense: { $sum: "$amount" }, // Sum up the amounts
        },
      },
    ]);

    const expenseMap = expenses.reduce((acc, curr) => {
      acc[curr._id.toString()] = curr.totalExpense;
      return acc;
    }, {});

    const budgets = await Budget.find().populate("categoryId", "name");
    const enhancedBudgets = budgets.map((budget) => {
      const categoryId = budget.categoryId._id.toString();
      return {
        ...budget.toObject(),
        totalExpense: expenseMap[categoryId] || 0,
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
};

module.exports = {
  addBudget,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getAllBudgets,
};
