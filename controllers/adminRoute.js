const express = require('express');
const router = express.Router();
const multer = require('multer');
const path =  require('path');
const Product = require('../model/product');



const storage = multer.diskStorage({
    destination: './public/uploads/images',
    filename:function(req,file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname)  );
    }
});


const upload = multer({
    storage : storage
}).fields([

    {
        name: 'imgUrl',
    }
    
]
    

)

router.post('/post',  (req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log( req.files.imgUrl[0].filename);
            
            const product = new Product({
                title : req.body.title,
                date: req.body.date,
                category:req.body.category,
                excerpt:req.body.excerpt,
                imgUrl: '/uploads/images/' +req.files.imgUrl[0].filename
            }).save((err,product)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/');
                }
            })

        }
    })
 
 })

 router.get('/postdetails', (req,res)=>{
    Product
        .find({})
        .exec((err,product)=>{
            res.render('adminproduct', {
                title: 'Post Details',
                product:product
            })
        })
 });

//this route helps us to edit a post
 router.post('/productEdit/:id', (req,res)=>{
    
    
    // console.log("I am"  + req.body.title)
    // console.log(req.params.id)
    let items = {}
    
    items.title =  req.body.title,
    items.excerpt = req.body.excerpt
    items.date = req.body.date,
    
    
    console.log(items.title)
    let query  = { _id : req.params.id};
    
   

    Product
        .update(query, items, function(err){

            if(err){

                console.log(err)

            }else{

                res.redirect('/admin/postdetails')
            }
        });

});


//this route helps us to delete a post
router.post('/productDelete/:id', (req,res)=>{
    
    Product.findByIdAndRemove({ _id : req.params.id }).then((Product)=>{
        res.redirect('/admin/postdetails')
    })

});

 


function isAuthenticated(req,res,next){
    if(req.user){
       return next()
    }else{
        res.redirect('/');
    }
}



router.get('/post', isAuthenticated, (req,res)=>{
    res.render('product', {

        title: ' Product'

    })
})



module.exports = router;