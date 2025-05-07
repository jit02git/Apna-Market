import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import products from '../scripts/product.js';


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
