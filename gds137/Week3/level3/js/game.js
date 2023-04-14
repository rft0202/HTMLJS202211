//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player1;
var player2;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate Player 1
	player1 = new GameObject();
	player1.x = 0;
	player1.y = canvas.height/2;
	player1.width = 20;
	player1.height = 125; 

	//Instantiate Player 2
	player2 = new GameObject();
	player2.x = canvas.width;
	player2.y = canvas.height/2;
	player2.width = 20;
	player2.height = 125; 
	player2.color = 'green';

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

	//Move Player 1 (left)
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

	//Move Player 2 (right)
	if(up)
	{
		console.log("Moving Up");
		player2.y += -2;
	}
	if(down)
	{
		console.log("Moving Down");
		player2.y += 2;
	}
	
	//Player 1 Wall Collision
	if(player1.y < player1.height/2)
	{
		player1.y = player1.height/2;
	}
	if(player1.y > canvas.height - player1.height/2)
	{
		player1.y = canvas.height - player1.height/2;
	}

	//Player 2 Wall Collision
	if(player2.y < player2.height/2)
	{
		player2.y = player2.height/2;
	}
	if(player2.y > canvas.height - player2.height/2)
	{
		player2.y = canvas.height - player2.height/2;
	}

	//Ball Paddle 1 Collision
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
				ball.vy = -5 //+ 1; //from down to up
			}
			else{
				ball.vy = -5;
			}
    	}
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

	//Ball Paddle 2 Collision
	if(player2.hitTestObject(ball))
	{
		ball.x = player2.x - player2.width/2 - ball.width/2;
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
		if(ball.y < player2.y - player2.height/6)
		{
			
			if(ball.vy > 0 && ball.vy < 20){
				ball.vy = -5 //- 1; //from up to down
			}
			else if (ball.vx < 0 && ball.vx > -20){
				ball.vy = -5 //+ 1; //from down to up
			}
			else{
				ball.vy = -5;
			}
		}
		//ball hits bottom
		if(ball.y > player2.y + player2.height/6)
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
	if(ball.y < ball.height/4)
	{
		ball.y = ball.height/4;
		if(ball.vy > 0 && ball.vy < 55){
			ball.vy = -ball.vy - 1;
		}
		else if (ball.vx < 0 && ball.vx > -55){
			ball.vy = -ball.vy + 1;
		}
		else{
			ball.vy = -ball.vy;
		}
	}
	if(ball.y > canvas.height - ball.height/4)
	{
		ball.y = canvas.height - ball.height/4;
		if(ball.vy > 0 && ball.vy < 55){
			ball.vy = -ball.vy - 1;
		}
		else if (ball.vx < 0 && ball.vx > -55){
			ball.vy = -ball.vy + 1;
		}
		else{
			ball.vy = -ball.vy;
		}
	}

	//Update the Screen
	player1.drawRect();
	player2.drawRect();
	ball.drawCircle();
}
