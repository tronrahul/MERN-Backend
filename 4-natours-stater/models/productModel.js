const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product: {
    type: String,
    required: [true, 'product can not be empty'],
  },
  category: {
    type: String,
    required: [true, 'category can not be empty'],
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
