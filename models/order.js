var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var orderSchema=new Schema({
  User:{
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  Cart:{
    type:Object,
    required: true,
  },
  PickUpAddress:{
    type:String
  },
  Timing:{
    type:String
  },
  TotalPrice:{
    type:Number
  }
});

module.exports=mongoose.model('order',orderSchema);
