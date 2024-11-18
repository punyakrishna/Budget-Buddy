const express = require("express");
const expenseRoutes = express.Router();
const { userAuth } = require("../utils/auth");
const { validateExpenseData } = require("../utils/validations");
const {
  updateExpense,
  addExpense,
  deleteExpense,
  getExpenseById,
  getAllExpenses,
} = require("../controllers/expense");

expenseRoutes.post("/expense", userAuth, validateExpenseData, addExpense);
expenseRoutes.put("/expense/:id", userAuth, validateExpenseData, updateExpense);
expenseRoutes.get("/expense/:id", userAuth, getExpenseById);
expenseRoutes.delete("/expense/:id", userAuth, deleteExpense);
expenseRoutes.get("/expenses", userAuth, getAllExpenses);

module.exports = expenseRoutes;
