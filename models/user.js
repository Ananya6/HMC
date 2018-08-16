const mongoose = require('mongoose');
const Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

var userSchema=new Schema({
  UserName:{
    type:String,
    required:true,
    unique:true
  },
  Password:{
    type:String,
    required:true
  },
  MobileNo:{
    type:Number,
    min:4000000000,
    required:true,
    unique:true
  }
},{
  timestamps:true
});

userSchema.methods.encryptPassword=function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
}

userSchema.methods.validPassword=function(password){
  return bcrypt.compareSync(password,this.Password);
}

module.exports=mongoose.model('user',userSchema);
