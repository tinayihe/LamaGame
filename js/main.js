var mode = 0;
var x = 0;
var y = 0;

// lama settings
var speed = 8;
var moveDirection = 0;
var imageDirection = 0;
var imageObj = new Image();

// canvas settings
var h = document.body.clientHeight;
var w = document.body.clientWidth;
var canvas = document.getElementById("plane");

var score = 0;

// remain the right part of the page for score
canvas.width = 0.8 * w;
canvas.height = h;

function animate(){
    reqAnimFrame = window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame
        ;

    reqAnimFrame(animate);

    var limitWidth = canvas.width - imageObj.width;
    var limitHeight = canvas.height - imageObj.height;
    switch (moveDirection) {
        case 1:
            // move up
            y = (y - speed + limitHeight) % limitHeight;
            break;
        case 2:
            // move right
            x = (x + speed) % limitWidth;
            break;
        case 3:
            // move down
            y = (y + speed) % limitHeight;
            break;
        case 4:
            // move left
            x = (x - speed + limitWidth) % limitWidth;
            break;
    }
    draw();
}

function draw(){
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imageObj, x, y);
}

function initial(){
    mode = Math.floor((Math.random() * 2) + 1);
    moveDirection = Math.floor((Math.random() * 4) + 1); //1:up 2:right 3:down 4:left
    imageDirection = Math.floor((Math.random() * 4) + 1);//1:up 2:right 3:down 4:left
    // change dynamic canvas bg
    if (mode === 1) {
        // green
        document.getElementById("plane").style.background = "#00FF7F";
    } else {
        // red
        document.getElementById("plane").style.background = "#FF2400";
    }

    // change randomly lama image
    switch (imageDirection) {
        case 1:
            imageObj.src = "image/lama.png";
            break;
        case 2:
            imageObj.src = "image/lama2.png";
            break;
        case 3:
            imageObj.src = "image/lama3.png";
            break;
        case 4:
            imageObj.src = "image/lama4.png";
            break;
    }
    document.getElementById("scores").innerHTML=score;
}

initial();
animate();

function over(){
  alert("Game over\nYour score:"+score);
  window.location.reload();
}

function point(event){
    if (mode === 1) {
        switch (event.keyCode) {
        case 37:
            if (moveDirection === 4) {
                score++;
            } else {
                over();
            }
            break;
        case 38:
            if (moveDirection === 1) {
                score++;
            } else {
                over();
            }
            break;
        case 39:
            if (moveDirection === 2) {
                score++;
            } else {
                over();
            }
            break;
        case 40:
            if (moveDirection === 3) {
                score++;
            } else {
                over();
            }
            break;
        }
    } else {
        switch (event.keyCode) {
        case 37:
            if (imageDirection === 4) {
                score++;
            } else {
                over();
            }
            break;
        case 38:
            if (imageDirection === 1) {
                score++;
            } else {
                over();
            }
            break;
        case 39:
            if (imageDirection === 2) {
                score++;
            } else {
                over();
            }
            break;
        case 40:
            if (imageDirection === 3) {
                score++;
            } else {
                over();
            }
            break;
        }
    }
    initial();
}

document.addEventListener("keydown", point);
setTimeout("over()",15000);
