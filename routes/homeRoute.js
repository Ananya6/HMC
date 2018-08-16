const express = require('express');
const morgan = require('morgan');
const bodyParser=require('body-parser');


const Rout=express.Router({
  'strict':true,
  'mergeParams':true,
  'caseSensitive':false,
});


const mongoose = require('mongoose');
const products=require('../models/product');
const offers=require('../models/offers');
Rout.use(bodyParser.json());
Rout.use(bodyParser.urlencoded({ extended: true }));
Rout.use(morgan('dev'));

Rout.route('/')
.all((req,res,next)=>{
  res.statusCode=200;
  next();
})
.get((req,res,next)=>{
  offers.find({Valid:true,Display:true})
  .limit(3)
  .then((off)=>{
    products.find({New:true})
   .limit(3)
   .then((newArrival)=>{
    res.render('homepage.hbs',{off,newArrival});
   }).catch((err)=>next(err));

  }).catch((err)=>next(err));


})
.post((req,res,next)=>{



});
Rout.route('/SignIn')
  .all((req,res,next)=>{
    res.statusCode=200;
  
    next();
  })
  .get((req,res,next)=>{
    res.render('reg.hbs');
  });

module.exports=Rout;
