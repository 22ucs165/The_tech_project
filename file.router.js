const express = require("express");
const { deviceModel } = require("./models/device.model");

const fileRouter = express.Router();

fileRouter.get('/styles/:name',(req, res) => {
    const name = req.params.name;
    res.sendFile(__dirname+'/views/styles/'+name);
})

fileRouter.get('/scripts/:name',(req, res) => {
    const name = req.params.name;
    res.sendFile(__dirname+'/views/scripts/'+name);
})

fileRouter.get('/svg/:name',(req, res) => {
    const name = req.params.name;
    res.sendFile(__dirname+'/views/svg/'+name);
})

fileRouter.get('/icons&logos/:name',(req, res) => {
    const name = req.params.name;
    res.sendFile(__dirname+'/views/icons&logos/'+name);
})

// =====================================================================================================================

fileRouter.get('/login',(req, res) => {
    // res.sendFile(__dirname+'/views/login.html')
    res.render('login');
})

fileRouter.get('/register',(req, res) => {
    // res.sendFile(__dirname+'/views/register.html')
    res.render('register');
})

fileRouter.get('/product_gallery',(req, res) => {
    // res.sendFile(__dirname+'/views/product_gallery.html');
    res.render('product_gallery')
})

fileRouter.get('/Product',async (req, res) => {
    // res.sendFile(__dirname+'/views/product.html')
    const id = req.query.id;
    if(id){
        res.render('product',{
            id
        })
    }
    else{
        res.redirect('./product_gallery')
    }
})

fileRouter.get('/reset_pswd',(req, res) => {
    if(req.cookies.user && req.cookies.user.PasswordResetAccess){
        // res.sendFile(__dirname+'/views/reset_pswd');
        res.render('reset_pswd');
    }
    else{
        res.redirect('./');
    }
})

fileRouter.get('/verify',(req, res) => {
    // res.sendFile(__dirname+'/views/verify.html')
    res.render('verify');
})

fileRouter.get('/wishlist',(req, res) => {
    if(req.cookies.token){
        // res.sendFile(__dirname+'/views/wishlist.html')
        res.render('wishlist');
    }
    else{
        // res.sendFile(__dirname+'/views/login.html');
        res.render('login');

    }
})

fileRouter.get('/oppo',(req, res) => {
    // res.sendFile(__dirname+'/views/oppo.html')
    res.render('Oppo');
})

fileRouter.get('/vivo',(req, res) => {
    // res.sendFile(__dirname+'/views/vivo.html');
    res.render('Vivo');
})

fileRouter.get('/samsung',(req, res) => {
    // res.sendFile(__dirname+'/views/samsung.html')
    res.render('Samsung');
})

fileRouter.get('/xiaomi',(req, res) => {
    // res.sendFile(__dirname+'/views/xiaomi.html')
    res.render('Xiaomi');
})

fileRouter.get('/motorola',(req, res) => {
    // res.sendFile(__dirname+'/views/motorola.html')
    res.render('Motorola');
})

module.exports = {
    fileRouter
}