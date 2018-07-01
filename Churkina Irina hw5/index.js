//general characteristics
var FoodItem = function(item) {
    this.name = item.name;
}

FoodItem.prototype.getItemPrice = function(){
  return this.calculatePrice ? this.calculatePrice() : this.price;
}

FoodItem.prototype.getItemCalories = function(){
  return this.calculateCalories ? this.calculateCalories() : this.calories;
}
/**
* Класс, объекты которого описывают параметры салата.
*
* @constructor
* @param weight      Вес салата
* @param name        Название салата
*/

var Salad = function(salad, weight) {
    this.name = salad.name;
    this.weight = weight;
    this.price = salad.price;
    this.calories = salad.calories;
    FoodItem.apply(this, arguments);
}


Salad.prototype = Object.create(FoodItem.prototype);
Salad.prototype.constructor = Salad;

Salad.CAESAR = {
  name:'caesar',
    price: 100,
    calories: 20
};

Salad.OLIVIER = {
  name:'olivier',
    price: 50,
    calories: 80
};

Salad.prototype.getName = function(){
  return this.name;
}

Salad.prototype.getWeight = function(){
  return this.weight;
}

Salad.prototype.getPrice = function(){
  return this.price;
}

Salad.prototype.getCalories = function(){
  return this.calories;
}

Salad.prototype.calculatePrice = function(){
  return this.getPrice() * this.getWeight() / 100;
}

Salad.prototype.calculateCalories = function(){
  return this.getCalories() * this.getWeight() / 100;
}


//new Salad(Salad.CAESAR, 200)

/**
* Класс, объекты которого описывают параметры гамбургера.
*
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/

var Hamburger = function(size, stuffing){
  this.size = size;
  this.stuffingList = [stuffing];
  FoodItem.apply(this, arguments);
}

Hamburger.SIZE_SMALL = {name: 'smallBurger', price: 50, calories: 20};
Hamburger.SIZE_LARGE = {name: 'bigBurger', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: 'cheese', price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {name: 'salad', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: 'potato', price: 10, calories: 20};


Hamburger.prototype = Object.create(FoodItem.prototype);
Hamburger.prototype.constructor = Hamburger;

Hamburger.prototype.getSize = function (){
  return this.size;
};

Hamburger.prototype.getstuffing = function () {
  return this.stuffingList;
}

Hamburger.prototype.calculatePrice = function () {
  this.price = this.getSize().price;
  var stuffingList = this.getstuffing();

  for(var stuffingItem in stuffingList){
    this.price += stuffingList[stuffingItem].price;
  }
  return this.price
}

Hamburger.prototype.calculateCalories = function (){
  this.calories = this.getSize().calories;
  var stuffingList = this.getstuffing();

  for(var stuffingItem in stuffingList){
    this.calories += stuffingList[stuffingItem].calories;
  }
  return this.calories;
}

Hamburger.prototype.addstuffing = function(stuffing) {
    !this.stuffingList[stuffing] ? this.stuffingList[stuffing] = 1 : this.stuffingList[stuffing] += 1
}

/**
* Класс, объекты которого описывают параметры напитка.
*
* @constructor
* @param name       Название
*/

//drinks:
var Drink = function(drink) {
  this.name = drink.name;
  this.price = drink.price;
  this.calories = drink.calories;
  FoodItem.apply(this, arguments);
}

Drink.prototype = Object.create(FoodItem.prototype);
Drink.prototype.constructor = Drink;

Drink.COLA = {
  name: 'cola',
    price: 50,
    calories: 40
}

Drink.COFFEE= {
  name: 'coffee',
    price: 80,
    calories: 20
}


//Order:

var Order = function(meals) {
    var price;
    var calories;
    var self = this;
    this.itemsList = [];
    Array.isArray(meals) ? this.itemsList = meals : meals === undefined ? this.itemsList = [] : this.itemsList = [meals];

    function calcOrder() {
        price = 0;
        calories = 0;
        if (self.itemsList.length) {
            self.itemsList.forEach(function(item) {
                price += item.getItemPrice();
                calories += item.getItemCalories();
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
        var OrderNames = this.itemsList.map(function(item) {
            return item.name;
        });
        return OrderNames
    }

    this.startCooking = function() {
        Object.freeze(self.itemsList);
    }
}

Order.prototype.addMeal = function(meal) {
    try{
      meal.name ? this.itemsList.push(meal) : '';
    }catch(err){
      console.log('Error occurred. Probably your order is already cooking')
    }
}
Order.prototype.removeMeal = function(meal) {
    try{
      if (typeof(meal) == 'string') {
          for (var i = 0; i < this.itemsList.length; i++) {
              if (this.itemsList[i].name == meal) {
                  this.itemsList.splice(i, 1);
              }
          }
      } else if (this.itemsList.indexOf(meal) != -1) {
          this.itemsList.splice(this.itemsList.indexOf(meal), 1);
      }
    }catch(err){
      console.log('Error occurred. Probably your order is already cooking')
    }
}


//create menu

var caesar = new Salad(Salad.CAESAR, 200); // name, weight

var burger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO) //size, stuffing

var cola = new Drink(Drink.COLA); //name


//create new Order:
var order1 = new Order([cola, burger]) //object or an array of objects
