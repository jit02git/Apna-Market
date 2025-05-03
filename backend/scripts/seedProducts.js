const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const products = require('../scripts/product'); 

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    // Remove all existing products
    await Product.deleteMany();
    console.log('Existing products cleared.');

    // Insert new products
    await Product.insertMany(products.products);
    console.log('Products inserted successfully.');

    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seedProducts();
