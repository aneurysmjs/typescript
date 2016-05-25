/**
 * prototype-based programming starts with a special object called
 * the `prototype`, if you want to share behavior between object
 * instances, you define that behavior on the `prototype` object and
 * then link other object instances to that object.
 *
 * Keep in mind in JavaScript, objects are bags of dynamic properties
 * which means accessing a property is not as simple testing whether or
 * not that property exist, instead whenever you attempt to access any
 * property on an object, JavaScript tries as hard as it can to find
 * the property you looking for.
 *
 * first it looks the property on the object itself, just like you asked too
 * is it finds a property with that name on the object that you referenced,
 * then great, it accesses that property and it's done.
 *
 * if however, JavaScript doesn't find that matching property on that object,
 * it doesn't give up there, instead it at the object's `prototype` to see if
 * the method exist on that object, if that property exist on the `prototype`,
 * then JavaScript refers to that property and it's done. Otherwise it accesses
 * the `prototype's` `prototype` and it continues all the way up the chain until
 * it reaches the root of everything the `Object.prototype`.
 *
 * When JavaScript creates any object.
 *
 * var o = {};
 *
 * it automatically links its `prototype` object to `Object.prototype` the same
 * is true for the other 2 special objects functions and arrays, only when
 * JavaScript creates with these 2 types, links them to the `Function.prototype`
 * and `Array.prototype` respectively allowing all functions and arrays to share
 * common behavior such as the `slice` method on an array or the `bind` method on
 * a function, perhaps the most common way that JavaScript assigns a `prototype` to
 * an object is with a `constructor` which is really a function that is called with
 * the `new` keyword, when you initialize an object with the `new` keyword, JavaScript
 * does 3 things.
 *
 * 1) it creates a new object.
 * 2) it sets the new object's `prototype` to the `constructor` function's `prototype`.
 * 3) it executes the function that you called  with the `new` keyword referring to
 * the new object as `this` within that method
 *
 */

function ProductService() {
   // this function assigns the `products` property on the `this` object to a new empty array
   // `this` object refers to the object that JavaScript created for us in 1st step
   this.products = [];
}

// Define properties that will be available to all instances of `ProductService` on its `prototype`
ProductService.prototype.retrieveProducts = function () {
   /*
      note that how you're referring the array of products through
      the `this` keyword, just as you expect the `this` keyword refers
      to the instance of the object.
   */
   return this.products;
};