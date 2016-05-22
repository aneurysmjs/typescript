
/**
 For of

 Iterates over the values of the array directly

 when iterating using `for in`, you're actually iterating over the index values (0, 1, 2)
 In order to the order to get the actual values of the array you need to use those indexes
 to reference those values in the array

 for (var i in arr) {
   var val = arr[i]; // using the index to grab the value out of that array
   console.log(`${i}, ${val}`);
}

 */

var arr = [
   'matthias eats sr.wok',
   'learn typescript',
   'sleep more often'
];

for (var val of arr) {
   console.log(`${val}`);
}


