const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order: {
    type: String,
    required: [true, 'product can not be empty'],
  },
  quantity: {
    type: Number,
    required: [true, 'category can not be empty'],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
