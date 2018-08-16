const express = require('express');
const morgan = require('morgan');
const bodyParser=require('body-parser');
var csrf=require('csurf');
var passport=require('passport');
var flash=require('connect-flash');
var csrfProtection=csrf();
require('../services/passport');

const Rout=express.Router({
  'strict':true,
  'mergeParams':true,
  'caseSensitive':false,
});


const mongoose = require('mongoose');
const products=require('../models/product');
const offers=require('../models/offers');

Rout.use((flash()));
Rout.use(csrfProtection);
Rout.use(bodyParser.json());
Rout.use(bodyParser.urlencoded({ extended: true }));
Rout.use(morgan('dev'));



  Rout.route('/logout')
    .all((req,res,next)=>{
      res.statusCode=200;
      next();
    })
    .get((req,res,next)=>{
       req.logout();
       res.redirect('/home');
   });

Rout.use('/',notLoggedIn,(req,res,next)=>{
  next();
})
Rout.route('/register')
  .all((req,res,next)=>{
    res.statusCode=200;

    next();
  })
  .get((req,res,next)=>{
    var messages=req.flash('error');
    var cs=req.csrfToken();
    // var messages = Array.from(new Set(mess));
    console.log("in route");
    console.log(messages);
    res.render('reg.hbs',{csrfToken: cs,messages:messages, hasErrors:messages.length>0});
  })
  .post(passport.authenticate('local.signup',{
    failureRedirect:'/register',
    failureFlash: true
  }),function(req,res,next){
    if(req.session.oldUrl){
      var oldUrl=req.session.oldUrl;
      req.session.oldUrl=null;
      res.redirect(oldUrl);
    }else{
      res.redirect('/home');
    }
  });


Rout.route('/login')
  .all((req,res,next)=>{
    res.statusCode=200;
    next();
  })
  .get((req,res,next)=>{
  var messages=req.flash('error');
   res.render('login.hbs',{csrfToken: req.csrfToken(),messages:messages, hasErrors:messages.length>0})
 })
 .post(passport.authenticate('local.signin',{
   failureRedirect:'/login',
   failureFlash: true
 }),function(req,res,next){
   if(req.session.oldUrl){
      var oldUrl=req.session.oldUrl;
      req.session.oldUrl=null;
      res.redirect(oldUrl);

   }else{
     res.redirect('/home');
   }
 });


module.exports=Rout;

function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
}
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
}
