// global variables

let canvas = null;
let ctx = null;

let WIDTH = 800
let HEIGHT = 600

function init() {
    let gameDiv = document.createElement("div");
    gameDiv.setAttribute("style", "border: 1px solid;"
        + "width:" + WIDTH + "px; "
        + "height:" + HEIGHT + "px; "
        + "background-color: chartreuse");
    document.body.appendChild(gameDiv);

    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    try {
        gameDiv.appendChild(canvas);
        console.log("game initialized");
    } catch (e) {
        alert(e.message);
    }


    gameLoop();
}


class Square {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.speed = 3;

    }


    update() {
        this.x += this.speed*Math.random()*3;
        this.y += this.speed*Math.random()*3;
        if (this.x > WIDTH || this.x < 0 || this.y > HEIGHT) {
            this.speed*=-1;
        }

    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}
class Circle {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.speed = 3;
    }
    update = function () {
        this.x += this.speed;
        this.x += this.speed*Math.random()*3;
        this.y += this.speed*Math.random()*3;
        if (this.x > WIDTH || this.x < 0 || this.y > HEIGHT) {
            this.speed*=-1;
        }
        // this.y += 5 * Math.random();
    }
    draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

let spongeBob = new Square(50, 10, 60, 30, 'rgb(255, 255, 0)');
let patrick = new Square(20, 50, 100, 75, 'rgb(255, 150, 150)');
let squidward = new Square(50, 100, 40, 60, 'rgb(0, 200, 200)');
let sandy = new Circle(70, 20, 20, 40, 'rgb(150, 75, 0');

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    spongeBob.draw();
    patrick.draw();
    squidward.draw();
    sandy.draw();
}

function update() {
    spongeBob.update();
    patrick.update();
    squidward.update();
    sandy.update();
}


function gameLoop() {
    console.log('the game loop is alive!!!');
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}
