// const MongoClient=require('mongodb').MongoClient;
const http=require('http');
const express=require('express');
const fs=require('fs');
var path=require('path');
const hostname='localhost';
const port=5000;
const morgan=require('morgan');
var hbs=require('express-handlebars');
var expressValidator=require('express-validator');
var validator =require('validator');
var session=require('express-session');
var passport=require('passport');
var flash=require('connect-flash');
var MongoStore=require('connect-mongo')(session);
const cheerio = require('cheerio');
var request=require('request');

var authRouter=require('./routes/authRoutes');
// const loginRout=require('./routes/LoginRoute');
const userRout=require('./routes/userRoute');
const menuRout=require('./routes/menuRoute');
const homeRout=require('./routes/homeRoute');
const cartRout=require('./routes/cartRoute');
const ownMealRout=require('./routes/ownMealRoute');

const products=require('./models/product');
const offers=require('./models/offers');
const users=require('./models/user');



const app=express();
//
// console.log(validator.isMobilePhone('9540090300','en-IN'));
// console.log(validator.isMobilePhone('9540090300','en-IN'));


const mongoose = require('mongoose');
mongoose.Promise=require('bluebird');

const url='mongodb://localhost:27017/hmcdb';
mongoose.connect(url,(err)=>{
  if(err) throw err;
  else {
    console.log("Connected successfully");
  }
});


app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

console.log("hi");
// products.findById('5b4cdfeca222e92a6c7c1492')
//    .then((prod)=>{
//      console.log(prod);
//    })
//    .catch((err)=>console.log("errror"));

app.use(session({
  secret:'secret',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection:mongoose.connection

  }),
  cookie:{ maxAge : 45*60*1000}
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.engine('hbs',hbs({extname:'hbs' ,defaultLayout:'layout'}));
app.set('views',path.join(__dirname,'views'));
app.set('view-engine','hbs');
//
// app.use(myMiddleware)


app.use((req,res,next)=>{
  res.locals.login=req.isAuthenticated();
  res.locals.session=req.session;
  console.log(req.session);
  console.log(req.isAuthenticated());
  next();
});
authRouter(app);

app.use('/home',homeRout);
app.use('/menu',menuRout);

// app.use('/',authRouter);
app.use('/',cartRout);

app.use('/',ownMealRout);
app.use('/',userRout);
app.get('/newpage',function(req,res){
  res.render()
});
app.get('/scrape', function(req, res){
    // The URL we will scrape from - in our example Anchorman 2.
  res.render('newpage.hbs');
   const  url='http://localhost:5000/scrape';
// const $=cheerio.load('http://localhost:5000/scrape');
//   //   const $ = cheerio.load('<ul id="fruits"><li class="apple">ple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');
//   console.log($('.apple', '#fruits').text());

  request(url, function(error, response, html){

      // First we'll check to make sure no errors occurred when making the request
       console.log('inside');

      if(!error){
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

          var $ = cheerio.load(html);

          // Finally, we'll define the variables we're going to capture
         console.log($('.apple', '#fruits').text());
      }

    // url = 'http://www.imdb.com/title/tt1229340/';
    //
    // // The structure of our request call
    // // The first parameter is our URL
    // // The callback function takes 3 parameters, an error, response status code and the html
    //
    // request(url, function(error, response, html){
    //
    //     // First we'll check to make sure no errors occurred when making the request
    //
    //     if(!error){
    //         // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
    //
    //         var $ = cheerio.load(html);
    //
    //         // Finally, we'll define the variables we're going to capture
    //
    //         var title, release, rating;
    //         var json = { title : "", release : "", rating : ""};
    //         console.log(json);
    //     }
  });
});

//
//
// app.get('/add-to-cart/:id', function(req, res,next){
//    var ObjectId=req.params.id;
//    console.log("Object Id is:"+ObjectId);
//    var cart=new Cart(req.session.cart? req.session.cart :{});
//    console.log("previous cart:"+cart);
//    products.findById(ObjectId)
//    .then((prod)=>{
//      console.log(prod);
//      cart.add(prod,ObjectId);
//      req.session.cart=cart;
//      console.log(cart);
//      res.redirect('/menu');
//    })
//    .catch((err)=>console.log(error));
// });

// require('./services/passport.js');
// //
// app.post('/register',
//   passport.authenticate('local.signup', {
//     failureRedirect: '/register',
//     successRedirect: '/menu',
//     failureFlash:true
//  }),
//   function(req, res) {
//     res.redirect('/');
//   });

// .then((db)=>{
//   var offer=offers({
//     OfferId:101,
//     Discount:50,
//     Description:'Buy 2 Get Rs 50 off',
//     QuantityApplicable:1,
//     ProductId:16,
//     // ProductName:'Green Card Burger',
//     OfferPicUrl:'offer2.jpg',
//     Display:true,
//     Valid:true
// });
//
//  offer.save()
//  .then((off)=>{
//    console.log(off);
//  })
// });

// .then((db)=>{
//   return users.find().exec();
// })
// .then((docs)=>{
//   console.log("Documents now");
//   console.log(docs);
// })
// .catch((err) => {
//     console.log(err);
// });
// //
// // offers.updateOne({OfferId: 101},
// {$set:{OfferPicUrl:32}})
//
// .then((docs)=>{
//   console.log(docs);
// //
// // console.log(docs[0].ProductId);
// //   console.log(docs[0].Offers[0].OfferPicUrl);
// }).catch((err)=>next(err));
// products.find({New:true})
// .limit(3)
// .then((docs)=>{
//   console.log(docs);
// }).catch((err)=>next(err));

// var allBurger=()=>{
//  var x=products.find({CategoryName:'Burgers',SoldOut:false},
// {ProductName:1,Veg:1,PriceDisplay:1,Calories:1,Ingredients:1,ImageUrl:1,})
// .limit(6)
// .then((docs)=>{
//   return docs;
// });
// return x;
// };
// var x=()=>{
//   var y=10;
//   return y;
// }
//
// // .then((docs)=>{
// //   global.allBurger=docs;
// //    // console.log(allBurger);
// // }).catch((err)=>next(err));
//
// console.log('BURGERS');
// console.log(allBurger());
// //
// .then((db) => {
//      var newProd=products({
//         ProductId:16,
//         ProductName : 'Green Card Burger',
//         SoldOut : false,
//         Veg: true,
//         CategoryName : 'Burgers',
//         CategoryId : 'meal_001',
//         Description : 'Nutritous wilted spinach is tossed with button mushrooms, peppers and zucchini and loaded with cheese sauce and gratinated Mozzarela and Parmesan. Served with multi-grain garlic bread, this meal is the perfect go-to for all the times you feel like binging. Serves 1 ',
//         DescriptionQuantity : '4 tomato,2 onion',
//         PriceDisplay : 300,
//         Price : 100,
//         Calories : 170,
//         Protein : 7.7,
//         Fat : 2.3,
//         Fiber : 6.4,
//         ImageUrl : 'burger2.jpg',
//         Sides :'iced tea',
//         Ingredients : 'asian veggie',
//         New: false,
//         OfferApplicable: true,
//         Offers:({
//           DiscountPercent:20,
//           QuantityApplicable:1,
//           OfferPicUrl:'offer3.jpg'
//         })
//
// });

//     newProd.save()
//         .then((prod) => {
//             console.log(prod);
//             return products.find({}).exec();
//           })
//           .then((docs) => {
//               console.log(docs);
//               return db.close();
//
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });
//
// //

