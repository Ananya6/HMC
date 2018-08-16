const mongoose = require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency=mongoose.Types.Currency;

// const offerSchema=new Schema({
//   DiscountPercent:{
//     type: Number
//   },
//   Discount:{
//     type: Number
//   },
//   QuantityApplicable:{
//     type: Number,
//     min:1
//   },
//   OfferPicUrl:{
//     type: String
//   },
//   Display:{
//     type:boolean,
//     default=false
//   },
//   Valid:{
//     type:boolean
//   }
//
// },{
//     timestamps:true
// });

const productSchema=new Schema({
  ProductId:{
  type:Number,
  required:true,
  //unique:true
},
  ProductName:{
    type:String,
    required:true,
    unique:true
  },
  SoldOut:{
    type:Boolean,
  },
  CategoryId:{
    type:String,
  },
  CategoryName:{
    type:String,
    required:true
  },
  Veg:{
    type:Boolean,
  },
  Description:{
    type:String
  },
  DescriptionQuantity:{
    type:String
  },
  PriceDisplay:{
    type:Currency,
  },
  Price:{
    type:Currency,
    required:true,
  },
  Calories:{
    type:Number,
    min:0
  },
  Protein:{
    type:Number,
    min:0
  },
  Fats:{
    type:Number,
    min:0
  },
  Fibers:{
    type:Number,
    min:0
  },
  ImageUrl:{
    type:String,
  },
  Sides:{
    type:String
  },
  Ingredients:{
    type:String
  },
  Likes:{
    type:Number,
    min:0
  },
  New:{
    type:Boolean,
    default:true
  }
},{
  timestamps:true
});

module.exports=mongoose.model('product',productSchema);
