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
	player1.x = player1.width/2;
	player1.y = canvas.height/2;
	player1.width = 20;
	player1.height = 100; 

	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	
	//Move the Player to the right
	/*if(d)
	{
		console.log("Moving Right");
		player1.x += 2;
	}
	if(a)
	{
		console.log("Moving Left");
		player1.x += -2;
	}
	*/
	
	//Update the Screen
	player1.drawRect();
}
