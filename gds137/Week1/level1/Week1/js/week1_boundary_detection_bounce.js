// JavaScript Document

var canvas;
var context;
var interval = 1000/60;
var ball;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	ball = new Ball();
	
	//------Declare the Ball's speed on the x and y axis------
	ball.vx = 2;
	ball.vy = 0;
	//----------------------------------------------------
	
	var maintimer = setInterval(animate, interval);


function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//----Movement Using the Ball's move() function----
	ball.move();
	//---------------------------------------------------
	
	//--------------Bounce of Right----------------------
	if(ball.x > canvas.width - ball.width/2)
	{
		ball.vx = -ball.vx;	
	}
	//---------------------------------------------------
	
	ball.draw();
}
