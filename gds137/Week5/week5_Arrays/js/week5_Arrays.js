
//-----------------------------------------------------!!!!IMPORTANT!!!-------------------------------------------------------------------------
//----------------------------------------------Instructor Cover that function first------------------------------------------------------------
//-----------------------------------The rand function is located in js/Utility/Random.js-------------------------------------------------------

//canvas and context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
	
//timebase
var interval = 1000/60;
var timer = setInterval(animate, interval);
var gravity = 1;

var colors = [];
colors[0] = "#ff0000";
colors[1] = "#00ff00";
colors[2] = "#0000ff";

var amt = 50;	
var dots = [];

for(var i = 0; i < amt; i++)
{
	dots[i] = new GameObject();
	dots[i].x = Math.random() * canvas.width; //0-canvas.width
	dots[i].y = Math.random() * canvas.height; //0-canvas.height
	dots[i].width = rand(5,20);
	dots[i].vy = rand(-40,40);
	dots[i].vx = rand(-10,10);
	//dots[i].color = colors[Math.floor(rand(0,2.9))];
	dots[i].color = `rgb(${rand(0,255)},${rand(0,255)}, ${rand(0,255)})`; //random color
}

//added v
var states = []
var currentState = 'square';
//var currentState = 'circle';

//state machine:
states['square'] = function(){dots[0].drawRect()}
states['circle'] = function(){dots[0].drawCircle()}
//added ^

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	

	states[currentState](); //added
	/*
	//The for loops should be used for platforms, enemies, items, etc.
	for(var i = 0; i < amt; i++)
	{
		dots[i].drawCircle();
		//dots[i].vy *= .87;
		dots[i].vy += gravity; //gravity

		dots[i].move();
		//added v
		if(dots[i].y > canvas.height - dots[i].height/2)
		{
			dots[i].y = canvas.height - dots[i].height/2;
			dots[i].vy = -dots[i].vy * .87;
		}
		//added ^
		dots[i].drawCircle();
	}
	*/
}










