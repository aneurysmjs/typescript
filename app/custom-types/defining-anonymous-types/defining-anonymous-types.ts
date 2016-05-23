/**
 * Anonymous Type
 * You can actually declare interfaces inline anywhere that accepts a type.
 *
 * lets say that you want a variable that accepts and object that has a `name`
 * property, rather than define a whole interface with just one property, you
 * could simply define the type right inline.
 */

var person: { name: string };

person = {
   name: 'jero'
};