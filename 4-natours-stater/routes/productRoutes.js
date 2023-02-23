const express = require('express');
const productController = require('./../controller/productController');
const router = express.Router();

router
  .route('/')
  .post(productController.createProduct)
  .get(productController.getAllProduct);

module.exports = router;
