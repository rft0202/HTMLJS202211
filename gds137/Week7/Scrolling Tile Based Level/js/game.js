
var canvas = document.getElementById("canvas");
	
var context = canvas.getContext("2d");

var interval = 1000/60;
var timer = setInterval(animate, interval);

var player = new GameObject({width:50, height:50, angle:0, x:canvas.width/2, y:canvas.height-100, force:1, color:"gray"})

//This is used to move the level elements
var level = new Level();
//This generates a tile based level.
	level.generate(level.l1, 150,150); //how big you want the tiles to be, how you want the level to look like		
	//level.generate(level.l1); //without the numbers, the entire level fits in one screen

	//added
	//var box = new GameObject({color: "red"});
	//box.world = level; //moves with world
	//box.world = player; //moves with player

var fx = .85;
var fy = .85;

var states =[];
var currentState = "play";

//When moving the level, we first move the player as usual. Then we utilize an offset object to keep track of how much the collision detection affects the player's position. Then we move both the player and the level back the total number of pixels that the player moved over one loop of animation.

states["play"] = function()
{
	if(w)
	{
		player.vy += player.ay * -player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}
	if(s)
	{
		player.vy += player.ay * player.force;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
	}
	
	player.vx *= fx;
	player.vy *= fy;
	
	player.x += player.vx;
	player.y += player.vy;
	
	//Used to move the player and level back so that it appears as though the level moved and not the player.
	var offset = {x:player.vx, y:player.vy};
	
	//All tile code
	for(var i = 0; i < level.grid.length; i++)
	{
		level.grid[i].drawRect();
		//Hit top
		while(level.grid[i].hitTestPoint(player.top()) && player.vy <= 0)
		{
			player.vy = 0;
			player.y++;
			offset.y++; //new
		}
		//Hit right
		while(level.grid[i].hitTestPoint(player.right()) && player.vx >= 0)
		{
			player.vx = 0;
			player.x--;
			offset.x--; //new
		}
		//Hit left
		while(level.grid[i].hitTestPoint(player.left()) && player.vx <= 0)
		{
			player.vx = 0;
			player.x++;
			offset.x++; //new
		}
		//Hit bottom
		while(level.grid[i].hitTestPoint(player.bottom()) && player.vy >= 0)
		{
			player.canJump = true;
			player.vy = 0;
			player.y--;
			offset.y--; //new
		}
		
	}
	
	//Moves the level and the player back the total number of pixels traveled over one animation loop.

	//added
	/*
	if(player.x < 200 || player.x > canvas.width - 200) //level only moves when the player moves to a certain point
	{
		player.x -= offset.x;
		player.y -= offset.y;
		level.x -= offset.x;
		level.y -= offset.y;
	}
	*/

	//added
	/*
	//Smoother camera
	var dx = canvas.width/2 - player.x; //the distance between the center of the canvas and the player
	var dy = canvas.height/2 - player.y;
	var camVX = dx * .15; //magnet
	var camVY = dy * .15;

	player.x += camVX;
	player.y += camVY;
	level.x += camVX;
	level.y += camVY;
	//
	*/

	player.x -= offset.x;
	player.y -= offset.y;
	level.x -= offset.x;
	level.y -= offset.y;
	//^without, the player moves instead of the level

	//Draws the player
	player.drawRect();
	player.drawDebug();
	//box.drawRect();
}

//--------------------------------------------Animation Loop-------------------------------------------
function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	states[currentState]();
}



