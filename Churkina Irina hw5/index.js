//general characteristics
var foodItem = function(name, price, calories, portion) {
    this.name = name;
    this.price = price * portion;
    this.calories = calories * portion;
}

//salads:
var salad = function(name, weight) {
    //menu constants:
    const _regularPortion = 100;
    const _caesar = {
        price: 100,
        calories: 20
    };
    const _olivier = {
        price: 50,
        calories: 80
    };

    switch (name) {
        case 'olivier':
            foodItem.call(this, name, _olivier.price, _olivier.calories, weight / _regularPortion);
            break;
        case 'caesar':
            foodItem.call(this, name, _caesar.price, _caesar.calories, weight / _regularPortion);
            break;
        default:
            console.log('We don`t have this position in menu');
            return
            break;
    }
}
salad.prototype = Object.create(foodItem.prototype);
salad.prototype.constructor = salad;

salad.prototype.getSize = function() {
    return this.weight
}

//Hamburgers:
var hamburger = function(name, bigSize, topping) {
    if(!/burger/.test(name)){
      console.log('this is not a burger');
      return
    }
    this.bigSize = bigSize;
    const smallBurgerRatio = 0.5;
    const _burger = {
        price: 100,
        calories: 40
    }
    topping != undefined ? this.topping = topping : this.topping = []
    if (this.bigSize) {
        foodItem.call(this, name, _burger.price, _burger.calories, 1);
    } else {
        foodItem.call(this, name, _burger.price * smallBurgerRatio, _burger.calories * smallBurgerRatio, 1);
    }
}

hamburger.prototype = Object.create(foodItem.prototype);
hamburger.prototype.constructor = hamburger;

hamburger.prototype.addTopping = function(topping) {
    var existed = this.topping.length;
    var type = typeof(topping);
    if (type === 'object') {
        this.topping = this.topping.concat(topping);
    } else if (type === 'string') {
      !existed ? this.topping = []: '';
      console.log(this.topping)
      this.topping.push(topping);
    }
    for (var t = existed; t < this.topping.length; t++) {
        switch (this.topping[t]) {
            case 'cheese':
                this.calories += 20;
                this.price += 10;
                break;
            case 'salad':
                this.calories += 5;
                this.price += 20;
                break;
            case 'potato':
                this.calories += 20;
                this.price += 10;
                break;
            default:
                console.log('We don`t have this position in menu');
                return
                break;
        }
    }
}

hamburger.prototype.getSize = function() {
    return this.bigSize ? 'big' : 'small'
}

hamburger.prototype.getStuffing = function() {
    return this.topping;
}

//drinks:
var drink = function(name) {
    //menu constants:
    const _cola = {
        price: 50,
        calories: 40
    }
    const _coffee = {
        price: 80,
        calories: 20
    }

    switch (name) {
        case 'cola':
            foodItem.call(this, name, _cola.price, _cola.calories, 1);
            break;
        case 'coffee':
            foodItem.call(this, name, _coffee.price, _coffee.calories, 1);
            break;
        default:
            console.log('We don`t have this position in menu');
            return
            break;
    }
}

drink.prototype = Object.create(foodItem.prototype);
drink.prototype.constructor = drink;

//order:
var order = function(meals) {
    let price;
    let calories;
    let self = this;
    this.itemsList = [];
    Array.isArray(meals) ? this.itemsList = meals : meals === undefined ? this.itemsList = [] : this.itemsList = [meals];

    function calcOrder() {
        price = 0;
        calories = 0;
        if (self.itemsList.length) {
            self.itemsList.forEach(function(item) {
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
        var orderNames = this.itemsList.map(function(item) {
          return item.name;
        });
        return orderNames
    }

    this.startCooking = function() {
        self.addMeal = function() {
            console.log('We`re preparing your order :) You cannot change it');
            return
        }
        self.removeMeal = function() {
            console.log('We`re preparing your order :) You cannot change it');
            return
        }
    }
}

order.prototype.addMeal = function(meal) {
    this.itemsList.push(meal);
}
order.prototype.removeMeal = function(meal) {
    if (typeof(meal) == 'string') {
        for (var i = 0; i < this.itemsList.length; i++) {
            if (this.itemsList[i].name == meal) {
                this.itemsList.splice(i, 1);
            }
        }
    } else if (this.itemsList.indexOf(meal) != -1) {
        this.itemsList.splice(this.itemsList.indexOf(meal), 1);
    }
}


//create menu

var caesar = new salad('caesar', 200); // name, weight
//method witch is avaliable for salads: getSize();

var burger = new hamburger('cheeseburger', true, ['potato', 'cheese']) //name, big=true|small=false, topping-string or topping array
//methods witch are avaliable for hamburgers: getStaffing(); , getSize(); , addTopping(*string or an array*)

var cola = new drink('cola'); //name


//create new order:
var order1 = new order([cola, burger]) //object or an array of objects
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
