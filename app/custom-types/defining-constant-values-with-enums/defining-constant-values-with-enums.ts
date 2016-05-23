/**
 * Enums
 * An enum is a way to organize a collection of related values.
 *
 * you been using a boolean value as the type of the `isInStock`
 * that describes whether the product is in stock or not, but lest
 * say instead of that, `product` can be in one of several different
 * states either 'New', 'Sold', 'Expired'.
 *
 * you use a number to indicate which state the product is in.
 * but you got a couple of different options, you might assign each
 * state a number like this
 *
 * New = 1
 * Sold = 2
 * Expired = 3
 *
 * or a character
 *
 * New = 'N'
 * Sold = 'S'
 * Expired = 'E'
 *
 * whatever value you use, you end up hardcoding those values all
 * through out your code, for example, let's say a product must be
 * in the 'Expired' state in order to delete it, so you end up writing
 * something like this:
 *
 * function deleteProduct(product: IProduct) {
 *  if (product.state !== 3) {
 *   throw "Can't delete a unexpired product"
 * }
 *
 * this makes a lot of sense right now because you know that the value 3
 * means the 'Expired' state, but what happens when you have to read this
 * code in 3 months and you complete it forgot what of all of those values
 * are or a new developer joins the team and doesn't know, all of the sudden
 * this same code is completely unreadable because you have no idea what '3'
 * refers to.
 *
 * a value that is crucial to make the application work but is completely
 * meaningless without some kind of context, 'Enums' provide context.
 *
 * // take a look te JavaScript code that TypeScript generates
 * var ProductState;
 *  (function (ProductState) {
 *   ProductState[ProductState["New"] = 1] = "New";
 *   ProductState[ProductState["Sold"] = 2] = "Sold";
 *   ProductState[ProductState["Expired"] = 3] = "Expired";
 *  })(ProductState || (ProductState = {}));
 *
 * by inspecting the `ProductState` in the console, you can see that the code
 * TypeScript generated creates two properties on the `ProductState` for each
 * enum value yo defined, a numeric value with a string key and a string value
 * with a numeric key
 *
 * `Object {1: "New", 2: "Sold", 3: "Expired", New: 1, Sold: 2, Expired: 3}`
 *
 * in other words `ProductState.New` translates into the number 1
 *
 * `ProductState.New` // 1
 * and if you have the number 1 and you want to get its name, you can get that
 * name by requesting it from the enum object like this:
 *
 * `ProductState[1]` // "New"
 *
 * note that even thou that this look like the syntax you use to access the
 * element of an array it is really the syntax you use in order to dynamically
 * access a property on an object
 *
 * so you can refactor the previous function and instead of hardcoding the number
 * 3, you use the enum
 *
 * function deleteProduct(product: IProduct) {
 *  if (product.state !== ProductState.Expired) {
 *   throw "Can't delete a unexpired product"
 * }
 *
 */

enum ProductState {
   New = 1,
   Sold = 2,
   Expired = 3
}

interface IProduct {
   name: string;
   price: number;
   state?: ProductState;
}

var product: IProduct = {
   name: 'book',
   price: 25.00,
   state: ProductState.New
};

function deleteProduct(product: IProduct) {
   if (product.state !== ProductState.Expired) {
      throw "Can't delete a unexpired product"
   }
}