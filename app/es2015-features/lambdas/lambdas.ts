var main = document.querySelector('main');

function Counter(element) {
    this.count = 0;

    element.innerHTML = this.count;

    element.addEventListener('click', () => {
        // when is executed, the `this` actually refers to the global object
        // by using arrow function, it get the context where it lives
        this.count += 1;
        element.innerHTML = this.count;
    });
}

new Counter(main);