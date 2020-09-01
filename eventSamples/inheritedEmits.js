var events  = require("events");
//We can create an emitter directly from the events module or we can inherit
//from it (see the Activitytracker for pre-ES6 syntax for inherited emitters)
//  This file has syntax for ES6 inherited emitters
//Note how similar JS is starting to look to Java

class Account extends events{
    constructor(){
	//in a sub-class, you MUST call the super-class constructor before you
	super(); 
	//can use the keyword "this" otherwise there is no "this" to attach
	//the new data to

	this.balance=0;
    }

    withdraw(amount){
	this.balance -= amount;
	this.emit("balanceChanged");

	//this emits both an event AND passes the balance to the
	//event handler by providing as an argument to emit
	if (this.balance < 0){
	    this.emit("accountOverdrawn", this.balance)
	}
	return this.balance;
    }

    deposit(amount){
	this.balance += amount;
	this.emit("balanceChanged")
    }
}

var myAcct = new Account();

var printNotice = function(){
    console.log("Transaction Completed!");
}

var printWarn = function(balance){
    console.log(`WARNING ACCOUNT BALANCE: ${balance}`);
}
//Here we make the object itself respond to the raised events
//because now it has direct access to the method "on" in the super-class
myAcct.on('balanceChanged', printNotice);
myAcct.on('accountOverdrawn', printWarn);

myAcct.deposit(1000);
myAcct.withdraw(600);
myAcct.withdraw(600);
