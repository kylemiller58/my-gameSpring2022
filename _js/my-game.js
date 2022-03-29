
// global variables
let canvas = null;
let ctx = null;

let WIDTH = 1024;
let HEIGHT = 768;
let TILESIZE = 32;
let BGCOLOR = "blue";

// initializes function
// creates a div; sets attributes; appends body; creates canvas; puts canvas inside div

let allSprites = [];

let keysDown = {};
let keysUp = {};

addEventListener("keydown", function (event) {
    // keysDown = {};
    keysDown[event.key] = true;
    console.log(event);
}, false);

addEventListener("keyup", function (event) {
    keysUp[event.key] = true;
    delete keysDown[event.key];
    console.log(event);
}, false);

let gamePlan = `
......................
......................
......................
......................
...........#####......
......................
......................
####..################
####..################`;

// this is like a MOLD
class Square {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.speed = 3;
        allSprites.push(this);
    }
    // this is like a MOLD

    create(x,y,w,h) {
        return new Square(x, y, w, h)
    }
    // update method
    update() {
        this.x += this.speed*Math.random()*5;
        this.y += this.speed*Math.random()*5;
        if (this.x > WIDTH || this.x < 0 || this.y < 0 || this.y > HEIGHT){
               this.speed*=-1; 
            }
                    // this.y += 5 * Math.random();
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
        this.speed = 2;
    }
    update() {
        this.x += this.speed*Math.random()*5;
        this.y += this.speed*Math.random()*5;
        if (this.x > WIDTH || this.x < 0 || this.y < 0 || this.y > HEIGHT){
               this.speed*=-1; 
            }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
        ctx.stroke();;
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}



function makeGrid(plan, width) {
    let newGrid = [];
    let newRow = [];

    for (i of plan){
        if (i != "\n"){
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            newGrid.push(newRow);
            newRow = [];
        }
    }

    return newGrid;
}

function readLevel(grid) {
 let startActors = [];
    for (y in grid) {
        for (x in grid[y]) {

            let ch = grid[y][x];

            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                } else {
                    let t = new type;
                    startActors.push(t.create(x*TILESIZE, y*TILESIZE, TILESIZE, TILESIZE))
                }
                console.log(startActors);
            }
        }

    }

}

const levelChars = {
    ".": "empty",
    "#": Square,
};

// console.log(makeGrid(gamePlan, 22));
// console.log(readLevel(makeGrid(gamePlan, 22)));

// initialization function
// creates a div; sets attributes; appends body; creates canvas; puts canvas inside div
function init() {
    let gameDiv = document.createElement("div");
    gameDiv.setAttribute("style", "border: 1px solid;"
    + "width:" + WIDTH + "px; "
    + "height:" + HEIGHT + "px; "
    + "background-color: " + BGCOLOR);
    document.body.appendChild(gameDiv);

    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    
    try {
        gameDiv.appendChild(canvas);
        console.log("game initialized");
        // helps debugging
    } catch (e){
        alert(e.message);
    }
    gameLoop();
}




let spongeBob = new Square(10, 10, 30, 30, 'rgb(255, 255, 0)');
let patrick = new Square(10, 30, 65, 65, 'rgb(255, 150, 150)');
let squidward = new Square(70, 90, 20, 20, 'rgb(0, 200, 200)');
let sandy = new Circle(70, 200, 25, 40, 'rgb(150, 75, 0)');


function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites){
        i.draw();
    }
}

function update() {
    spongeBob.update();
    patrick.update();
    squidward.update();
    sandy.update();
}


function gameLoop(){
    // console.log('the game loop is alive!!!');
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}
    // input, update, draw is order for game loop
