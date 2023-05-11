
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var player;

var interval = 1000/60;
var timer = setInterval(animate, interval);
var gravity = 1;
var frictionX = .87;

player = new GameObject();
	player.width = 50;
	player.height = 50; 
	player.x = canvas.width/2;
	player.y = canvas.height - 25;
	player.color = "#ffff00";

var wait;
var wait2;

var score = 0;

var gameOver = false;

var amount = 5;

//squares
var items = [];
	
for(var i = 0; i < amount; i++)
{
	items[i] = new GameObject({width:25, height:25});
		
	items[i].color = "green";
	
	items[i].x = Math.random() * canvas.width;
	items[i].y = -items[i].height;
	items[i].vy = Math.random() * 10 + 5;
}

//circles
var hazards = [];
	
for(var i = 0; i < amount; i++)
{
	hazards[i] = new GameObject({width:25, height:25});
		
	hazards[i].color = "red";
	
	hazards[i].x = Math.random() * canvas.width;
	hazards[i].y = -hazards[i].height;
	hazards[i].vy = Math.random() * 10 + 5;
}


function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);
	
	//Move Player
	if(a)
	{
		//fix this later
		player.vx += -player.ax * player.force;
	}
	if(d)
	{
		player.vx +=  player.ax * player.force;
	}
	player.vx *= frictionX;

	player.move();

	//Squares
	for(var i = 0; i < items.length; i++)
	{	
		items[i].x += items[i].vx;
		items[i].y += items[i].vy;
		
		if(items[i].y > canvas.height)
		{
			items[i].y = -items[i].height;
			items[i].x = Math.random() * canvas.width;
			items[i].vy = Math.random() * 10 + 5;
		}

		if(gameOver == true)
		{
			items[i].y = -items[i].height;
		}

		//Player Item Collision
		if(player.hitTestObject(items[i])) 
		{
			items[i].y = -items[i].height;
			hitItem();
		}

		items[i].drawRect();
	}

	//Circles
	for(var i = 0; i < hazards.length; i++)
	{	
		hazards[i].x += hazards[i].vx;
		hazards[i].y += hazards[i].vy;
		
		if(hazards[i].y > canvas.height)
		{
			hazards[i].y = -hazards[i].height;
			hazards[i].x = Math.random() * canvas.width;
			hazards[i].vy = Math.random() * 10 + 5;
		}

		if(gameOver == true)
		{
			items[i].y = -items[i].height;
		}

		//Player Hazard Collision
		if(player.hitTestObject(hazards[i]))
		{
			hitHazard();
		} 

		hazards[i].drawCircle();
	}

	//Player Wall Collision
	if(player.x < player.width/2)
	{
		player.x = player.width/2;
	}
	if(player.x > canvas.width - player.width/2)
	{
		player.x = canvas.width - player.width/2;
	}

	//Score
	context.font = "bold 30px Arial";
	context.color = 'black';
	context.fillText(`Score: ${score}`, 50, 50);

	player.drawRect();
}

function hitItem()
{
	player.color = 'green';
	score++;
	
	clearTimeout(wait);
	wait = setTimeout(defaultColor, 500);
}

function hitHazard()
{
	player.color = 'red';
	score = 0;
	gameOver = true;

	clearTimeout(wait);
	wait = setTimeout(defaultColor, 500);
}

function defaultColor()
{
	player.color =  "#ffff00";
	gameOver == false;
}