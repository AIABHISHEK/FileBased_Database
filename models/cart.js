
const fs = require('fs');
const path = require('path');


const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {

    static addToCart(id, productTitle, price) {

        //fetch the product of the cart
        // find if instance of product exist
        //add new product and quantity++

        fs.readFile(p, (err, filedata) => {

            let cart;
            if (!err) {

                // filedata = JSON.parse(filedata);
                if (filedata.toString() != "") {

                    cart = JSON.parse(filedata);
                }
                else {
                    cart = { products: [], totalPrice: 0 };
                }

            }
            else {
                console.log(err);
            }

            let existingIndex = -1;

            // existingIndex = (cart.products || []).findIndex((p) => {
            //     return p.id == id;
            // });

            existingIndex = cart.products.findIndex((p) => {
                return p.id == id;
            });

            // cart
            let existingProduct;
            let updatedProduct;
            if (existingIndex > -1) {
                existingProduct = cart.products[existingIndex];
                updatedProduct = existingProduct;
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingIndex] = updatedProduct;

            }

            else {
                updatedProduct = { id: id, title: productTitle, qty: 1 };
                // console.log(updatedProduct);
                // console.log(cart);
                // cart.products = [...cart.products, updatedProduct];
                cart.products.push(updatedProduct);
            }

            cart.totalPrice += +price;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });

    }

    static fetchCart(callback) {
        fs.readFile(p, (err, filedata) => {
            let cart;
            if (!err) {
                // filedata = JSON.parse(filedata);
                if (filedata.toString() != "") {
                    cart = JSON.parse(filedata);
                    callback(cart);
                }
                else {
                    cart = { products: [], totalPrice: 0 };
                    callback(cart);
                }
            }
            else {
                console.log(err);
            }
        });
    }

    static delete(id) {
        let updatedCartData;

        this.fetchCart((cartData => {
            console.log(cartData);
            let product = cartData.products.find(p => p.id === id);
            if (product) {
                let updatedproducts = cartData.products.filter(p => p.id !== id);
                console.log(cartData.totalPrice);
                console.log(product.price);
                let updatedTotalPrice = cartData.totalPrice - p.price;
                console.log(updatedTotalPrice);
                updatedCartData = { products: updatedproducts, totalPrice: updatedTotalPrice };
                fs.writeFile(p, JSON.stringify(updatedCartData), (err) => {
                    if (err)
                        console.log(err);
                });
            }
            else {
                return;
            }
        }));
    }

};


// Cart.addToCart(9, "ui", 9);