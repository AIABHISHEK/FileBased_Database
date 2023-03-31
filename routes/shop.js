const express = require('express');
const path = require('path');

const router = express.Router();

const adminData = require('./admin');

const shopController = require('../controller/shop');

// default routes
router.get('/', shopController.getIndex);

//product route
router.get('/product', shopController.getProduct);

// cart route
router.get('/cart/:id', shopController.getAddCart);

//product details
router.get('/cart', shopController.getCart);


router.get('/product-details/:productId', shopController.getProductDetails);
//

router.get('/delete/:productId', shopController.getDeleteItemFromCart);

//product list
// router.get('/product-list', shopController.getProductList);

// checkout routes
router.get('/checkout', shopController.getCheckout); //


module.exports = router;