const express = require('express');
const path = require('path');

const router = express.Router();// router

const adminController = require('../controller/admin');

router.get('/admin/add-product', adminController.getAddProduct);

// to add new product
router.post('/admin/products', adminController.postProduct);

// to get products
router.get('/admin/products', adminController.getProduct);

router.get('/admin/edit-product/:productId', adminController.getEditProduct); //

router.post('/admin/edit-product', adminController.postEditProduct);

router.get('/admin/delete/:productId', adminController.getDeleteProduct);

module.exports = router;