/**
 Type Inference

 Static analysis means that regardless in whether you explicit define types or not
 Typescript looks through your code doing it best to guest or 'infer' what type any
 given object could be. In other words, even thou this is plain-old JavaScript just
 using the code that is written, Typescript is able to figure it out that the type
 of the `name` and `subject` properties are strings, the `age` property is a number
 and the `greet` property is a function. it even knows that the `person` variable
 is a type that has 4 properties `name`, `subject`, `age` and `greet`, it knows all
 of this because it can inspect the assignment of each of those properties to see
 what type of value was assigned to them.
 */

var person = {
   name: 'jero',
   subject: 'TypeScript',
   age: calcAge(1989),
   greet: function () {
      console.log('Hablamelo');
   }
};

person.name = 1;

/*
   add a function to calculate the person current age by subtracting the year was
   born from the current year.
 */

function calcAge(birthYear) {
   return Date.now() - birthYear;
}