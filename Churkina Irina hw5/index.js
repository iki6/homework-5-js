//general characteristics
var foodItem = function(name, price, calories){
  this.name = name;
  price? this.price = price : '';
  calories? this.calories = calories : '';
}

//salads:
var salad = function(name, weight){
  //menu constants:
  var _caesarPrice = 100;
  var _caesarCal = 20;
  var _olivierPrice = 50;
  var _olivierCal = 80;

  switch(name){
    case 'olivier':
        this.price = _olivierPrice;
        this.calories = _olivierCal;
    break;
    case 'caesar':
        this.price = _caesarPrice;
        this.calories = _caesarCal;
    break;
    default:
      console.log('We don`t have this position in menu');
      return
    break;
  }
  this.weight = weight;
  this.price = this.weight/100 * this.price;
  this.calories = this.weight/100 * this.calories;

  foodItem.call(this, name);
}
salad.prototype=Object.create(foodItem.prototype);
salad.prototype.constructor = salad;

salad.prototype.getSize=function() {
  return this.weight
}

//Hamburgers:
var hamburger = function(name,bigSize,topping){
  this.bigSize=bigSize;
  topping!=undefined?this.topping=topping:this.topping=[]
  if(this.bigSize){
    this.price = 100;
    this.calories = 40;
  }else{
    this.price = 50;
    this.calories = 20;
  }
    topping!=undefined && topping.length ? this.addTopping(topping):'';
    foodItem.call(this, name);
}

hamburger.prototype = Object.create(foodItem.prototype);
hamburger.prototype.constructor = hamburger;

hamburger.prototype.addTopping = function(topping){
  var existed = this.topping.length;
  var type = typeof(topping);
  if(type==='object'){
    this.topping = this.topping.concat(topping);
  }else if(type === 'string'){
    this.topping.push(topping);
  }
  for(var t=existed; t<this.topping.length; t++){
    switch (this.topping[t]){
      case 'cheese':
        this.calories+=20;
        this.price+=10;
        break;
      case 'salad':
        this.calories+=5;
        this.price+=20;
        break;
      case 'potato':
        this.calories+=20;
        this.price+=10;
        break;
      default:
        console.log('We don`t have this position in menu');
        return
      break;
      }
  }
  }

hamburger.prototype.getSize = function(){
  return this.bigSize? 'big' : 'small'
}

hamburger.prototype.getStuffing = function(){
  return this.topping;
}

//drinks:
var drink = function(name){
  //menu constants:
  var _colaPrice = 50;
  var _colaCal = 40;
  var _coffeePrice = 80;
  var _coffeeCal = 20;

  switch(name){
    case 'cola':
      this.price = _colaPrice;
      this.calories = _colaCal;
      break;
    case 'coffee':
      this.price = _coffeePrice;
      this.calories = _coffeeCal;
      break;
    default:
      console.log('We don`t have this position in menu');
      return
    break;
  }
  foodItem.call(this,name);
}

drink.prototype = Object.create(foodItem.prototype);
drink.prototype.constructor = drink;

//order:
var order = function(meals){
  var price;
  var calories;
  var self = this;
  this.itemsList = [];
  Array.isArray(meals) ? this.itemsList = meals : meals===undefined?this.itemsList = [] : this.itemsList = [meals];

  function calcOrder(){
    price = 0; calories = 0;
    if(self.itemsList.length){
      self.itemsList.forEach(function(item){
        price += item.price;
        calories += item.calories;
      })
    }
  }

  this.getOrderPrice = function() {
    calcOrder();
    return price;
  }
  this.getOrderCalories = function() {
    calcOrder();
    return calories;
  }
  this.getOrderList = function() {
    var orderNames = [];
    this.itemsList.forEach(function(item) {
      orderNames.push(item.name);
    })
    return orderNames
  }

  this.startCooking = function () {
    self.addMeal = function () {console.log('We`re preparing your order :) You cannot change it');return}
    self.removeMeal = function () {console.log('We`re preparing your order :) You cannot change it');return}
  }
}

order.prototype.addMeal = function(meal) {
  this.itemsList.push(meal);
}
order.prototype.removeMeal = function(meal) {
  if(typeof(meal)=='string'){
    for(var i=0; i<this.itemsList.length; i++){
      if(this.itemsList[i].name == meal){
        this.itemsList.splice(i,1);
      }
    }
  }else if(this.itemsList.indexOf(meal) != -1){
    this.itemsList.splice(this.itemsList.indexOf(meal),1);
  }
}


//create menu

var caesar = new salad('caesar',200); // name, weight
//method witch is avaliable for salads: getSize();

var burger = new hamburger('cheeseburger', true, ['potato', 'cheese']) //name, big=true|small=false, topping-string or topping array
//methods witch are avaliable for hamburgers: getStaffing(); , getSize(); , addTopping(*string or an array*)

var cola = new drink('cola');//name


//create new order:
var order1 = new order([cola, burger])//object or an array of objects
console.log(order1.getOrderList());
console.log(order1.getOrderPrice());
console.log(order1.getOrderCalories());
order1.addMeal(caesar);
console.log(order1.getOrderList());
order1.removeMeal(cola); //remove by clarifying object
order1.removeMeal('cheeseburger'); //or an item`s name
console.log(order1.getOrderList());
order1.startCooking();

var order2 = new order(new drink('coffee'));
console.log(order2.getOrderList());
order2.startCooking(); //cannot change order after cooking was started
order2.addMeal(new salad('olivier'), 50);
console.log(order2.getOrderList());
