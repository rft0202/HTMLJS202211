	//----------------------------------------------------------Instructions-----------------------------------------------------------------
	//---------------------In this assignment you will create strange movement that resembles a bee swarm or virus outbreak------------------
	//---------------------You will do this by randomly calculating velocities on every frame------------------------------------------------
	//---------------------Follow the commented instrcutions below to complete this assignment-----------------------------------------------

var canvas;
var context;
var timer;
var interval;
var player;


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	canvas.style.backgroundColor="#88ff88";
	
	var amount = 25;
	var particles = [];
	var colors = ["yellow", "purple"];
	
	
	for(var i = 0; i < amount; i++)
	{
		particles[i] = new GameObject({width:10, height:10});
		
		var randomColor = Math.round(Math.random());
		particles[i].color = colors[randomColor];
	
		particles[i].x = canvas.width/2;
		particles[i].y = canvas.height/2;
	}
	
	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{	
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	for(var p = 0; p < particles.length; p++)
	{	
		particles[p].x += particles[p].vx;
		particles[p].y += particles[p].vy;
			
		//-------------------------------------------------INSTRUCTIONS----------------------------------------------------------
			//	1. Re-calculate the particle's vx to be a random number between -1 and 1
			//  2. Re-calculate the particle's vy to be a random number between -1 and 1
			//  3. Run the program and see what happens when you randomly generate velocities every frame.
		//-------------------------------------------------------------------------------------------------------------------------
		
		particles[p].drawRect();
	}
	

}


