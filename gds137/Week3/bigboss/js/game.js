//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;

var score = 0;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate Player 1
	player = new GameObject();
	player.x = canvas.width/2;
	player.y = canvas.height + 50;
	player.width = 250;
	player.height = 40; 
	player.color = 'cyan';

	//Instantiate the Ball
	var ball = new GameObject();
	ball.x = canvas.width/2;
	ball.y = canvas.height/2;
	ball.color = 'magenta';
	ball.radius = 40;
	ball.vx = 5;
	ball.vy = 0;
	ball.force = 1;

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
		player.y += -3;
	}
	if(s)
	{
		console.log("Moving Down");
		player.y += 3;
	}

	//Player 1 Wall Collision
	if(player.y < player.height/2)
	{
		player.y = player.height/2;
	}
	if(player.y > canvas.height - player.height/2)
	{
		player.y = canvas.height - player.height/2;
	}

	//Ball Paddle 1 Collision
	if(player.hitTestObject(ball))
	{
		//ball hits center
		ball.vy = -35;
		//ball hits inner left 1/6
    	if(ball.x < player.x - player.width/6)
     	{
			ball.vx = -ball.force;
			ball.vy = -35;
			score++;
    	}
		//ball outer left 1/6
		if(ball.x > player.x + player.width/6)
     	{
			ball.vx = -ball.force * 5;
			ball.vy = -35;
			score++;
    	}
		//ball hits inner right 1/6
    	if(ball.x < player.x - player.width/6)
     	{
			ball.vx = ball.force;
			ball.vy = -35;
			score++;
    	}
		//ball outer right 1/6
		if(ball.x > player.x + player.width/6)
     	{
			ball.vx = ball.force * 5;
			ball.vy = -35;
			score++;
    	}
	}

	//Ball Wall Collision
	if(ball.x < ball.width/2)
	{
		ball.vx = -ball.vx;
	}
	if(ball.x > canvas.width - ball.width/2)
	{
		ball.vx = -ball.vx;
	}
	//top of screen
	if(ball.y < ball.height/4)
	{
		ball.vy = -ball.vy;
	}
	//bottom of screen
	if(ball.y > canvas.height - ball.height/4)
	{
		ball.x = canvas.width/2;
		ball.y = canvas.height/2;
		ball.vx = 5;
		ball.vy = 0;
		score = 0;
	}

	//Net
	context.save();
	context.strokeStyle = 'black';
	context.beginPath();
	context.moveTo(ball.x, ball.y);
	context.lineTo(player.x, player.y);
	context.closePath();
	context.lineWidth = 1;
	context.stroke();
	context.restore();
	
	//Win Counter
	context.font = "16px Arial black";
	context.fillText(`Score: ${score}`, 80, 25);

	//Update the Screen
	player.drawRect();
	ball.drawCircle();
	
}
