module.exports=function Cart(oldCart){
  this.items= oldCart.items || {};
  this.totalQty= oldCart.totalQty || 0;
  this.totalPrice= oldCart.totalPrice || 0;
  this.totalDiscount=oldCart.totalDiscount || 0;

  this.add=function(item,discount,id){
      var storedItem =this.items[id];
      if(!storedItem){
        storedItem=this.items[id] ={item :item, qty: 0, price: 0,discount:discount };
      }
      console.log("hello i m in cart.js");
      // console.log(storedItem.item.Price);
      storedItem.qty++;
      storedItem.price=storedItem.item.PriceDisplay * storedItem.qty;
      this.totalQty++;
      this.totalPrice+=storedItem.item.PriceDisplay;
      //considering discount is applicable per item basis
      this.totalDiscount+=storedItem.discount;
  };
  this.addOwn=function(type,ownMealCustoms){
    var id= new Date().getUTCMilliseconds();
    var item=new Object;
    item._id=id;
    item.ProductName='Own Meal -'+type.toUpperCase();
    item.PriceDisplay=380;
    item.Price=200;
    item.ImageUrl=type+'1.jpg';
    item.ownMealCustoms=ownMealCustoms;
    console.log(item);
    var storedItem=this.items[id]={item: item,qty:1,price:item.PriceDisplay,discount:30};
    this.totalQty++;
    this.totalPrice+=storedItem.item.PriceDisplay;
    this.totalDiscount+=storedItem.discount;

  };

  this.generateArray= function(){
    var itemArray=[];
    for(var id in this.items){
      itemArray.push(this.items[id]);
    }
    return itemArray;
  };


  this.remove=function(id){
    var storedItems=this.items;
    var itm=storedItems[id];
    console.log('price is:');
    console.log(storedItems[id].price);
    this.totalQty=this.totalQty-storedItems[id].qty;
    console.log(this.totalQty);
    this.totalPrice=this.totalPrice-storedItems[id].price;
    console.log(this.totalPrice);
    this.totalDiscount-=storedItems[id].discount;
    delete storedItems[id];
  }
};
