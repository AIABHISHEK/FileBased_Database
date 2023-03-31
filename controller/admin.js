
const Product = require('../models/product');

// this will control the renderinng of the add product page

exports.getAddProduct = (req, res, next) => {
    // console.log("this is ");
    //path.join takes absolute path
    //----- ---- res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html')); //join the path according to the os
    //   .. makes path go one level up 
    res.render("admin/edit-product",
        {
            docTitle: 'Add Product',
            path: '/admin/add-product',
            editMode:false
        });
};

// this will handle the post of the add-product 

exports.postProduct = (req, res, next) => {
    // console.log(req.body);
    let title = req.body.title;
    let imageUrl = req.body.imageUrl;
    let price = req.body.price;
    let description = req.body.description;
    
    let p = new Product(null ,title, imageUrl, price, description);
    p.save();
    res.redirect('/');// redirect
};

exports.getProduct = (req, res, next) => {

    Product.fetchAll((products) => {
        res.render('admin/product',
            {
                products: products,
                docTitle: 'Admin Product',
                path: '/admin/products'
            });
    });
};

exports.getEditProduct = (req, res, next) => {
    const id = req.params.productId;
    const editMode = req.query.editMode;

    if (editMode === "false") {
        return res.render('/');
    }
    console.log("inside the  nott ")
    Product.findById(id, (product) => {
        console.log(" this is type of " + typeof product.price);
        if (product) {
            res.render("admin/edit-product",
                {
                    docTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editMode: true,
                    product: product
                });
        }
        else {
            res.send("bad request");
        }
    });
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    let p = new Product(id, title, imageUrl, price, description);
    p.save();
    res.redirect('/admin/products');
};


exports.getDeleteProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.delete(id);
    res.redirect('/admin/products');
};