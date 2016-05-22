/*
* TypeScript offers 3 ways to define a custom type `Interfaces`, `Classes`, and `Enums`
*
* Interface:
* It access a contract that describes the data and the behaviors that the object
* exposes for others to interact with.
*/

interface IPerson {
   name: string;
   age?: number; // the '?' tells TypeScript not every person object needs to have a computed property 'age'
}

var jero: IPerson = {}; // Type '{}' is not assignable to type 'IPerson'. Property 'name' is missing in type '{}'

/*
* instead of defining the type of the variable, you can define the type of the object
* using the 'casting' syntax
*
* var jero = <IPerson>{};
*/

var person: IPerson = {
   name: 'Jentoo',
   age: 27
};


// define methods signatures
interface IPersonService {
   createPerson(person: IPerson): IPerson;
   retrievePersons(): IPerson[]; // returns an array of persons
   updatePerson(id: number): IPerson
   deletePerson(id: number): void // returns nothing
}
