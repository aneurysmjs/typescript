function calcLength(x: string, y: string): number
function calcLength(x: any[], y: any[]): number
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