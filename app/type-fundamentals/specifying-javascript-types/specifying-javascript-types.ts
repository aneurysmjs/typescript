/**
 * `x: any[]` an array of objects of any type
 * `y: string` a string
 * func (x: any[], y: string): number { tells typescript that the function returns a number
 * var total: number = x.length + y.length; tells typescript that result of that equation is a number
 */

function calcLength(x: any[], y: string): number {
   var total: number = x.length + y.length;
   return total;
}

