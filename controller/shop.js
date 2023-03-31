
const Product = require('../models/product');
const Cart = require('../models/cart');

// controller 

exports.getProduct = (req, res, next) => {
    // console.log("this is 2nd middleware");
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
    Product.fetchAll((products) => {
        res.render('shop/product-list.ejs',
            {
                products: products,
                docTitle: 'shop',
                path:'/product'
            });
    });
    
};

// to get single product
exports.getProductDetails = (req, res, next) => {
    const id = req.params.productId;
    console.log(id);
    Product.findById(id, (p) => {
        console.log(p);
        res.render('shop/product-detail.ejs', {
            docTitle: 'product details',
            product: p,
            path:'/product-details'
        });
    });
    
};

exports.getIndex = (req, res, next) => {

    Product.fetchAll((products) => {
        res.render('shop/index.ejs',
            {
                products: products,
                docTitle: 'shop',
                path:'/'
            });
    });

};

exports.getAddCart = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id, (p) => {
        console.log(p);
        Cart.addToCart(id, p.title, p.price);
        // res.render('shop/cart.ejs', {
        //     docTitle: 'Cart',
        //     path: '/cart',
        // });
        res.redirect('/cart');
    });
};

exports.getCart = (req, res, next) => {
    Cart.fetchCart((cart) => {
        if (cart) {
            console.log(cart.products);
            res.render('shop/cart.ejs', {
                cart: cart,
                path: '/cart',
                docTitle:'Cart'
            });
        }
        else {
            console.log("no products");
        }
    });
};

exports.getDeleteItemFromCart = (req, res, next) => {

    const id = req.params.productId;
    console.log("to be deleted");
    Cart.delete(id);
    res.redirect('/cart');
};



exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout.ejs', {
        docTitle: 'Chekout',
        path:'/checkout'
    });
};
