const express = require('express');
const orderController = require('./../controller/orderController');
const router = express.Router();

router
  .route('/')
  .post(orderController.createOrders)
  .get(orderController.getAllOrders);

router.route('/getOrders').get(orderController.getOrderAndProduct);

module.exports = router;
