var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var timer = requestAnimationFrame(main);

var start = 58;
var finish = 956;
var carPos = 2;
var speed = 3;
var carWidth = 50;
var monsterPos = -50;
var monsterWidth = 50

//var startFuel = canvas.width +600
//for testing purposes^
var startFuel = randomNumber(600, canvas.width, 600);
var fuel = startFuel;
var fuelBarWidth = 512;
var gameOver = true;

var seconds = 3;
var fps = 60;
var frames = fps;

//load game sprites
var bikeSprite = new Image();
bikeSprite.src = "images/bike.png";

bikeSprite.onload = function(){
    main();
}

var monsterSprite = new Image();
monsterSprite.src = "images/placeholder.png";

//add some event listeners
document.addEventListener("keydown", keyPressDown);

function keyPressDown(e){
    if(e.keyCode == 32 && gameOver){
        gameOver = false;
    }
    if(fuel <= 0){
        //restart game
        restartGame();
    }
}

function main(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(gameOver){
        ctx.fillStyle = "black";
        ctx.font = "30px Garamond";
        ctx.textAlign = "center";
        ctx.fillText("Press Space to Start", canvas.width/2, canvas.height/2);
    }else{

        if(!gameOver && seconds > 0){
            runStartTimer();
            drawStartTimer();
        }else{
            if(fuel > 0){
                carPos += speed;
                fuel -= speed;
                monsterPos += speed;
            }
        }
        if(carPos > canvas.width - carWidth){
            carPos = canvas.width - carWidth;
            speed = 0;
        }
        if(monsterPos > finish - monsterWidth){
            monsterPos = finish - monsterWidth;
        }
        drawStartFinish();
        drawCar();
        drawMonster();


        drawFuelBar();
        if(carPos + carWidth > finish || fuel <= 0){
            drawResults();
        }
    }
    


    timer = requestAnimationFrame(main);
}

function drawStartFinish(){
    ctx.fillStyle = "black";
    //start line
    ctx.fillRect(start, 50, 10, canvas.height/2);
    //finish line
    ctx.fillRect(finish, 50, 10, canvas.height/2);
}

function drawCar(){
    //draw a car
    //ctx.fillStyle = "red";
    //ctx.fillRect(carPos, canvas.height/2, carWidth, 20);
    ctx.drawImage(bikeSprite, carPos, canvas.height/2, carWidth, 30)
}

function drawMonster(){
    ctx.drawImage(monsterSprite, monsterPos, canvas.height/2, monsterWidth, 30)
}

function drawFuelBar(){
    var currentBarWidth = fuelBarWidth * (fuel/startFuel);
    ctx.fillStyle = "black";
    ctx.fillRect(start, 30, fuelBarWidth, 10);
    ctx.font = "25px Garamond";
    ctx.fillText("Stamina", start, 25);
    if(fuel > 0){
        ctx.fillStyle = "green";
        ctx.fillRect(start, 30, currentBarWidth, 10);
    }
}

function drawResults(){
    if(carPos + carWidth > finish){
        ctx.fillStyle = "black";
        ctx.font = "25px Garamond";
        ctx.textAlign = "center";
        ctx.fillText("You escaped...You Win!", canvas.width/2, canvas.height/2);
    }else{
        ctx.fillStyle = "black";
        ctx.font = "25px Garamond";
        ctx.textAlign = "center";
        ctx.fillText("You ran out of stamina...You Lose!", canvas.width/2, canvas.height/2);
    }
}

function restartGame(){
    location.reload();
}

function runStartTimer(){
    frames -= 1;
    if(frames < 0){
        frames = fps;
        seconds -= 1;
    }
}

function drawStartTimer(){
    ctx.fillStyle = "black";
    ctx.font = "25px Garamond";
    ctx.textAlign = "center";
    ctx.fillText(seconds, canvas.width/2, canvas.height/2);
}

function randomNumber(high,low){
    return Math.round(Math.random() * (high-low)+low);
}