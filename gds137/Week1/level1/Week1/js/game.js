//Declare my variables

var canvas;
var context;
//v 1000 ms or 1 second / FPS
var interval = 1000/60;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Ball
	var ball = new Ball();
	ball.vx = -5;
	ball.vy = -5;
	
	//Set the Animation Timer
	var maintimer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//Move the Ball (change something)
	ball.move();
	
	//Collision
	if(ball.x < ball.width/2)
	{
		ball.x = ball.width/2;
		ball.vx = -ball.vx;
	}
	if(ball.x > canvas.width - ball.width/2)
	{
		ball.x = canvas.width - ball.width/2;
		ball.vx = -ball.vx;
	}

	if(ball.y < ball.height/2)
	{
		ball.y = ball.height/2;
		ball.vy = -ball.vy;
	}
	if(ball.y > canvas.height - ball.height/2)
	{
		ball.y = canvas.height - ball.height/2;
		ball.vy = -ball.vy;
	}

	//Update the Screen (redraw the elements)
	ball.draw();
}