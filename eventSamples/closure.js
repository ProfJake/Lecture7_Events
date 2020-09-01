/*closure.js
Jake Levy
Aug 2020
Modified from listing 4.6 in NodeJS, MongDB, and Angular Web Development by
Dayley, Dayley and Dayley.

Providing Closure to a function is simply a way to provide a local copy 
of global state so that your async functions get the data that they are 
supposed to get.

*/
function logCar(logMSG, callback){
    process.nextTick(function() { callback(logMSG); });
}

var cars = ["Ferrari", "Porcshe", "Bugatti"];


//remember that let declarations have block scope.  That means there will
//be a different copy of message for each iteration of the loop
//This is basically what it means to provide closure.
for (var idx  in cars){
    let message = "Saw a " + cars[idx];
    logCar(message, function(){
	console.log("with Let closure: "+ message);
    });
}

//but here is there is only one function-scoped declaration. One copy for
//every iteration.  By the time the first log statement runs, the idx
//value has already hit the max value so it prints the same thing over and over
for (var idx  in cars){
    var message = "Saw a " + cars[idx];
    logCar(message, function(){
	console.log("Without Closure:"+ message);
    });
}
// OLD WAY of Providing closure
//defines a function and runs immediately with message as argument, effectively
//giving the anonymous function a private (aka local) variable

//Phew, thank goodness for let
for (var idx in cars){
    var message = "Saw a " + cars[idx];
    (function(msg){
	logCar(msg, function(){
	    console.log("Old Closure: " + msg);
	});
    })(message);
}
