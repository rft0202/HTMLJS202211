//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player1;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Player
	player1 = new GameObject();
	player1.x = 0;
	player1.y = canvas.height/2;
	player1.width = 20;
	player1.height = 125; 

	//Instantiate the Ball
	var ball = new GameObject();
	ball.color = 'blue';
	ball.width = 35;
	ball.vx = -5;
	ball.vy = 0;

	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	ball.move();

	//Move the Player to the right
	if(w)
	{
		console.log("Moving Up");
		player1.y += -2;
	}
	if(s)
	{
		console.log("Moving Down");
		player1.y += 2;
	}
	
	//Player Wall Collision
	if(player1.y < player1.height/2)
	{
		player1.y = player1.height/2;
	}
	if(player1.y > canvas.height - player1.height/2)
	{
		player1.y = canvas.height - player1.height/2;
	}

	//Ball Paddle Collision
	if(player1.hitTestObject(ball))
	{
		ball.x = player1.x + player1.width/2 + ball.width/2;
		if(ball.vx > 0 && ball.vx < 20){
			ball.vx = -ball.vx //- 1; //from right to left
		}
		else if (ball.vx < 0 && ball.vx > -20){
			ball.vx = -ball.vx //+ 1;
		}
		else{
			ball.vx = -ball.vx;
		}

     	//ball hits top
    	if(ball.y < player1.y - player1.height/6)
     	{
			
			if(ball.vy > 0 && ball.vy < 20){
				ball.vy = -5 //- 1; //from up to down
			}
			else if (ball.vx < 0 && ball.vx > -20){
				ball.vy = 5 //+ 1; //from down to up
			}
			else{
				ball.vy = -5;
			}
    	}
		/*
		//ball hits middle
		if(ball.y > player1.y - player1.height )
		{
			if(ball.vy > 0 && ball.vy < 20){
				ball.vy = -ball.vy //- 1;
			}
			else if (ball.vx < 0 && ball.vx > -20){
				ball.vy = -ball.vy //+ 1;
			}
			else{
				ball.vy = -ball.vy;
			}
		}
		*/
		//ball hits bottom
		if(ball.y > player1.y + player1.height/6)
     	{
			if(ball.vy > 0 && ball.vy < 20){
				ball.vy = 5 //- 1;
			}
			else if (ball.vx < 0 && ball.vx > -20){
				ball.vy = 5 //+ 1;
			}
			else{
				ball.vy = 5;
			}
    	}
		
		/*if(ball.vx > 0 && ball.vx < 20){
			ball.vx = -ball.vx - 1;
		}
		else if (ball.vx < 0 && ball.vx > -20){
			ball.vx = -ball.vx + 1;
		}
		else{
			ball.vx = -ball.vx;
		}
		if(ball.vy > 0 && ball.vy < 20){
			ball.vy = -ball.vy - 1;
		}
		else if (ball.vx < 0 && ball.vx > -20){
			ball.vy = -ball.vy + 1;
		}
		else{
			ball.vy = -ball.vy;
		}
		*/
	}

	//Ball Wall Collision
	if(ball.x < ball.width/2 || ball.x > canvas.width - ball.width/2)
	{
		ball.x = canvas.width/2;
		ball.y = canvas.height/2;
		ball.vx = -5;
		ball.vy = 0;
	}
	if(ball.y < ball.height/2 || ball.y > canvas.height - ball.height/2)
	{
		ball.x = canvas.width/2;
		ball.y = canvas.height/2;
		ball.vx = -5;
		ball.vy = 0;
	}

	//Update the Screen
	player1.drawRect();
	ball.drawCircle();
}
