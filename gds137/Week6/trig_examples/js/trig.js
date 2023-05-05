//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject();
	player.force = 1;
	//player.force = 5;
	
	follower = new GameObject();
	//follower.x = 0;
	//follower.y = 0;
	follower.x = 100;
	follower.y = 100;

	/*
	var ret = new GameObject();
	ret.width = 20;
	ret.height = 20;
	ret.color = 'black';
	*/
	
	//friction
	var fX = .80;
	var fY = .80;
	
	var angle = 0;
	
	//gravity gets added to the vy
	var gravity = 0;

	interval = 1000/60;
	timer = setInterval(animate, interval);
	

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	/*-----------This function move the player-----------*/
	//w and s move forward and backward
	//a and d rotate the triangle
	angularMovement();
	
	//Added in class:
	
	/*
	var dx = player.x - follower.x;
	var dy = player.y - follower.y;
	var dist  = Math.sqrt(dx*dx + dy*dy);

	if (dist < 200)
	{
		follower.vx = dx * .05;
		follower.vy = dy * .05;
	}

	var rad = Math.atan2(dy, dx);
	//rad = deg * Math.PI/180;
	//deg = rad * 180/Math.PI;
	follower.angle = rad * 180/Math.PI; //points at player

	//follower.move();
	*/
	/* 
	// Couldn't copy everything in time
	//Reticle
	var dx = player.x - ret.x;
	var dy = player.y - ret.y;
	var dist  = Math.sqrt(dx*dx + dy*dy);

	
	
		ret.vx = dx * .05;
		ret.vy = dy * .05;

		dx = ret.x = follower.x;
		dy = ret.y - follower.y;
	

	var rad = Math.atan2(dy, dx);
	//rad = deg * Math.PI/180;
	//deg = rad * 180/Math.PI;
	follower.angle = rad * 180/Math.PI; //points at player
	*/

	//End of additions

	/*-----------These move the follower-----------------*/
	//magnet(); //- eases the follower towards the player - 
	point(); //- points at the player
	//follow(); //- follows the player //moves at a constant speed
	//orbit(); //- orbits the player using physics //accelerate towards the player
	revolve(); //- orbits the player without physics. //revolves around a point
	//sinWave(); //- moves the follower in a sin wave pattern from left to right
	
	
	player.drawTriangle();
	follower.drawTriangle();
	//ret.drawCircle();
}

function angularMovement()
{
	if(w)
	{	
		//Convert Angle to Radians
		var radians = player.angle * Math.PI/180;
		
		//Calculate acceleration modifiers (lengtha and height of triangle)
		player.ax = Math.cos(radians); //angle
		player.ay = Math.sin(radians);
		
		player.vx += player.ax * player.force; //player.force is the hypotenuse
		player.vy += player.ay * player.force;
	}
	
	if(s)
	{
		//Convert Angle to Radians
		var radians = player.angle * Math.PI/180;
		
		//Calculate acceleration modifiers (lengtha and height of triangle)
		player.ax = Math.cos(radians);
		player.ay = Math.sin(radians);
		
		player.vx += player.ax * -player.force;
		player.vy += player.ay * -player.force;
	}
	
	//Rotate Counter Clockwise
	if(a)
	{
		player.angle-=2;
	}
	//Rotate Clockwise
	if(d)
	{
		player.angle+=2;
	}

	//apply physics to velocity
	player.vx *= fX;
	player.vy *= fY;
	
	//apply gravity to velocity
	player.vy += gravity;
	
	//move player
	player.move();
}

function revolve()
{
	angle-=5; //determines the speed at which it spins
	var radians = angle * Math.PI/180;
	
	//follower.x += 2; //without point() and follower.x below 

	follower.x = player.x + Math.cos(radians) * 200; //200 is how far away you want the follower to be
	follower.y = player.y + Math.sin(radians) * 200;
}
	
function magnet()
{
	//Get the displacement of the follower from the player
	var dx = player.x - follower.x;
	var dy = player.y - follower.y;
	
	//Not using this in this function but...
	//This is the Pythagorean Theorem and gets the hypoteneuse of a triangle.
	//This can be used to get the actual distance between two points.
	//var dist = Math.sqrt(dx * dx + dy * dy);
	
	follower.x += dx /25;
	follower.y += dy /25;
}

function point()
{
	var dx = player.x - follower.x;
	var dy = player.y - follower.y;
	
	//var dist = Math.sqrt(dx * dx + dy * dy);
	
	var radians = Math.atan2(dy, dx);
	
	follower.angle = radians * 180/Math.PI;
}

function follow()
{
	var dx = player.x - follower.x;
	var dy = player.y - follower.y;
	
	//var dist = Math.sqrt(dx * dx + dy * dy);
	
	var radians = Math.atan2(dy, dx);
	
	follower.vx = Math.cos(radians)*follower.force; 
	follower.vy = Math.sin(radians)*follower.force;

	follower.x += follower.vx * 2; //* 2 just makes it faster
	follower.y += follower.vy * 2;
}

function orbit()
{
	var dx = player.x - follower.x;
	var dy = player.y - follower.y;
	
	//var dist = Math.sqrt(dx * dx + dy * dy);
	
	var radians = Math.atan2(dy, dx);
	
	angle = radians * 180/Math.PI;
	
	follower.vx += Math.cos(radians)*follower.force; //accelerate
	follower.vy += Math.sin(radians)*follower.force;

	follower.x += follower.vx * 2;
	follower.y += follower.vy * 2;

}

function sinWave()
{
	angle-=5;
	var radians = angle * Math.PI/180;
	follower.y = player.y + Math.sin(radians) * 200;
	follower.x += 2;
}