// app.use(express.static('views'));
// app.get('/',function(req,res){
//   res.render('home.hbs',{title:' I m here', img1:'./burger.jpg'});
// });

// app.get('/',function(req,res){
//   res.render('home.hbs',{title:' I m here',condition:false,
//    anyArray:[1,2,3]});
// });
// app.get('/test/:id/',function(req,res,next){
//   res.render('test.hbs',{
//   output2:req.params.id});
// });
// app.post('/test/submit',(req,res,next)=>{
//   var id=req.body.id;
//   res.redirect('/test/'+id);
// });

//  app.get('/',function(req,res){
//   res.render('home.hbs',{title:' I m here',condition:false,
//    anyArray:[1,2,3]});
// });

// app.get('/',function(req,res,next){
//   res.render('home.hbs',
//   {title:'Form validation',success:req.session.success,
//    errors:req.session.errors});
//    req.session.errors=null;
// });
//
// app.post('/submit',function(req,res,next){
//   var conf=req.body.cpassword;
//   console.log(conf);
//   req.check('email','Invalid email address').isEmail();
//   req.check('password','Password is invalid').isLength({min:6}).equals(conf);
//
//   var errors=req.validationErrors();
// console.log(errors);
//   if(errors){
//     req.session.errors=errors;
//     req.session.success=false;
//   }
//   else{
//     req.session.success=true;
//   }
//   res.redirect('/');
// });

// app.get('/about',(req,res)=>{
// res.render('about.hbs',{
//   pageTitle:'About Page',
//   currentYear: new Date().getFullYear()
// });
// });


// app.use('/',rout);


app.listen(port,hostname,()=> {
  console.log(`Server is running at http://${hostname}:port${port}`);
});
