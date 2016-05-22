function add1() { // a function that takes any number of arguments
   var values = Array.prototype.splice.call(arguments, [1]), //convert it into an array than can be iterated over
       result = 0;

   for (var value of values) {
      result += value;
   }

   return result;

}

// same function but using the spread operator so we don't have to do the old 'Array.prototype.splice.call'
function add2(...values) { // a function that takes any number of arguments
   var result = 0;

   for (var value of values) {
      result += value;
   }

   return result;

}

//function that handles multiple operations

function calc(operation, ...values) {
   var result = 0;

   for (var value of values) {

      switch(operation) {

         case 'add':
            result += value;
            break;

         case 'subtract':
            result -= value;
            break;

      }

   }

   return result;
}

calc('subtract', 1, 2, 3, 4);


// inject and array in the middle of another array

var sourceArray = [3, 4, 5];
var target = [1, 2, ...sourceArray,  6, 7];

// push with spread

var numbers = [1, 2, 3];
var otherNumbers = [4, 5, 6];

numbers.push(...otherNumbers);