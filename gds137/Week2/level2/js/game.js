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

	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	

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
	/*
	//Screen Collision
	if(player1.y > canvas.height/2)
	{
		player1.y = canvas.y - canvas.width/2 + player1.height/2;
	}
	else if (player1.y < canvas.height/2)
	{
		player1.y = canvas.y - canvas.width/2 - player1.height/2;
	}
	
	if(player1.y > canvas.height - player1.height/2)
	{
		player1.y = canvas.height - player1.height/2;

		*/

	//Update the Screen
	player1.drawRect();
}
