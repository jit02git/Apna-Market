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

// Get All Categories
export const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  // Get Single Category
export const getCategoryById = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ message: "Not found" });
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

  // Update Category
export const updateCategory = async (req, res) => {
    try {
      const { name, description } = req.body;
  
      const updated = await Category.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: "Not found" });
  
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Delete Category
export const deleteCategory = async (req, res) => {
    try {
      const deleted = await Category.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Category deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  