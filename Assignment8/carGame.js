var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var timer = requestAnimationFrame(main);

var start = 58;
var finish = 956;
var carPos = 2;
var speed = 3;
var carWidth = 70;
var monsterPos = -70;
var monsterWidth = 60

//var startFuel = canvas.width +600
//for testing purposes^
var startFuel = randomNumber(600, canvas.width, 600);
var fuel = startFuel;
var fuelBarWidth = 512;
var fuelBarSprite = new Image();
fuelBarSprite.src = "images/fuelbar.png";
var gameOver = true;

var seconds = 3;
var fps = 60;
var frames = fps;

//load game sprites
var manSprite = new Image();
manSprite.src = "images/lodger.png.png";



var monsterSprite = new Image();
monsterSprite.src = "images/breachghostcropped.png";

var forestBackground = new Image();
forestBackground.src = "images/pixelforest.png"

forestBackground.onload = function(){
    main();
}
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
    drawBackground();
    if(gameOver){
        ctx.fillStyle = "white";
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

function drawBackground(){
    ctx.drawImage(forestBackground, 0, 0);
    ctx.save();
    //ground
    ctx.fillStyle = "black";
    ctx.fillRect(0, canvas.height/2 + 30, canvas.width, canvas.height);
    //house
    ctx.fillStyle = "rgb(49, 49, 49)";
    ctx.fillRect(start, 85, 900, 330);
    //roof
    ctx.fillStyle = "rgb(49, 49, 49)";    
    ctx.beginPath();
    ctx.moveTo(start, 85);
    ctx.lineTo(91, 42);
    ctx.lineTo(919, 42);
    ctx.lineTo(finish, 85);
    ctx.lineTo(start, 85);
    ctx.closePath();
    ctx.fill()
    ctx.restore();
}

function drawStartFinish(){
    ctx.fillStyle = "white";
    //start line
    ctx.fillRect(start + 1, canvas.height/2 - 70, 10, 100);
    //finish line
    ctx.fillRect(finish - 10, canvas.height/2 - 70, 10, 100);
}

function drawCar(){
    //draw a car
    //ctx.fillStyle = "red";
    //ctx.fillRect(carPos, canvas.height/2, carWidth, 20);
    ctx.drawImage(manSprite, carPos, canvas.height/2 - 55, carWidth, 90)
}

function drawMonster(){
    ctx.drawImage(monsterSprite, monsterPos, canvas.height/2 - 55, monsterWidth, 90)
}

function drawFuelBar(){
    var currentBarWidth = fuelBarWidth * (fuel/startFuel);
    //ctx.fillStyle = "white";
    //ctx.fillRect(start, 30, fuelBarWidth, 10);
    ctx.drawImage(fuelBarSprite, start, 30, fuelBarWidth, 10);
    ctx.font = "25px Garamond";
    ctx.fillText("Stamina", start, 25);
    if(fuel > 0){
        ctx.fillStyle = "white";
        ctx.fillRect(start, 30, currentBarWidth, 10);
    }
}

function drawResults(){
    if(carPos + carWidth > finish){
        ctx.fillStyle = "white";
        ctx.font = "25px Garamond";
        ctx.textAlign = "center";
        ctx.fillText("You escaped...You Win!", canvas.width/2, canvas.height/2);
    }else{
        ctx.fillStyle = "white";
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
    ctx.fillStyle = "white";
    ctx.font = "25px Garamond";
    ctx.textAlign = "center";
    ctx.fillText(seconds, canvas.width/2, canvas.height/2);
}

function randomNumber(high,low){
    return Math.round(Math.random() * (high-low)+low);
}