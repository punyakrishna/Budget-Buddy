const express = require("express");
const dashboardRoutes = express.Router();
const { userAuth } = require("../utils/auth");
const getDashboardDetails = require("../controllers/dashboard");

dashboardRoutes.get("/dashboard", userAuth, getDashboardDetails);

module.exports = dashboardRoutes;
