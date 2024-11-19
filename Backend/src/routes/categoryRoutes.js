const express = require("express");
const categoryRoutes = express.Router();
const Category = require("../models/category");
const { userAuth } = require("../utils/auth");

categoryRoutes.post("/category", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        code: 400,
        message: "Category name is required.",
      });
    }

    const normalizedName = name.trim().toLowerCase();

    const existingCategory = await Category.findOne({ name: normalizedName });

    if (existingCategory) {
      return res.status(400).json({
        code: 400,
        message: "Category already exists.",
      });
    }

    const newCategory = new Category({ name: normalizedName });
    await newCategory.save();

    res.status(200).json({
      code: 200,
      message: "Category added successfully.",
      data: newCategory,
    });
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({
      code: 500,
      error: "An error occurred while adding the category.",
    });
  }
});

categoryRoutes.put("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        code: 400,
        message: "Category name is required.",
      });
    }
    const normalizedName = name.trim().toLowerCase();

    const category = await Category.findByIdAndUpdate(
      id,
      { name: normalizedName },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        code: 404,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Category updated successfully.",
      data: category,
    });
  } catch (err) {
    console.error("Error editing category:", err);
    res.status(500).json({
      code: 500,
      error: "An error occurred while updating the category.",
    });
  }
});

categoryRoutes.delete("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        code: 404,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Category deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({
      code: 500,
      error: "An error occurred while deleting the category.",
    });
  }
});

categoryRoutes.get("/categories", userAuth, async (req, res) => {
  console.log("yes its coming here");
  try {
    const categories = await Category.find();

    res.status(200).json({
      code: 200,
      message: "Categories fetched successfully.",
      data: categories,
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({
      code: 500,
      error: "An error occurred while fetching the categories.",
    });
  }
});

module.exports = categoryRoutes;
