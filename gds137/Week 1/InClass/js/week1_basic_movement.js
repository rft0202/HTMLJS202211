//Declare my variables

var canvas;
var context;
var timer;
//v 1000 ms or 1 second / FPS
var interval = 1000/60;
var player;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Player
	player = new Player();
	player.vx = -2; //added during class
	
	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//Move the Player (change something)
	//player.x += 2;
	//player.x += player.vx; <-math was already done in class, so unneeded
	player.move();
	
	//Collision
	if(player.x < player.width/2)
	{
		player.x = player.width/2;
		player.vx = -player.vx;
	}
	if(player.x > canvas.width - player.width/2)
	{
		player.x = canvas.width - player.width/2;
		player.vx = -player.vx;
	}


	//Update the Screen (redraw the elements)
	player.draw();
}

/*function move(obj)
{
	obj.x += obj.vx;
}*/
//^added during class