for (var x = 0; x <= 5; x++) {
   // when using `var`, it doesn't respect block scope, that's why is visible outside the for loop
   //var counter = x;
   let counter = x;
}
console.log(counter); // when using `let`, it does respect block scope, and is only why visible inside for loop or whether there's braces