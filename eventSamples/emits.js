var events  = require("events");
var emitter = new events.EventEmitter();
//Modified/Simplified from Listing 4.4 NodeJS, MongoDB, and Angular Web Dev.
//By Dayley, Dayley, and Dayley

//We can create an emitter directly from the events module or we can inherit
//from it (see the text Chapter, listing 4.4 for pre-ES6 syntax
//for inherited emitters)   This file has syntax for ES6 non-inherited emitters

class Account{
    constructor(){
	this.balance=0;
    }

    withdraw(amount){
	this.balance -= amount;
	emitter.emit("balanceChanged");

	//this emits both an event AND passes the balance to the
	//event handler by providing as an argument to emit
	if (this.balance < 0){
	    emitter.emit("accountOverdrawn", this.balance)
	}
	return this.balance;
    }

    deposit(amount){
	this.balance += amount;
	emitter.emit("balanceChanged")
    }
}

var myAcct = new Account();

var printNotice = function(){
    console.log("Transaction Completed!");
}

var printWarn = function(balance){
    console.log(`WARNING ACCOUNT BALANCE: ${balance}`);
}
//In this case, we have to make the emitter respond to the
//events that it raises when stuff happens
emitter.on('balanceChanged', printNotice);
emitter.on('accountOverdrawn', printWarn);

myAcct.deposit(1000);
myAcct.withdraw(600);
myAcct.withdraw(600);
