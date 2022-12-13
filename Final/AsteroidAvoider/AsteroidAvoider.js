var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var timer = requestAnimationFrame(main);
var gameOver = true;
var score = 0;
var highScore = 0;
var currentState = 0;
var gameState = [];

//asteroid variables
var numAsteroids = 20;
var asteroids = [];

//Player Ship variables
var ship = new PlayerShip();

//Star Power Up
var isPowerUpActive = false;
var invincible = false;
var invincibleHit = false;
var star = new Image();
star.src = "images/starpowerup.png"
var powerUp = new Star();



//Game Over Screen
var gameOverScreen = new Image();
gameOverScreen.src = "images/gameover.png"

gameOverScreen.onload = function(){
    main();
}

//create keyboard event handlers
document.addEventListener("keydown", pressKeyDown);
document.addEventListener("keyup", pressKeyUp);

function pressKeyDown(e){
    if(!gameOver){
        if(e.keyCode == 87 || e.keyCode == 38){
            //code for up W
            ship.up = true;
        }
        if(e.keyCode == 65 || e.keyCode == 37){
            //code for left A
            ship.left = true;
        }
        if(e.keyCode == 68 || e.keyCode == 39){
            //code for right D
            ship.right = true;
        }
        if(e.keyCode == 83 || e.keyCode == 40){
            //code for down S
            ship.down = true;
        }
    }
}
    
function pressKeyUp(e){
    if(!gameOver){
        if(e.keyCode == 87 || e.keyCode == 38){
            //code for up W
            ship.up = false;
        }
        if(e.keyCode == 65 || e.keyCode == 37){
            //code for left A
            ship.left = false;
        }
        if(e.keyCode == 68 || e.keyCode == 39){
                //code for right D
            ship.right = false;
        }
        if(e.keyCode == 83 || e.keyCode == 40){
                //code for down S
            ship.down = false;
        }
    }
    //Menu inputs use spacebar
    if(gameOver){
        if(e.keyCode == 32){
            if(currentState == 2){
                //game over inputs
                currentState = 0;
                numAsteroids = 20;
                asteroids = [];
                score = 0;
                //start game here
                main();
                gameStart();
            }else{
                //main menu inputs
                currentState = 1;
                gameOver = false;
                main();
                scoreTimer();
                //powerUpTimer();
                gameStart();
            }
            
        }
    }
}
        
//Star Class
function Star(){
    this.w = 40;
    this.h = 40;
    this.x = randomRange(canvas.width - this.w, this.w);
    this.y = randomRange(canvas.height - this.h, this.h) + canvas.height;
    this.vy = 7;

    this.drawStar = function(){
        ctx.drawImage(star, this.x, this.y, this.w, this.h);
    }
    
}

