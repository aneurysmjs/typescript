/*
* Union Types
*
* Allows the arguments to accept either a specific type or other
*
* to specify a union type you simple use the pipe operator `|` to list
* additional types that are acceptable.
*
* for example we want the function to allow the `x` and `y` arguments to
* accept either a string or an array.
* optionally you can wrap union types with parenthesis to make things cleaner
* function (x: (string | any[]), y: (string | any[])): number {...}
*
* since the string and array type both have a length property the code continues
* to be valid, in fac the string and array type happen to share a couple of
* properties and Typescript offers them as autocomplete options, if however
* I attempt to access a property that only belongs to one type or the other,
* Typescript will yield telling you that you can't access the property because
* it doesn't exist on both types
*
* x.slice(0);
* x.push('something'); // property 'push' does no exist on type 'string'
* x.substr(1); // property 'substr' does no exist on type 'string'
*
* let's say that we really do want to be able to threat each variable differently
* depending of which type it is, in other words, is nice that you can add up the
* total of the length properties on both of then or even call `slice`, but what if
* you want to be able to 'push' a value onto an array if it's  an array or get the
* substring of a string if it's a string, luckily Typescript is smart enough to
* handle that too. Just use the built in JavaScript keyword `instanceof` to test
* the variable's type
*
* if (x instanceof Array) {
*  x.push('something');
* }
*
* after doing that, TypeScript knows that in order to make it in to the `if` block
* the object had to be and array, so TypeScript lets you threat it like an array
* that is known ad the 'type guard syntax', once you exit the `if` block and you
* outside of the scope and the safety of the type guard, TypeScript can't no long
* guaranteed the variable's type, so you're back to be able to access the properties
* that both union types share
*
*/

function calcLength(x: (string | any[]), y: (string | any[])): number {
   var total: number = x.length + y.length;

   x.slice(0);

   if (x instanceof Array) {
      x.push('something');
   }

   if (x instanceof String) {
      x.substr(1);
   }

   return total;

}

