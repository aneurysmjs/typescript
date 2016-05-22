import get = Reflect.get;
/**
 Destructuring

 Is the ability to assign values to multiple variables from a single object
 with a single statement.

 */

var array = [6, 'matthias likes peppa', true];

var [age, bio, done] = array;

//

var a = 1;
var b = 2;

[a, b] = [b, a];

//

var todo = {
    id: 1,
    title: 'learn typescript',
    completed: false
};

var {id, title, completed} = todo;

//

function getPersonInfo(id) {
    var person = {
        name: 'jero',
        senior: false,
        social: 'https://www.twitter.com/blackendjero'
    };

    return person;
}

var {name, senior, social} = getPersonInfo(1);
// assign a property to variable with a different name
var {name, senior: isSenior, social} = getPersonInfo(1);

//

function countdown({
    initial,
    final: final = 0,
    interval: interval = 1,
    initial: current // assign initial property to two different variables
}) {

    while (current > final) {
        console.log(current);
        current -= interval;
    }

}