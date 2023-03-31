//Declare my variables

var canvas;
var context;
var timer;
//v 1000 ms or 1 second / FPS
var interval = 1000/60;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Ball
	var ball = new Ball();
	ball.vx = -2;
	
	//Set the Animation Timer
	timer = setInterval(animate, interval);

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

	//Update the Screen (redraw the elements)
	ball.draw();
}