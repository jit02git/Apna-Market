// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: {
    width: Number,
    height: Number,
    depth: Number
  },
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [
    {
      rating: Number,
      comment: String,
      date: String,
      reviewerName: String,
      reviewerEmail: String
    }
  ],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: {
    createdAt: String,
    updatedAt: String,
    barcode: String,
    qrCode: String
  },
  images: [String],
  thumbnail: String
});

module.exports = mongoose.model('Product', productSchema);
