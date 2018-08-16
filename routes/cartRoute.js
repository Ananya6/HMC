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
const products=require('../models/product');
const orders=require('../models/order');
Rout.use(bodyParser.json());
Rout.use(bodyParser.urlencoded({ extended: true }));
Rout.use(morgan('dev'));

Rout.route('/add-to-cart/:id')
  .all((req,res,next)=>{
    res.statusCode=200;
    next();
  })
  .get((req,res,next)=>{
    console.log("inside cart function");
    var ObjectId=req.params.id;
    console.log("Object Id is:"+ObjectId);
    var cart=new Cart(req.session.cart? req.session.cart :{});
    console.log("Previous cart:");
    console.log(cart);
    products.findById(ObjectId)
    .then((prod)=>{
          console.log(prod);
          offers.findOne({ProductName:prod.ProductName})
          .then((off)=>{
              var discountValue=0;
              // console.log("Offers");
              // console.log(off);
              var numeric=typeof off.Discount != 'undefined';
              var percent=typeof off.DiscountPercent != 'undefined';
              if(percent){
                discountValue+=(prod.PriceDisplay*0.01*off.DiscountPercent);
                console.log("Discount %");
                console.log(discountValue);
              }
              if(numeric){
                discountValue+=off.Discount;
                console.log("Discount");
                console.log(discountValue);
              }
              // var discount={
              //   qty: off.QuantityApplicable,
              //   value: discountValue
              // }
               cart.add(prod,discountValue,ObjectId);
               console.log(cart);
                req.session.cart=cart;
                req.session.save();
                res.redirect('/menu');

          }).catch((err)=>{

              var discount=0;
              console.log("no dis");
               cart.add(prod,discount,ObjectId);
                req.session.cart=cart;
                req.session.save();
                res.redirect('/menu');
          });
          // cart.add(prod,ObjectId);

          // console.log(req.session.cart);
          //  res.redirect('/menu');


    })
    .catch((err)=>console.log(error));

  });

Rout.route('/removeItem/:id')
    .all((req,res,next)=>{
      res.statusCode=200;
      next();
    })
    .get((req,res,next)=>{
      var cart=new Cart(req.session.cart);
      cart.remove(req.params.id);
      res.redirect('/cart');
        // if(!req.session.cart){
        //   return res.render('shopping-cart.hbs',{products:null});
        // }
        // var cart=new Cart(req.session.cart);
        // console.log(cart);
        // res.render('shopping-cart.hbs',{products:cart.generateArray(),totPrice: cart.totalPrice});

    });

Rout.route('/cart')
  .all((req,res,next)=>{
    res.statusCode=200;
    next();
  })
  .get((req,res,next)=>{
      if(!req.session.cart){
        return res.render('shopping-cart.hbs',{products:null});
      }
      var cart=new Cart(req.session.cart);
    
      res.render('shopping-cart.hbs',{products:cart.generateArray(),totPrice: cart.totalPrice});

  });

Rout.route('/checkout',isLoggedIn)
    .all((req,res,next)=>{
      res.statusCode=200;
      next();
    })
    .get((req,res,next)=>{
      if(!req.session.cart){
        return res.render('shopping-cart.hbs',{products:null});
      }
      var cart=new Cart(req.session.cart);
      var cartArray=cart.generateArray();
      res.render('checkout1.hbs',{total: cart.totalPrice, discount: cart.totalDiscount});
      })
    .post((req,res,next)=>{
      var address=req.body.pickupSelected;
      var time=req.body.timeSelected;
      var totPrice=req.body.finalPrice;

      console.log(address);
      console.log(time);
      console.log(totPrice);
      var Order=new orders({
        User: req.user,
        Cart: req.session.cart,
        PickUpAddress:address ,
        Timing:time,
        TotalPrice: totPrice
      });
      Order.save()
      .then((result)=>{
        console.log(result);
        req.flash('success','Successfully bought product');
        req.session.cart=null;
        req.session.save();
        setTimeout(function(){
          res.redirect('/home');
        },8000);
      });

    });

module.exports=Rout;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl=req.url;
  res.redirect('/login');
}
