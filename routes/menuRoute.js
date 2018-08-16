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
Rout.use(bodyParser.json());
Rout.use(bodyParser.urlencoded({ extended: true }));
Rout.use(morgan('dev'));

Rout.route('/')
.all((req,res,next)=>{
  res.statusCode=200;
  next();
})
.get((req,res,next)=>{
      res.locals.data="hello";
      products.find({CategoryName:'Burger',SoldOut:false},
      {_id:1,ProductName:1,Veg:1,PriceDisplay:1,Calories:1,Ingredients:1,ImageUrl:1,})
      // .limit(6)
      .then((allBurgers)=>{
        var allBurger=allBurgers.slice(0,6);
        var vegBurger=(allBurgers.filter(function(x){return x.Veg==true})).slice(0,6);
        var nVegBurger=(allBurgers.filter(function(x){return x.Veg==false})).slice(0,6);

        products.find({CategoryName:'Salad',SoldOut:false},
        {_id:1,ProductName:1,Veg:1,PriceDisplay:1,Calories:1,Ingredients:1,ImageUrl:1,})
        // .limit(6)
        .then((allSalads)=>{

          var vegSalad=(allSalads.filter(function(x){return x.Veg==true})).slice(0,6);
          var nVegSalad=(allSalads.filter(function(x){return x.Veg==false})).slice(0,6);
          var allSalad=allSalads.slice(0,6);

            products.find({CategoryName:'Sandwich',SoldOut:false},
            {_id:1,ProductName:1,Veg:1,PriceDisplay:1,Calories:1,Ingredients:1,ImageUrl:1,})
            .then((allSandwichs)=>{
              var allSandwich=allSandwichs.slice(0,6);
              var vegSandwich=(allSandwichs.filter(function(x){return x.Veg==true})).slice(0,6);
              var nVegSandwich=(allSandwichs.filter(function(x){return x.Veg==false})).slice(0,6);

              products.find({CategoryName:'Smoothie',SoldOut:false},
              {_id:1,ProductName:1,Veg:1,PriceDisplay:1,Calories:1,Ingredients:1,ImageUrl:1,})
              .limit(6)
              .then((allSmoothie)=>{

                  res.render('menu.hbs',{allBurger,vegBurger,nVegBurger,allSalad,vegSalad,nVegSalad,allSandwich,vegSandwich,nVegSandwich,allSmoothie});

            }).catch((err)=>next(err));

          }).catch((err)=>next(err));

        }).catch((err)=>next(err));

      }).catch((err)=>next(err));

      // products.find({CategoryName:'Burgers',SoldOut:false,Veg:true},
      // {ProductName:1,Veg:1,PriceDisplay:1,Calories:1,Ingredients:1,ImageUrl:1,})
      // .limit(6)
      // .then((docs)=>{
      //
      //   res.render('menu.hbs',{title:'Hola', vegBurger:docs});
      //
      // }).catch((err)=>next(err));
      //
      // console.log("Veg Burgers");
      // console.log(vegBurger);
      //
      // products.find({CategoryName:'Burgers',SoldOut:false,Veg:false},
      // {ProductName:1,Veg:1,PriceDisplay:1,Calories:1,Ingredients:1,ImageUrl:1,})
      // .limit(6)
      // .then((docs)=>{
      //     res.render('menu.hbs',{title:'Hola', nvegBurger:docs});
      //
      // }).catch((err)=>next(err));
      //
      // products.find({CategoryName:'Sandwich',SoldOut:false},
      // {ProductName:1,Veg:1,PriceDisplay:1,Calories:1,Ingredients:1,ImageUrl:1,})
      // .limit(6)
      // .then((docs)=>{
      //   allSandwich=docs;
      //
      // }).catch((err)=>next(err));

      // products.find({CategoryName:'Sandwich',SoldOut:false,Veg:true},
      // {ProductName:1,Veg:1,PriceDisplay:1,Calories:1,Ingredients:1,ImageUrl:1,})
      // .limit(6)
      // .then((docs)=>{
      //   vegSandwich=docs;
      //
      // }).catch((err)=>next(err));

      // products.find({CategoryName:'Sandwich',SoldOut:false,Veg:false},
      // {ProductName:1,Veg:1,PriceDisplay:1,Calories:1,Ingredients:1,ImageUrl:1,})
      // .limit(6)
      // .then((docs)=>{
      //   nVegSandwich=docs;
      //
      // }).catch((err)=>next(err));


      // res.render('menu.hbs',{title:'Hola', allBurger:allBurger,vegBurger:vegBurger,nVegBurger,allSandwich,vegSandwich,nVegSandwich});

      })
.post((req,res,next)=>{



});


module.exports=Rout;
