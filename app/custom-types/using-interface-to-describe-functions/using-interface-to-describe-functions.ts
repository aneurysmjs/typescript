interface IjQuery {
   (selector: string): HTMLElement;
   version: number;
}
/**
 * by using the casting syntax to force TypeScript to threat that function
 * as an instance of the IjQuery interface
 *
 * think of the casting syntax as the opposite of the `any` keyword
 */
var $ = function <IjQuery>(selector) {
   // find DOM element
};