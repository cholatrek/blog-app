const express = require('express')
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');
const session = require('express-session')
const Product = require('../model/product');




router.get('/', (req,res)=>{

    Product
        .find({})
        .sort({'date' : -1})
        .exec((err,product)=>{

            res.render('index', {

                title:  'HomePage',
                user: req.user,
                product:product
        
            } );
        })

})

router.get('/about',(req,res)=>{
    res.render('about', { 
        title : 'About',
       
    })
})


router.get('/blog-single',(req,res)=>{
    res.render('blog-single', {
        title : 'BLog Single '
    })
})


router.get('/blog',(req,res)=>{
    res.render('blog', {
        title : 'blog'
    })
})


router.get('/:id', (req,res)=>{
    Product.findOne({ _id :req.params.id})
    .exec((err,product)=>{
        res.render('blog-single',{
            product : product,
            title: 'Blog-Single'
        })
    })
 })

 router.get('/categories/:cat', (req,res)=>{
    Product.find({ category : req.params.cat}) 
    .exec((err,category)=>{
        res.render('categories', {
            category:category,
            param: req.params.cat,
            title:'Category'
        })
    })
 })
 


router.get('/contact',(req,res)=>{
    res.render('contact', {
        title : 'contact'
    })
})






module.exports = router;
