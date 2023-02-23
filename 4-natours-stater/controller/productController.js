const catchAsync = require('../utils/catchAsync');
const handleFactory = require('./handleFactory');
const Product = require('./../models/productModel');

exports.createProduct = handleFactory.createOne(Product);

exports.getAllProduct = catchAsync(async (req, res, next) => {
  const product = await Product.find().populate('order');

  res.status(200).json({
    status: 'success',
    results: product.length,
    data: {
      product,
    },
  });
});
