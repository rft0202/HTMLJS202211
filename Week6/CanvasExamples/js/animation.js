var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var timer = requestAnimationFrame(main);
var x = 100;
var y = 300;
var speedX = 3;
var speedY = 3;

var mario = new Image();
mario.src = "images/mario.png";
mario.onload = function(){
    main();
}

var bg = new Image();
bg.src = "images/bg.png"
bg.onloard = function(){
    main();
}

//circle
/*
function main(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, 300, 20, 0, 2*Math.PI, true);
    ctx.fill();
    x += 3;
    if(x > 800 + 20){
        x = -20;
    }
    timer = requestAnimationFrame(main);
}
*/
//Mario
/*
function main(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    //draw sprite image
    ctx.drawImage(mario, x, 357, 100, 150);

    x += 3;
    if(x > canvas.width + 100){
        x = -100;
    }
    timer = requestAnimationFrame(main);
}
*/
function main(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    /*
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, 300, 20, 0, 2*Math.PI, true);
    ctx.fill();
    */

    //draw sprite image
    ctx.drawImage(mario, x, y, 100, 150);

    x += speedX;
    y += speedY;
    if(x > canvas.width - 100 || x < 0){
        speedX *= -1;
    }

    if(y > canvas.height - 150 || y < 0){
        speedY *= -1;
    }
    console.log(speedX);
    timer = requestAnimationFrame(main);
}
