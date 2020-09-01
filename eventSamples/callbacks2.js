var events = require("events");
var readline = require("readline");
//demo.js
//A simple program to demonstrate the difference between
//how event-driven asynchronous NodeJS programs and those
//that you may be used to see.  It's important to understand
//what "event-driven" means.  

//readline has events for line, pause, resume, and close 
var rl = readline.createInterface({
    input: process.stdin,//use std in as this reader's input/readable stream
    output: process.stdout // std out as the reader's output/writable stream
});


console.log("What is the answer to the first question?");

//The problem here is that this code will run whenever data  is
//entered into stdin (we don't even have to hit enter). 

//this is a non-blocking event (asynchronous). Any time data (key) is entered
//a 'data' event is emitted by process.stdin (built-in event). We are saying:
//"whenever you hear a data event, run this callback"

process.stdin.on('data', (chunk) =>{

    console.log(`\nData Received: ${chunk}`);
    
});



//The second question prints immediately after the first without the
//command line "waiting" for the first (non-blocking) event to complete
rl.question("What is the answer to the second question?", answer=>{

    //readline Questions are designed to respond to "line" events so this will
    //only run when it receives a new line char
 
    //Question blocks and waits for a full response but because it blocks
    //it is passed to a background thread and the main loop continues
    
    
      console.log(`The full answer!  ${answer}`);
    
    //console.log("Completed"); //When uncommented, this will only run AFTER
    //A response has been given
    process.exit(0);
}); 
//console.log("\n\nCompleted");
//Note how the above line (when uncommented) will run immediately before an
//answer is supplied

//  Any code you want to run AFTER a callback, must be at  the
//bottom of the body of the callback.  You will often see callbacks chained
//together in this way
