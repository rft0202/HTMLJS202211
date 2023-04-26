//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;
var enemy1;
var enemy2;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	//Instantiate Platform
	//Platforms should be in an array
	platform = new GameObject();
	platform.width = canvas.width*2;
	platform.x = canvas.width/2;
	platform.y = canvas.height - platform.height/2;
	platform.color = "mediumseagreen";
	
	//Instantiate Player 1
	player = new GameObject();
	player.width = 25;
	player.height = 75; 
	player.x = player.width;
	player.y = canvas.height - platform.height;
	player.color = 'hotpink';

	//Instantiate Enemy 1
	enemy1 = new BraveEnemy();
	enemy1.x = canvas.width - enemy1.width/1.5;
	enemy1.y = canvas.height - platform.height;

	//Instantiate Enemy 2
	enemy2 = new CowardlyEnemy();
	enemy2.x = canvas.width/2;
	enemy2.y = canvas.height - platform.height;

	//Global Physics Variables
	var fX = .90;
	var fY = .97;

	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	

	//Move Player
	if(w && player.canJump)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
	}
	
	//Apply acceleration to velocity.
	if(a)
	{
		player.vx += -player.ax * player.force;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
	}
	
	//Player physics
	player.vx *= fX;
	player.vy *= fY;
	
	player.vy += gravity;
	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);

	//Hit the platform
	while(platform.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	} 

	//Enemy1 Physics
	enemy1.vx *= fX;
	enemy1.vy *= fY;
	
	enemy1.vy += gravity;
	
	//enemy1.x += Math.round(enemy1.vx);
	//enemy1.y += Math.round(enemy1.vy);

	//Hit the platform
	while(platform.hitTestPoint(enemy1.bottom()) && enemy1.vy >=0)
	{
		enemy1.y--;
		enemy1.vy = 0;
		//enemy1.canJump = true;
	} 

	//Enemy2 Physics
	enemy2.vx *= fX;
	enemy2.vy *= fY;
	
	enemy2.vy += gravity;

	//Hit the platform
	while(platform.hitTestPoint(enemy2.bottom()) && enemy2.vy >=0)
	{
		enemy2.y--;
		enemy2.vy = 0;
		//enemy1.canJump = true;
	} 


	enemy1.attack();
	enemy2.flee();

	//Player Collision with top of Enemy1
	while(player.hitTestPoint(enemy1.top())) 
	{
		player.y--;
		enemy1.health -= 10; //for later
		console.log("Enemy1 Health: " + enemy1.health);
	}

	//Player Collision with top of Enemy2
	while(player.hitTestPoint(enemy2.top()))
	{
		player.y--;
		enemy2.health -= 10; //for later
		console.log("Enemy2 Health: " + enemy2.health);
	}

	//Player Collision with Enemy1 Left
	while(player.hitTestPoint(enemy1.left()))
	{
		//enemy1.x -= player.width - enemy1.width/2;
		enemy1.x++;
		enemy1.vx = 0;
		player.health -= 10; //for later
		console.log("Player Health: " + player.health);
	}
	//Player Collision with Enemy1 Right
	while(player.hitTestPoint(enemy1.right()))
	{
		//enemy1.x -= player.width - enemy1.width/2;
		enemy1.x--;
		enemy1.vx = 0;
		player.health -= 10; //for later
		console.log("Player Health: " + player.health);
	}

	//Player Collision with Enemy2 Left
	while(player.hitTestPoint(enemy2.left()))
	{
		player.x--;
		enemy2.vx = 0;
		player.health -= 10; //for later
		console.log("Player Health: " + player.health);
	}
	//Player Collision with Enemy2 Right
	while(player.hitTestPoint(enemy2.right()))
	{
		player.x++;
		enemy2.vx = 0;
		player.health -= 10; //for later
		console.log("Player Health: " + player.health);
	}

	//Player 1 Wall Collision
	if(player.x < player.width/2)
	{
		player.x = player.width/2;
	}
	if(player.x > canvas.width - player.width/2)
	{
		player.x = canvas.width - player.width/2;
	}

	if(player.y < player.height/2)
	{
		player.y = player.height/2;
	}
	if(player.y > canvas.height - player.height/2)
	{
		player.y = canvas.height - player.height/2;
	}

	//Enemy 1 Wall Collision
	if(enemy1.x < enemy1.width/2)
	{
		enemy1.x = enemy1.width/2;
	}
	if(enemy1.x > canvas.width - enemy1.width/2)
	{
		enemy1.x = canvas.width - enemy1.width/2;
	}

	if(enemy1.y < enemy1.height/2)
	{
		enemy1.y = enemy1.height/2;
	}
	if(enemy1.y > canvas.height - enemy1.height/2)
	{
		enemy1.y = canvas.height - enemy1.height/2;
	}

	//Enemy 2 Wall Collision
	if(enemy2.x < enemy2.width/2)
	{
		enemy2.x = enemy2.width/2;
	}
	if(enemy2.x > canvas.width - enemy2.width/2)
	{
		enemy2.x = canvas.width - enemy2.width/2;
	}

	if(enemy2.y < enemy2.height/2)
	{
		enemy2.y = enemy2.height/2;
	}
	if(enemy2.y > canvas.height - enemy2.height/2)
	{
		enemy2.y = canvas.height - enemy2.height/2;
	}

	//Update the Screen
	platform.drawRect();
	player.drawRect();
	enemy1.drawCircle();
	enemy2.drawRect();
}
