//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;

var frictionX = .97;		
var frictionY = .97;
var gravity = 1;

var score = 0;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate Player 1
	player = new GameObject();
	player.x = canvas.width/2;
	player.y = canvas.height - 50;
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
	ball.force = 5;

	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	

	ball.vy *= frictionY;
	ball.vx *= frictionX;

	ball.vy += gravity;

	ball.move();

	//Move Player
	if(a)
	{
		console.log("Moving Left");
		player.vx += player.ax * -player.force;
	}
	if(d)
	{
		console.log("Moving Right");
		player.vx +=  player.ax * player.force;
	}

	player.vx *= frictionX;
	
	player.move();

	//Player Wall Collision
	if(player.x < player.width/2)
	{
		player.x = player.width/2;
	}
	if(player.x > canvas.width - player.width/2)
	{
		player.x = canvas.width - player.width/2;
	}

	//Ball Paddle Collision
	if(player.hitTestObject(ball))
	{
		//ball hits center
		ball.vy = -35;
		ball.y = player.y - player.height/2 - ball.height/2;

		score++
		//ball hits inner left 1/6
    	if(ball.x < player.x - player.width/6 && ball.x > player.x - player.width/3)
     	{
			ball.vx = -ball.force;
    	}
		//ball outer left 1/6
		if(ball.x < player.x - player.width/3)
     	{
			ball.vx = -ball.force * 5;
    	}
		//ball hits inner right 1/6
    	if(ball.x > player.x + player.width/6 && ball.x < player.x + player.width/3)
     	{
			ball.vx = ball.force;
    	}
		//ball outer right 1/6
		if(ball.x > player.x + player.width/3)
     	{
			ball.vx = ball.force * 5;
    	}
	}

	//Ball Wall Collision
	if(ball.x < ball.width/2)
	{
		ball.x = ball.width/2;
		ball.vx = -ball.vx * 0.67;
	}
	if(ball.x > canvas.width - ball.width/2)
	{
		ball.x = canvas.width - ball.width/2;
		ball.vx = -ball.vx * 0.67;
	}
	//top of screen
	if(ball.y < ball.height/2)
	{
		ball.y = ball.height/2;
		ball.vy = -ball.vy;
		//ball.vy = -ball.vy * 0.67;
	}
	//bottom of screen
	if(ball.y > canvas.height - ball.height/2)
	{
		ball.y = canvas.height - ball.height/2;
		/*ball.vx = 5;
		ball.vy = 0;
		*/
		ball.vy = -ball.vy * 0.67
		score = 0;
	}

	//Line
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
	context.color = 'dark gray';
	context.fillText(`Score: ${score}`, 80, 25);

	//Update the Screen
	player.drawRect();
	ball.drawCircle();
	
}