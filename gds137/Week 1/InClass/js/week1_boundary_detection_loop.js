// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000/60;
var ball;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	ball = new Ball();
	
	//------Declare the Ball's speed on the x and y axis------
	ball.vx = 2;
	ball.vy = 0;
	//----------------------------------------------------
	
	timer = setInterval(animate, interval);


function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	ball.move();
	
	//--------------Loop the Screen----------------------
	if(ball.x > canvas.width + ball.width/2)
	{
		ball.x = -ball.width/2	
	}
	//---------------------------------------------------
	
	ball.draw();
}
