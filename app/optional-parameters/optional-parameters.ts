var container = document.querySelector('main');

function countdown(initial, final = 0, interval = 1) {
    var current = initial;

    while (current > final) {
        container.innerHTML = current;
        current -= interval;
    }

}

countdown(10, 0, 1);