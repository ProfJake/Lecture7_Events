var files = require("fs");  //more on FS next week

/* Callbacks.js
Jake Levy
Aug 2020

A file demonstrating how Node handles Blocking I/O and callbacks
*/

var myCallback = function(someData){

    console.log(`Recieved ${someData}`);
}
var outer = function(someData, callback){

    //process some data
    
    callback(someData); ///guaranteed to run at the end of this function.
}


//file Reading and Writing functions accept a callback handler function
//to run at the end of their process, for cleanup or other admin level tasks
//calls to file system require Blocking IO
//if this happened in the main thread, we could conceivably be left
//waiting forever, if a problem occurred, so this is run in a background thread
//and the main loop continues.
files.writeFile('./testOut.txt', "test Data", {encoding: 'utf8', flag: 'w'}, function(err){
    if (err){
	console.log(err.message);
    }
    else{
	console.log("ELSE"); //Notice that Prints AFTER everything else
	//that's because it takes longer to open a file and write to it
	//than it does for the "outer" function and console.log lines to
	//execute
    }
});
outer("Test Data", myCallback);  //call outer and pass it "myCallback"
console.log("Completed");

