const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const offerSchema=new Schema({
  OfferId:{
    type:Number,
    unique:true
  },
  DiscountPercent:{
    type: Number
  },
  Discount:{
    type: Number
  },
  Description:{
   type: String
  },
  QuantityApplicable:{
    type: Number,
    min:1
  },
  ProductId:{
    type: Number
  },
  ProductName:{
    type: String
  },
  OfferPicUrl:{
    type: String
  },
  Display:{
    type:Boolean,
    default:false
  },
  Valid:{
    type:Boolean
  }

},{
    timestamps:true
});

module.exports=mongoose.model('Offer',offerSchema);
