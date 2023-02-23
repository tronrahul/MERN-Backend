const catchAsync = require('../utils/catchAsync');
const handleFactory = require('./handleFactory');
const Order = require('./../models/orderModel');

exports.createOrders = handleFactory.createOne(Order);

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const order = await Order.find();

  res.status(200).json({
    status: 'success',
    results: order.length,
    data: {
      order,
    },
  });
});

exports.getOrderAndProduct = async (req, res, next) => {
  const data = Order.aggregate([
    {
      $lookup: {
        from: 'product',
        localField: 'order',
        foreignField: '_id',
        as: 'order_product',
      },
    },
  ]);

  console.log('Success', data);
  return [];
};
