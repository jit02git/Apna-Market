import Category from "../models/Category.js";

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Category already exists." });
    }

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
