const express = require("express");
const connectDB = require("./config/database");
const userRoutes = require("./routes/auth");
const budgetRoutes = require("./routes/budgetRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboard");

const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", userRoutes);
app.use("/", budgetRoutes);
app.use("/", categoryRoutes);
app.use("/", expenseRouter);
app.use("/", dashboardRoutes);

connectDB()
  .then(() => {
    app.listen(3434, () => {
      console.log("server listening at port 3434");
    });
  })
  .catch((err) => {
    console.log(err);
  });
