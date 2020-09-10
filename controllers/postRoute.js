const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser");
const Product = require('../model/product');

var morgan = require('morgan');
const registrationForm = require('../model/registrationForm');


router.post('/register', (req,res)=>{

   const regForm = new registrationForm({

        fullnaime : req.body.fullnaime,
      email : req.body.email,
      password: req.body.password 

   }).save((err,regForm)=>{
    if(err) return console.error(err);
    console.log('very good')
    res.redirect('/');
   });
    // res.redirect('/admin/posts')

        // const regForm = new registrationForm();

        // regForm.fullname = req.body.fullname;
        // regForm.email = req.body.email;
        // regForm.password = req.body.password;

        // regForm.save(); 

//    console.log(regForm)
});



module.exports = router;