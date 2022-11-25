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

function onKeyDown(e){
    console.log(e.keyCode);

}

function onKeyUp(e){
    if(e.keyCode == 32){
        console.log("You pressed the spacebar");
        gameOver = false;
        draw(fire, water, snow, fire, water, snow);
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

        ctx.fillText(results, canvas.width/2, 525);
        ctx.restore();
    }
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
                }
                else{
                        //snow
                        //alert("CPU chose snow. You win!");
                        results = "CPU chose snow. You win!";
                        draw(hfire, water, snow, fire, water, hsnow);
                }

                break;

            case "water":
                if(cpuChoice == 0){
                        //fire
                        //alert("CPU chose fire. You win");
                        results = "CPU chose fire. You win!";
                        draw(fire, hwater, snow, hfire, water, snow);
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
                }
                    
                break;

            case "snow":
                if(cpuChoice == 0){
                        //fire
                        //alert("CPU chose fire. You lose!");
                        results = "CPU chose fire. You lose!";
                        draw(fire, water, hsnow, hfire, water, snow);
                }
                else if(cpuChoice == 1){
                        //water
                        //alert("CPU chose water. You win!");
                        results = "CPU chose water. You win!";
                        draw(fire, water, hsnow, fire, hwater, snow);
                }
                else{
                        //snow
                        //alert("CPU chose snow. It's a tie!");
                        results = "CPU chose snow. It's a tie!";
                        draw(fire, water, hsnow, fire, water, hsnow);
                }
                    
                break;
        }
    }
}
