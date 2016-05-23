interface IProduct {
   name: string;
   price: number;
   isInStock?: boolean;
}
/*
* the biggest difference between this interface and the jQuery library is that
* instead of returning `HTMLElement`s, the real jQuery function returns a `jQueryElement`.
*
* a `jQueryElement` is a plain JavaScript object that has helpers methods like
* the `data` method which allows you to assign data to an html `data` property
* or extract the previously assigned value from a `data` attribute.
*/

interface IjQuery {
   (selector: (string | any)): IjQueryElement;
   fn: any;
   version: number;
}

/*
* The jQuery plugin model says once you add a method to the `fn` property, you should
* be able to call it from any `jQueryElement` just like you call the `data` method
*
* container.product(product); // Property 'product' does not exist on type 'jQueryElement'
*
* since the custom extension method is not listed on the `jQueryElement` interface, to fix
* it by updating `IjQuery` interface directly to include the new method like this
*
* interface IjQuery {
*  (selector: (string | any)): IjQueryElement;
*  fn: any;
*  version: number;
*  product(): Iproduct;
*  product(product: Iproduct): IjQueryElement;
* }
*
* you could do that but since jQuery is a third-party library that you didn't create and
* you don't own, in tha case is a really bad idea to update their interface just to add your
* custom extensions. luckily TypeScript will let you extend any interface without changing the
* original definition.
*
* rather than update jQuery team's interface, you can create a brand new interface that shares
* the same exact name as the one you want to extend.
*
* interface IjQuery {
*  product(): Iproduct;
*  product(product: Iproduct): IjQueryElement;
* }
*/

// it's a pretty good idea to only apply this approach to code you don't own.
interface IjQuery {
   product(): IProduct;
   product(product: IProduct): IjQueryElement;
}

interface IjQueryElement {
   data(name: string): any;
   data(name: string, data: any): IjQueryElement;
}

/*
* jQuery actually allows you to extend its API by simply attaching new functions
* to a special property called `fn`, so you can use it to create something like
* this custom method that assigns an instance of a `product` to the data of a
* `HTMLElement` or retrieves the previously assigned `product` instance.
*/

$.fn.product = function (product?: IProduct): IProduct {
   if (product) {
      $(this).data('product', product);
   } else {
      return $(this).data('product');
   }
};

var product = {name: 'laptop'};

// get a reference to a DOM element
var container = $('#container');

// assign the product object to the DOM element's data attribute named `product`
container.data('product', product);

// overloaded `data` to extract the value you just set by calling it with only the name
var savedProduct = container.data('product');



container.product(product); // Property 'product' does not exist on type 'jQueryElement'
