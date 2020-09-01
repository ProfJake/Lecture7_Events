/*self.js
Jake Levy
Aug 2020
Self-invoking functions provide closure
*/
var func = function(){
    console.log("Weird, right?");
}();

//This is effectively a factory pattern that provides closure.
//The function is run immediately with a 5 as its argument.
//The inner function captures the arg value in numOne.
// And returns a function that takes an argument
var addFive =  function(numOne){

    return function(numTwo){ return numOne+numTwo;};
}(5);

//Now when we pass in 10 to the function, it is stored in numTwo
console.log(addFive(10));

//Or we could write it like this:
function makeAdder(primary){

    return (secondary) => { return primary + secondary; };
}
var addTen = makeAdder(10);

console.log(addTen(33));
