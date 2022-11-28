//canvas drawing stuff
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

var fire = new Image();
var water = new Image();
var snow = new Image();
var hfire = new Image();
var hwater = new Image();
var hsnow = new Image();

fire.src = "images/fire.png";
water.src = "images/water.png";
snow.src = "images/snow.png";

hfire.src = "images/fire2.png";
hwater.src = "images/water2.png";
hsnow.src = "images/snow2.png";

hsnow.onload = function(){
    draw(fire, water, snow, fire, water, snow);
}

document.addEventListener("keydown",onKeyDown);
document.addEventListener("keyup",onKeyUp);

var gameOver = true;
var results = "Select fire, water, or snow above.";

var pFireWins = 0;
var pWaterWins = 0;
var pSnowWins = 0;

var cFireWins = 0;
var cWaterWins = 0;
var cSnowWins = 0;

function onKeyDown(e){
    console.log(e.keyCode);
    
}

function onKeyUp(e){
    if(e.keyCode == 32){
        console.log("You pressed the spacebar");
        gameOver = false;
        draw(fire, water, snow, fire, water, snow);
    }else{
        if(e.keyCode == 82) {
            console.log("You pressed r");
            ctx.clearRect(0,0,canvas.width,canvas.height);
            //add style
            ctx.fillText("Rules", canvas.width/2, 50);
            ctx.fillText("Fire beats Snow.", canvas.width/2, 100);
            ctx.fillText("Water beats Fire.", canvas.width/2, 140);
            ctx.fillText("Snow beats Water.", canvas.width/2, 180);
            ctx.fillText("You win the game when you", canvas.width/2, 260);
            ctx.fillText("win three rounds with the same element", canvas.width/2, 300);
            ctx.fillText("or three rounds with each element.", canvas.width/2, 340);
        }
    }
    
}


function draw(fire, water, snow, cfire, cwater, csnow){
    if(gameOver == true){
        //drawing the fonts
        ctx.font = "40px Arial";
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "green";
        ctx.textAlign = "center";
        ctx.fillText("Welcome to Card-Jitsu!", canvas.width/2, 280);
        ctx.fillText("Press Space to Start", canvas.width/2, 320);
        ctx.fillText("Press 'r' for the Rules", canvas.width/2, 360);
        ctx.strokeText("Welcome to Card-Jitsu!", canvas.width/2, 280);
    }
    else{

        ctx.save();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "pink";
        ctx.fillText("Player Choice", canvas.width/2, 100);
        ctx.drawImage(fire, canvas.width/2 - fire.width/2 - 100, 150);
        ctx.drawImage(water, canvas.width/2 - water.width/2, 150);
        ctx.drawImage(snow, canvas.width/2 - snow.width/2 + 100, 150);
        //computer choices
        ctx.fillText("Computer Choice", canvas.width/2, 325);
        ctx.drawImage(cfire, canvas.width/2 - cfire.width/2 - 100, 375);
        ctx.drawImage(cwater, canvas.width/2 - cwater.width/2, 375);
        ctx.drawImage(csnow, canvas.width/2 - csnow.width/2 + 100, 375);

        drawWinCounters();

        ctx.fillText(results, canvas.width/2, 525);
        ctx.restore();
    }
}

function drawWinCounters(){
    ctx.fillText("Player Wins", 100, 50);
        //fire
        ctx.fillStyle = "red"
        ctx.fillText(pFireWins, 100, 100);
        //water
        ctx.fillStyle = "blue"
        ctx.fillText(pWaterWins, 100, 150);
        //snow
        ctx.fillStyle = "lightblue"
        ctx.fillText(pSnowWins, 100, 200);
        ctx.fillStyle = "pink";
    ctx.fillText("CPU Wins", canvas.width - 100, 50);
        //fire
        ctx.fillStyle = "red"
        ctx.fillText(cFireWins, canvas.width - 100, 100);
        //water
        ctx.fillStyle = "blue"
        ctx.fillText(cWaterWins, canvas.width - 100, 150);
        //snow
        ctx.fillStyle = "lightblue"
        ctx.fillText(cSnowWins, canvas.width - 100, 200);
}

//alert("Select fire, water, or snow.");
var rps = ["fire","water","snow"];
//console.log(rps[2]);

document.getElementById("fire").addEventListener('click',function(e){
    //alert("You picked " + rps[0] + "!");
    playGame(rps[0]);
});
document.getElementById("water").addEventListener('click',function(e){
    //alert("You picked " + rps[1] + "!");
    playGame(rps[1]);
});
document.getElementById("snow").addEventListener('click',function(e){
    //alert("You picked " + rps[2] + "!");
    playGame(rps[2]);
});

function playGame(playerChoice){
    if(gameOver == true){
        return;
    } else {
        var cpuChoice = Math.floor(Math.random() * 2.99);
        console.log(cpuChoice, playerChoice);

        switch(playerChoice){
            case "fire":
                if(cpuChoice == 0){
                        //fire
                        //alert("CPU chose fire. It's a tie!");
                        results = "CPU chose fire. It's a tie!";
                        draw(hfire, water, snow, hfire, water, snow);
                }
                else if(cpuChoice == 1){
                        //water
                        //alert("CPU chose water. You lose!");
                        results = "CPU chose water. You lose!";
                        draw(hfire, water, snow, fire, hwater, snow);
                        cWaterWins += 1;
                }
                else{
                        //snow
                        //alert("CPU chose snow. You win!");
                        results = "CPU chose snow. You win!";
                        draw(hfire, water, snow, fire, water, hsnow);
                        pFireWins += 1;
                }

                break;

            case "water":
                if(cpuChoice == 0){
                        //fire
                        //alert("CPU chose fire. You win");
                        results = "CPU chose fire. You win!";
                        draw(fire, hwater, snow, hfire, water, snow);
                        pWaterWins += 1;
                }
                else if(cpuChoice == 1){
                        //water
                        //alert("CPU chose water. It's a tie!");
                        results = "CPU chose water. It's a tie!";
                        draw(fire, hwater, snow, fire, hwater, snow);
                }
                else{
                        //snow
                        //alert("CPU chose snow. You lose!");
                        results = "CPU chose snow. You lose!";
                        draw(fire, hwater, snow, fire, water, hsnow);
                        cSnowWins += 1;
                }
                    
                break;

            case "snow":
                if(cpuChoice == 0){
                        //fire
                        //alert("CPU chose fire. You lose!");
                        results = "CPU chose fire. You lose!";
                        draw(fire, water, hsnow, hfire, water, snow);
                        cFireWins += 1;
                }
                else if(cpuChoice == 1){
                        //water
                        //alert("CPU chose water. You win!");
                        results = "CPU chose water. You win!";
                        draw(fire, water, hsnow, fire, hwater, snow);
                        pWaterWins += 1;
                }
                else{
                        //snow
                        //alert("CPU chose snow. It's a tie!");
                        results = "CPU chose snow. It's a tie!";
                        draw(fire, water, hsnow, fire, water, hsnow);
                }
                    
                break;
        }
        if(pFireWins == 3 || pWaterWins == 3 || pSnowWins == 3 || pFireWins > 0 && pWaterWins > 0 && pSnowWins > 0){
            results = "You win the game!";
        }
        if(cFireWins == 3 || cWaterWins == 3 || cSnowWins == 3 || cFireWins > 0 && cWaterWins > 0 && cSnowWins > 0){
            results = "You lose the game!";
        }
    }
}
