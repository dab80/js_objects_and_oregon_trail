(function() {
  'use strict';

  //--- Traveler Object
  function Traveler(name_in) {
    var amount = Math.floor(Math.random() * 100); //amount of food
    var name = name_in; //traveler's name
    var healthy = true;

    //getters
    this.getName = function() {
      return name;
    }
    this.getAmount = function() {
      return amount;
    }
    this.getHealthy = function() {
      this.checkHealth();
      return healthy;
    }

    //setters
    this.setAmount = function(amount_in) {
      amount = amount_in;
      this.checkHealth();
      // console.log(name + " has amount of " + amount);
    }//end of setAmount

    //adding functionality
    this.eat = function() {
      if (amount <= 20) {
        this.setAmount(0);
      } else {
        this.setAmount(amount - 20)
      }
    }//end of eat

    this.checkHealth = function() {
      if (amount < 20) {
        healthy = false;
      } else {
        healthy = true;
      }
    }//end of checkHealth
  } //end of traveler object

  //--- Wagon Object
  function Wagon(capacity_in) {
    var passengers = []; //array of traveler objects
    var capacity = capacity_in; //capacity of the wagon

    //getters
    this.getCapacity = function() {
      return capacity;
    }

    this.getNumPassengers = function() {
      return passengers.length;
    }

    this.getTotalFood = function() {
      let totalFood = 0;
      // console.log("Total Food is " + totalFood);
      for (let i = 0; i < passengers.length; i++) {
        totalFood = totalFood + passengers[i].getAmount();
        // console.log("Total Food is " + totalFood);
      }
      return totalFood;
    } //end of getTotalFood

    //adding functionality
    this.isSomeoneSick = function() {
      for (let i = 0; i < passengers.length; i++) {
        // console.log(passengers[i].getName() + " healthy = " + passengers[i].getHealthy() );
        if (passengers[i].getHealthy() == false) {
          return true;
        }
      } //end of for loop
      return false;
    } //end of isSomeoneSick

    this.addPassenger = function(passenger_in) {
      passengers.push(passenger_in);
    }

  } //end of wagon object

  //--- Make a Wagon Object
  function makeWagon(capacity) {
    return new Wagon(capacity);
  }

  //--- Make a Traveler Object
  function makeTraveler(name) {
    return new Traveler(name);
  }

  //--- A Traveler Hunts
  function hunt(traveler_in) {
    // console.log(traveler_in.getName() + " has " + traveler_in.getAmount() + " before hunting.");
    if (Math.floor(Math.random() >= .5)) {
      traveler_in.setAmount(traveler_in.getAmount() + 100);
    }
    // console.log(traveler_in.getName() + " has " + traveler_in.getAmount() + " after hunting.");
  } //end of hunt

  //--- A Traveler Eats
  function eat(traveler_in) {
    // console.log(traveler_in.getName() + " has " + traveler_in.getAmount() + " before eating.");
    // traveler_in.setAmount(traveler_in.getAmount() - 20);
    traveler_in.eat();
    // console.log(traveler_in.getName() + " has " + traveler_in.getAmount() + " after eating.");
  } //end of eat

  //--- A Traveler joins a Wagon
  function join(wagon_in, traveler_in) {
    // console.log("Num passengers before adding " + traveler_in.getName() + " is " + wagon_in.getNumPassengers());
    if (wagon_in.getNumPassengers() < wagon_in.getCapacity()) {
      wagon_in.addPassenger(traveler_in);
    }
    // console.log("Num passengers after adding " + traveler_in.getName() + " is " + wagon_in.getNumPassengers());
  } //end of join

  //-- Checking for someone being sick
  function quarantine(wagon_in) {
    return wagon_in.isSomeoneSick();
  }

  //--- Total food on the wagon
  function food(wagon_in) {
    return wagon_in.getTotalFood();
  }

  // Create a wagon called 'wagon'
  let wagon = makeWagon(5);
  // Create a traveler with the name 'Henrietta' called 'traveler'
  let traveler = makeTraveler('Henrietta');
  // Create a traveler with the name 'Juan' called 'traveler2'
  let traveler2 = makeTraveler('Juan');

  // console.log("Wagon capacity = " + wagon.getCapacity());
  // console.log("traveler name = " + traveler.getName());
  // console.log("traveler2 name = " + traveler2.getName());
  // console.log("-------------------------");

  hunt(traveler); // maybe get more food
  // console.log("-------------------------");
  eat(traveler2);
  // console.log("-------------------------");
  eat(traveler2); // juan is hungry
  // console.log("-------------------------");
  join(wagon, traveler);
  // console.log("-------------------------");
  join(wagon, traveler2);
  // console.log("-------------------------");

  console.log(quarantine(wagon)); // print true if someone is sick, false otherwise
  // console.log("-------------------------");
  console.log(food(wagon)); // print juan's food + henrietta's food

})();
