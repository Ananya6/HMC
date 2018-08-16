const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const categorySchema=new Schema({
  CategoryId:{
    type:Number,
    unique:true
  },
  CategoryName:{
    type: String
  },
  Customizations:{
    type: Array
  },
  CreateYourOwnMeal:{
   type: Array
  }
},
{
timestamps:true
}
);

module.exports=mongoose.model('category',categorySchema);
