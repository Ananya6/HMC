const passport=require('passport');
var User=require('../models/user');
var LocalStrategy=require('passport-local').Strategy;
const googleStrategy=require('passport-google-oauth20');
const FacebookStrategy=require('passport-facebook');
const keys=require('../config/keys');
var validator =require('validator');
const { check, validationResult } = require('express-validator/check');

passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user);
  });
});

passport.use('local.signup',new LocalStrategy({
  usernameField:'mob',
  passwordField:'psw',
  passReqToCallback:true

},function(req,username,password,done){
  console.log("Mobile"+username.length);
  console.log("Password"+password);
  var confirmpsw=req.body.confirmpsw;
  // check('username','Invalid Phone').isLength({min:9,max:11});//MobilePhone('en-IN');
  // check('password','Invalid password').isLength({min:6});
  var messages=[];
  if((username.length!=10)||(parseInt(username)==NaN)||(username[0]<7)){
    console.log('yes');
    messages.push('Invalid phone number');
  }
  if(password.length<6){
    console.log('yes');
    messages.push('Length of password should be atleast 5');
  }
  if(password===confirmpsw){

  }
  else{
    console.log('yes');
  messages.push('Passwords don\'t match');
  }
  console.log(messages.length);
  // var errors=validationResult(req);
  if(messages.length>0){

  //   errors.forEach(function(error){
  //     messages.push(error.msg);
  //   });
    console.log(messages);
    return done(null,false,req.flash('error',messages));
  }

   User.findOne({'MobileNo':username },function(err,user){
     console.log('Inside query');
     if(err){
       return done(err);
     }
     if(user){
       return done(null,false,{message:'Mobile is already in use '});
     }

     var newUser=new User();
     newUser.UserName=req.body.usrname;
     console.log("username"+newUser.UserName);
     newUser.MobileNo=username;
     newUser.Password=newUser.encryptPassword(password);
     newUser.save(function(err,result){
       if(err){
         return done(err);
       }
       return done(null,newUser);
     })
   });
}));

passport.use('local.signin',new LocalStrategy({
  usernameField:'mobile',
  passwordField:'password',
  passReqToCallback:true

},function(req,username,password,done){
  console.log("Mobile"+username.length);
  console.log("Password"+password);
  var messages=[];
  if(password.length<6){
    console.log('yes');
    messages.push('Length of password should be atleast 5');
  }

  if(messages.length>0){
    console.log(messages);
    return done(null,false,req.flash('error',messages));
  }
  User.findOne({'MobileNo':username },function(err,user){
    console.log('Inside query');
    if(err){
      return done(err);
    }
    if(!user){
      return done(null,false,{message:'Account doesn\'t exist'});
    }
    if(!user.validPassword(password)){
      return done(null,false,{message:'Incorrect Password'});
    }
      return done(null,user);
  });
}));
passport.use(new googleStrategy(
  {
  clientID:keys.googleClientID,
  clientSecret:keys.googleClientSecret,
  callbackURL:'/auth/google/callback'
},
(accessToken,refreshToken,profile,done)=>{
  console.log("GOOGLE INFO");
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
})
);

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    var User=profile.displayName;
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(User);
    console.log("FACEBOOK INFO");
    console.log(accessToken);
    console.log(profile);
  }
));
