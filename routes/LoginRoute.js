const express = require('express');
const morgan = require('morgan');
const bodyParser=require('body-parser');
// var csrf=require('csurf');
// var passport=require('passport');
// var flash=require('connect-flash');
// var csrfProtection=csrf();

const Rout=express.Router({
  'strict':true,
  'mergeParams':true,
  'caseSensitive':false,
});
require('../services/passport');
// Rout.use((flash()));
// Rout.use(csrfProtection);

const mongoose = require('mongoose');
const users=require('../models/user');
Rout.use(bodyParser.json());
Rout.use(bodyParser.urlencoded({ extended: true }));
Rout.use(morgan('dev'));
//
// Rout.route('/modalRegister')
// .get((req,res,next)=>{
//   var messages=req.flash('error');
//   res.render('register.hbs',{messages:messages,hasErrors:messages.length>0});
// });


      Rout.route('/login')
      .all((req,res,next)=>{
        res.statusCode=200;
        // res.setHeader('Content-Type','text/plain');
        next();
      })
      .get((req,res,next)=>{

        })
      .post((req,res,next)=>{
       var userMob=req.body.usrmob;
       var pwd=req.body.pswL;
       // res.render('user/signup',{csrfToken: req.csrfToken()});
       console.log(userMob);
       console.log(pwd);
        users.find({MobileNo:userMob})
       .then((doc)=>{
         console.log(doc);
         if(doc==[]){
           console.log('Not Registered');
         }
           if(doc.Password===pwd){
             console.log('Logged into Successfully');
           }
         else{
           console.log('Incorrect password');
         }
         // res.redirect('..?error=1');
       }).catch((err)=>next(err));
      });

      // Rout.route('/SignIn')
      //   .all((req,res,next)=>{
      //     res.statusCode=200;
      //     res.setHeader('Content-Type','text/html');
      //     next();
      //   })
      //   .get((req,res,next)=>{
      //     res.render('reg.hbs');
        // console.log(req.body.usrname);
        // console.log(req.body.mob);
        // console.log(req.body.psw);
        // console.log(req.body.confirmpsw);
        // var usr={
        //   UserName: req.body.usrname,
        //   Password: req.body.psw,
        //   MobileNo:req.body.mob
        // }
        //
        //  users.create(usr)
        //  .then((userdetails)=>{
        //    console.log('New User Added');
        //    res.StatusCode=200;
        //    // res.setHeader('Content-Type','application/json');
        //    // res.json(userdetails);
        //    console.log(userdetails);
        //  },(err)=>next(err))
        //  .catch((err)=>next(err));
        // });


  // (req,res,next)=>{
  // var messages=req.flash('error');
  //   res.render('register.hbs',{messages:messages,hasErrors:messages.length>0});

  // res.render('menu.hbs',{allBurger:[],vegBurger:[],nVegBurger});

// .post(passport.authenticate('local.signup', {
//   failureRedirect: '/modalRegister',
//   successRedirect: '/menu',
//   failureFlash:true
// })


//   (req,res,next)=>{
// console.log(req.body.usrname);
// console.log(req.body.mob);
// console.log(req.body.psw);
// console.log(req.body.confirmpsw);
// var usr={
//   UserName: req.body.usrname,
//   Password: req.body.psw,
//   MobileNo:req.body.mob
// }
//
//  users.create(usr)
//  .then((userdetails)=>{
//    console.log('New User Added');
//    res.StatusCode=200;
//    // res.setHeader('Content-Type','application/json');
//    // res.json(userdetails);
//    console.log(userdetails);
//  },(err)=>next(err))
//  .catch((err)=>next(err));
// }



module.exports=Rout;
