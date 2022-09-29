// this was recommended by copilot btw 


window.addEventListener('click', event => event.preventDefault());
window.addEventListener('keyup', event => event.preventDefault());
window.addEventListener('keypress', event => event.preventDefault());
window.addEventListener('mousedown', event => event.preventDefault());
window.addEventListener('mouseup', event => event.preventDefault());
window.addEventListener('mousemove', event => event.preventDefault());
window.addEventListener('contextmenu', event => event.preventDefault());
window.addEventListener('scroll', event => event.preventDefault());

let chars = '';
let h1 = document.querySelectorAll('h1');

let rainbowMode = false;

window.addEventListener('keydown', event => {
    event.preventDefault()

    chars += event.key;

    if (!'secret'.includes(chars)) {
        chars = '';
    }

    if (chars === 'secret') {
        chars = '';
        rainbowMode = !rainbowMode;
        alert('gamer mode activated');
    }



});