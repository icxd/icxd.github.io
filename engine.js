var c = document.getElementById("c");
var ctx = c.getContext("2d");

var g = 9.81 / 10;

var drops = [];

class PhysicsObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 10 - 5;
        this.vy = 0;
    }

    update() {
        let slowDown = 0.5;

        this.vy += g;
        this.x += this.vx;
        this.y += this.vy;

        if (this.y > c.height) {
            this.y = c.height;
            this.vy = -this.vy * slowDown;
        } else if (this.y < 0) {
            this.y = 0;
            this.vy = -this.vy * slowDown;
        }
        if (this.x > c.width) {
            this.x = c.width;
            this.vx = -this.vx * slowDown;
        } else if (this.x < 0) {
            this.x = 0;
            this.vx = -this.vx * slowDown;
        }

        // check if the object has collided with another object
        for (let i = 0; i < drops.length; i++) {
            // if the object is the same as the one we're checking, skip it
            if (drops[i] === this) continue;

            // if the object is within 10 pixels of the other object, collide
            if (Math.abs(this.x - drops[i].x) < 10 && Math.abs(this.y - drops[i].y) < 10) {
                // calculate the angle between the two objects
                let angle = Math.atan2(this.y - drops[i].y, this.x - drops[i].x);

                // calculate the sine and cosine of the angle
                let sin = Math.sin(angle);
                let cos = Math.cos(angle);

                // rotate the first object's velocity
                let vx1 = this.vx * cos - this.vy * sin;
                let vy1 = this.vx * sin + this.vy * cos;

                // rotate the second object's velocity
                let vx2 = drops[i].vx * cos - drops[i].vy * sin;
                let vy2 = drops[i].vx * sin + drops[i].vy * cos;

                // swap the velocities
                this.vx = vx2;
                this.vy = vy2;
                drops[i].vx = vx1;
                drops[i].vy = vy1;

                // move the objects apart
                this.x += this.vx;
                this.y += this.vy;
                drops[i].x += drops[i].vx;
                drops[i].y += drops[i].vy;
            }
        }
    }
}

window.addEventListener('click', event => {
    drops.push(new PhysicsObject(event.clientX, event.clientY));
});

let dragging = false;
c.addEventListener('mousedown', event => {
    dragging = true;
});

c.addEventListener('mousemove', event => {
    if (dragging) {
        drops.push(new PhysicsObject(event.clientX, event.clientY));
    }
});

c.addEventListener('mouseup', event => {
    dragging = false;
});

c.height = window.innerHeight;
c.width = window.innerWidth;

var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
matrix = matrix.split("");

var font_size = 15;
var columns = c.width / font_size;

//for (var x = 0; x < columns; x++)
//    drops[x] = new PhysicsObject(x * font_size, Math.random() * c.height);

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#29ff00";
    ctx.font = font_size + "px 'JetBrains Mono'";

    for (var i = 0; i < drops.length; i++) {
        if (rainbowMode)
            ctx.fillStyle = `hsl(${drops[i].y}, 100%, 50%)`;
        
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, drops[i].x, drops[i].y);

        if (drops[i].y > c.height && Math.random() > 0.975)
            drops[i].y = 0;

        drops[i].update();

        if (drops[i].vy < 0.1 && drops[i].vx < 0.1 && Math.random() > 0.99 && drops[i].y > c.height - 100) {
            drops.splice(i, 1);
            i--;
        }
    }
}

setInterval(draw, 35);