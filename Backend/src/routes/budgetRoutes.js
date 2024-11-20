const express = require("express");
const { userAuth } = require("../utils/auth");
const { validateBudgetData } = require("../utils/validations");
const {
  addBudget,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getAllBudgets,
} = require("../controllers/budget");

const budgetRoutes = express.Router();

budgetRoutes.post("/budget", userAuth, validateBudgetData, addBudget);

budgetRoutes.put("/budget/:id", userAuth, updateBudget);

budgetRoutes.get("/budget/:id", userAuth, getBudgetById);

budgetRoutes.delete("/budget/:id", userAuth, deleteBudget);

budgetRoutes.get("/budgets", userAuth, getAllBudgets);

module.exports = budgetRoutes;