//Asteroid Class
function Asteroid(){
    //properties to draw the asteroid
    this.radius = randomRange(15, 2);
    this.x = randomRange(canvas.width - this.radius, this.radius);
    this.y = randomRange(canvas.height - this.radius, this.radius) - canvas.height;
    this.vy = randomRange(10, 5);
    this.color = "white";

    //methods (functions) to draw asteroid
    this.drawAsteroid = function(){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

function PlayerShip(){
    this.x = canvas.width/2
    this.y = canvas.height/2
    this.width = 20;
    this.height = 20;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.vx = 0;
    this.vy = 0;
    this.flameLength = 30;

    this.drawShip = function (){
        ctx.save();
        ctx.translate(this.x,this.y);

        //draw the thruster
        if(this.up || this.left || this.right){
            ctx.save();
            if(this.flameLength == 30){
                this.flameLength = 20;
                ctx.fillStyle = "yellow";
            }
            else{
                this.flameLength = 30
                ctx.fillStyle = "orange"
            }
            //draw the flame
            ctx.beginPath();
            ctx.moveTo(0, this.flameLength);
            ctx.lineTo(5, 5);
            ctx.lineTo(-5, 5);
            ctx.lineTo(0, this.flameLength);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        //draw the ship
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(10, 10);
        ctx.lineTo(-10, 10);
        ctx.lineTo(0, -10);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    this.moveShip = function(){
        this.x += this.vx;
        this.y += this.vy;

        //adding boundaries for the screen
        //bottom boundary
        if(this.y > canvas.height - this.height/2){
            this.y = canvas.height - this.height/2
            this.vy = 0;
        }

        //top boundary
        if(this.y < this.height/2){
            this.y = this.height/2
            this.vy = 0;
        }

        //right boundary
        if(this.x > canvas.width - this.width/2){
            this.x = canvas.width - this.width/2
            this.vx = 0;
        }

        //left boundary
        if(this.x < this.width/2){
            this.x = this.width/2
            this.vx = 0;
        }

    }

}



function main(){
    //clear the canvas
    ctx.clearRect(0,0,canvas.width, canvas.height);

    gameState[currentState]();
    if(!gameOver){
        //refresh the screen
        timer = requestAnimationFrame(main);
    }
    
}

//Game State Machine

//Main Menu State
gameState[0] = function(){
    //code for main menu
    ctx.save();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Asteroid Avoider", canvas.width/2, canvas.height/2 - 30);
    ctx.font = "15px Arial";
    ctx.fillText("Press Space to Start", canvas.width/2, canvas.height/2 + 20);
    ctx.restore();
}

//Play Game State
gameState[1] = function(){
    //code for the asteroid game
    //draw score to screen
    ctx.save();
    ctx.font = "15px Arial"
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, canvas.width - 150, 30);
    ctx.restore();
    
    //vertical movement
    if(ship.up){
        ship.vy = -10;
    }else{
        ship.vy = 3;
    }
    //horizontal movement
    if(ship.left){
        ship.vx = -5;
    }else if (ship.right){
        ship.vx = 5;
    }else{
        ship.vx = 0;
    }

    for(var i = 0; i<asteroids.length; i++){
        ctx.save();
        var dX = ship.x - asteroids[i].x;
        var dY = ship.y - asteroids[i].y;
        var distance = Math.sqrt((dX*dX)+(dY*dY));

        //collision detection happens here
        if(detectCollision(distance, (ship.height/2 + asteroids[i].radius)) && !invincible){
            //console.log("Hit Asteroid");
            //alert("Hit Asteroid");
            gameOver = true;
            currentState = 2;
            main();
            return;
        }
        else if(detectCollision(distance, (ship.height/2 + asteroids[i].radius)) && invincible){
            invincible = false;
            isPowerUpActive = false;
            asteroids[i].x = asteroids[i].x + canvas.width;
            asteroids[i].y = asteroids[i].y + canvas.height;
            console.log("Power Up Inactive");
        }
        ctx.restore();

        if(asteroids[i].y > canvas.height + asteroids[i].radius){
            asteroids[i].y = randomRange(canvas.height - asteroids[i].radius, asteroids[i].radius) - canvas.height;
            asteroids[i].x = randomRange(canvas.width - asteroids[i].radius, asteroids[i].radius);
        }

        asteroids[i].y += asteroids[i].vy;
        asteroids[i].drawAsteroid();
    }

        
    //star
    
    powerUp.drawStar();
    powerUp.y += powerUp.vy;

    var dX = ship.x - powerUp.x;
    var dY = ship.y - powerUp.y;
    var distance = Math.sqrt((dX*dX)+(dY*dY));
    
    //collision detection happens here
    if(detectCollision(distance, (ship.height/2 + powerUp.h))){
        invincible = true;
        isPowerUpActive = true;
        console.log("Power Up Active");
    }
    if(!isPowerUpActive){
        invincible = false
    }

    //Invincible mode
    if(invincible){
        ctx.save();
        //ctx.fillStyle = "rgba(,,,alphaValue)"
        ctx.strokeStyle = "pink"
        ctx.lineWidth = "3";

        ctx.beginPath();
        ctx.arc(ship.x, ship.y, 20, 0, (3 * Math.PI),false);
        ctx.closePath();
        //ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    //draw the ship
    ship.drawShip();
    ship.moveShip();

    //adds asteroids to game as time goes on
    while(asteroids.length < numAsteroids){
        asteroids.push(new Asteroid());
    }
}

//Game Over State
gameState[2] = function(){
    ctx.drawImage(gameOverScreen, 0, 0);
    //code for game over menu
    if(score > highScore){
        highScore = score;

        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over, Your Score was: " + score.toString(), canvas.width/2, canvas.height/2 - 60);
        ctx.fillText("Your New High Score is: " + highScore.toString(), canvas.width/2, canvas.height/2 - 30);
        ctx.fillText("New Record!", canvas.width/2, canvas.height/2);
        ctx.font = "15px Arial";
        ctx.fillText("Press Space to Play Again", canvas.width/2, canvas.height/2 + 20);
        ctx.restore();
    }else{
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over, Your Score was: " + score.toString(), canvas.width/2, canvas.height/2 - 60);
        ctx.fillText("Your High Score is: " + highScore.toString(), canvas.width/2, canvas.height/2 - 30);
        ctx.font = "15px Arial";
        ctx.fillText("Press Space to Play Again", canvas.width/2, canvas.height/2 + 20);
        ctx.restore();
    }
}

//Utility function

function gameStart(){
    //for loop to instantiate asteroids for game
    for(var i = 0; i<numAsteroids; i++){
        asteroids[i] = new Asteroid();
    }

    powerUp.y = randomRange(canvas.height - this.h, this.h) + canvas.height;

    ship = new PlayerShip();
}

function randomRange(high,low){
    return Math.random() * (high-low) + low;
}

function detectCollision(distance, calcDistance){
    return distance < calcDistance;
}

function scoreTimer(){
    if(!gameOver){
        score++;

        if(score % 5 == 0){
            numAsteroids += 5;
            console.log(numAsteroids);
        }

        if(score % 10 == 0){
            powerUpTimer();
        }
        //calls scoreTimer every second
        setTimeout(scoreTimer, 1000);
    }
}

function powerUpTimer(){
    if(!gameOver){
        powerUp.x = randomRange(canvas.width - powerUp.w, powerUp.w);
        powerUp.y = randomRange(canvas.height - powerUp.h, powerUp.h) -canvas.height;

        console.log("Star")
       
        //calls scoreTimer every second
        //setTimeout(powerUpTimer, 10000);
        
    }
}
