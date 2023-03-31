// const http = require('http');

const path = require('path');

const bodyparser = require('body-parser');

const express = require('express');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const error404 = require('./controller/error');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views'); // by default it is views

app.use(bodyparser.urlencoded({extended:false})); //it will do body parsing of the request

// app.use((req, res, next) => {  // middleware are function through which every request have to passed through before sending the response , they are filter

//     console.log("this is middleware ");
//     next(); // allows the request to continue to the next middleware
// });

// next is necessary because if do not call  next() the next middleware would not be executed

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',(req, res, next) => {
    console.log("this always runs");
    // res.send('<h1>hello This is express</h1>');
    next(); //
});

app.use(adminRoute);
// if we have common path before entering adminRoute we can use this app.use('/admin', adminRoute)

app.use(shopRoute);

// to send 404 page not found Error for unknown requests
app.use(error404.get404Page);

// const server = http.createServer(app);

// server.listen(3000);

app.listen(3000);
