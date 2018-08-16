const express = require('express');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const Cart=require('../models/cart');
const offers=require('../models/offers');
const Rout=express.Router({
  'strict':true,
  'mergeParams':true,
  'caseSensitive':false,
});


const mongoose = require('mongoose');
const categories=require('../models/categories');
const products=require('../models/product');
Rout.use(bodyParser.json());
Rout.use(bodyParser.urlencoded({ extended: true }));
Rout.use(morgan('dev'));

Rout.route('/create-your-own-meal')
  .all((req,res,next)=>{
    res.statusCode=200;
    next();
  })
  .get((req,res,next)=>{
     categories.findOne({CategoryName:'Burger'})
     .then((burgers)=>{
       console.log(burgers);
       categories.findOne({CategoryName:'Salad'})
       .then((salads)=>{

         categories.findOne({CategoryName:'Sandwich'})
         .then((sandwiches)=>{

           categories.findOne({CategoryName:'Smoothie'})
           .then((smoothies)=>{

     //   var burgerCustomization=[];
     //   burgerCustomization=result.Customizations;
     //   var burgerOwnMeal=result.CreateYourOwnMeal;
     //   console.log(results);
     //   console.log('Customization');

       res.render('ownMeal.hbs',{burgers,salads,sandwiches,smoothies});
       }).catch((err)=>next(err));
       }).catch((err)=>next(err));
       }).catch((err)=>next(err));
     }).catch((err)=>next(err));
  });

  Rout.route('/customize')
    .all((req,res,next)=>{
      res.statusCode=200;
      next();
    })
    .get((req,res,next)=>{
      res.redirect('/menu');
      // res.redirect('/menu');
    })
    .post((req,res,next)=>{
      var id=req.body.ObjectId;
      console.log(id);
      products.findOne({_id:id})
      .then((product)=>{
        var category=product.CategoryName;
        categories.findOne({CategoryName:category})
        .then((cat)=>{
           var customizations=cat.Customizations;
           console.log(product);
           console.log(customizations);
            res.render('customize.hbs',{product,customizations});
        }).catch((err)=>console.log(err));
      }).catch((err)=>console.log(err));

    });
    Rout.route('/cust-add-to-cart')
    .all((req,res,next)=>{
      res.statusCode=200;
      next();
    })
    .post((req,res,next)=>{
      console.log("Object pass");
      var custom1=req.body.custom1;
      var custom2=req.body.custom2;
      var array1=req.body.custom1selections;
      var array2=req.body.custom2selections;
      var objId=req.body.ObjectId;
      var sze=req.body.size;
console.log(objId);

      var customOrder={
        custom1:custom1,
        custom1array:array1,
        custom2:custom2,
        custom2array:array2,
        size:req.body.size
      };
      products.findById(objId)
      .then((product)=>{
          var prod =JSON.parse(JSON.stringify(product));// Object.assign({}, product);
          prod.Customization=customOrder;
          console.log(prod.PriceDisplay);
          if(array1 != undefined && array1.length != 0)
          prod.PriceDisplay=parseInt(parseInt(prod.PriceDisplay)+50);
          if(array2 != undefined && array2.length != 0)
          prod.PriceDisplay=parseInt(prod.PriceDisplay)+50;
          console.log("Newly added product is:");
          console.log(prod);
          var cart=new Cart(req.session.cart? req.session.cart :{});
          // console.log("Previous cart:");
          // console.log(cart);
          offers.findOne({ProductName:prod.ProductName})
          .then((off)=>{
              var discountValue=0;
              // console.log("Offers");
              // console.log(off);
              var numeric=typeof off.Discount != 'undefined';
              var percent=typeof off.DiscountPercent != 'undefined';
              if(percent){
                discountValue+=(prod.PriceDisplay*0.01*off.DiscountPercent);
                // console.log("Discount %");
                // console.log(discountValue);
              }
              if(numeric){
                discountValue+=off.Discount;
                // console.log("Discount");
                // console.log(discountValue);
              }
              // var discount={
              //   qty: off.QuantityApplicable,
              //   value: discountValue
              // }
               cart.add(prod,discountValue,objId);
               // console.log(cart);
                req.session.cart=cart;
                req.session.save();
                res.redirect('/menu');

          }).catch((err)=>{

              var discount=0;
              // console.log("no dis");
               cart.add(prod,discount,objId);
                req.session.cart=cart;
                req.session.save();
                res.redirect('/menu');
          });
      });

  });

  Rout.route('/own-add-to-cart')
  .all((req,res,next)=>{
    res.statusCode=200;
    next();
  })
  .get((req,res,next)=>{
    console.log('get');
  })
  .post((req,res,next)=>{
    console.log("Object pass");
    console.log('post');
    setTimeout(function(){
      res.redirect('/home');
    },8000);
    // var custom1=req.body.custom1;
    // var custom2=req.body.custom2;
});
module.exports=Rout;
