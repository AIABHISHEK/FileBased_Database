const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    
    static getDataFromFile(cb) {

        fs.readFile(p, (err, fileData) => {
            let products = [];
            if (!err && fileData != "") {
                products = JSON.parse(fileData);
                cb(products);
            }
        });

    }
    save() {
        // we need to create id whenever new product is saved
            // we check if id passed we update else create new while we need to pass id null in case of creating new product with value null
        if (this.id) {
            let updatedProductIndex;
            Product.getDataFromFile((products) => {
                updatedProductIndex = products.findIndex((prod) => {
                    return prod.id === this.id;
                });
                products[updatedProductIndex].title = this.title;
                products[updatedProductIndex].imageUrl = this.imageUrl;
                products[updatedProductIndex].price = this.price;
                products[updatedProductIndex].description = this.description;
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err + 'error');
                });
            });
        }
        else {
            
            this.id = Math.random().toString();
            //read file contents
            Product.getDataFromFile((products) => {
                products.push(this); //this refers to the class since we have used callback function (err, data) =>{}
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err + 'error');
                });
            });
        }
        // products.push(this);
        // save this instance of class
    }
    static findById(id, callback) {

        fs.readFile(p, (err, fileData) => {
            if (err || fileData == "") {
                callback([]);
            }
            else {
                const prod = JSON.parse(fileData);
                const products = prod.find((product) => {
                    return product.id === id;
                });
                products.price = parseFloat(products.price);
                // console.log(products.price);
                callback(products);
            }
        });
    }
    
    static fetchAll(callback) {  // static so that we can call methods with class

        this.getDataFromFile(callback);
    }
    static delete(id) {
        this.getDataFromFile((products) => {
            console.log("thjfhgjh");
            console.log(products);
            let updatedProduct = products.filter(p => p.id !== id);
            console.log(updatedProduct);
            fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                if (!err) {
                    console.log("cart delete");
                    Cart.delete(id); // delete from cart also
                }
                else {
                    return;
                }
            });
        });
    }
};
