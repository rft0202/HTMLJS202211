//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval;
var player;

var gameOver = false;

var img=document.getElementById("heart");

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	//Instantiate Platform
	var platforms = [];

	platforms[0] = new GameObject();
	platforms[0].width = canvas.width*2;
	platforms[0].x = canvas.width/2;
	platforms[0].y = canvas.height - platforms[0].height/2;
	platforms[0].color = "mediumseagreen";
	
	//Instantiate Player 1
	player = new GameObject();
	player.width = 25;
	player.height = 75; 
	player.x = player.width;
	player.y = canvas.height - platforms[0].height;
	player.color = 'hotpink';

	//Instantiate Enemy Type B
	var enemyB = [];
	var numOfEnemyB = 1; //number of brave enemies

	for(var i = 0; i < numOfEnemyB; i++)
	{
		enemyB[i] = new BraveEnemy();
		enemyB[i].x = canvas.width - enemyB[i].width/1.5;
		enemyB[i].y = canvas.height - platforms[0].height;
	}

	var enemy1 = enemyB[0];

	//Instantiate Enemy Type C
	var enemyC = [];
	var numOfEnemyC = 1; //number of cowardly enemies

	for(var i = 0; i < numOfEnemyC; i++)
	{
		enemyC[i] = new CowardlyEnemy();
		enemyC[i].x = canvas.width/2;
		enemyC[i].y = canvas.height - platforms[0].height;
	}

	var enemy2 = enemyC[0];

	//Global Physics Variables
	var fX = .90;
	var fY = .97;

	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

	var wait;
	var wait2;
	var invincible = false;
	var invincibleEnemy = false;

function animate()
{
	if (!gameOver)
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

		//Hit the platforms
		while(platforms[0].hitTestPoint(player.bottom()) && player.vy >=0)
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

		//Hit the platforms[i]
		while(platforms[0].hitTestPoint(enemy1.bottom()) && enemy1.vy >=0)
		{
			enemy1.y--;
			enemy1.vy = 0;
			//enemy1.canJump = true;
		} 

		//Enemy2 Physics
		enemy2.vx *= fX;
		enemy2.vy *= fY;
		
		enemy2.vy += gravity;

		//Hit the platforms[i]
		while(platforms[0].hitTestPoint(enemy2.bottom()) && enemy2.vy >=0)
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
			player.canJump = true;
			if(!invincibleEnemy)
			{
				loseEnemy1Health();
				console.log("Enemy1 Health: " + enemy1.health);
			}
		}

		//Player Collision with top of Enemy2
		while(player.hitTestPoint(enemy2.top())) //||enemy2.topLeft()||enemy2.topRight()
		{
			player.y--;
			player.canJump = true;
			if(!invincibleEnemy)
			{
				loseEnemy2Health();
				console.log("Enemy2 Health: " + enemy2.health);
			}
		}

		//Player Collision with Enemy1 Left
		while(player.hitTestPoint(enemy1.left()))
		{
			//enemy1.x -= player.width - enemy1.width/2;
			enemy1.x++;
			enemy1.vx = 0;
			if(!invincible)
			{
				losePlayerHealth();
				console.log("Player Health: " + player.health);
			}
		}
		//Player Collision with Enemy1 Right
		while(player.hitTestPoint(enemy1.right()))
		{
			//enemy1.x -= player.width - enemy1.width/2;
			enemy1.x--;
			enemy1.vx = 0;
			if(!invincible)
			{
				losePlayerHealth();
				console.log("Player Health: " + player.health);
			}
		}

		//Player Collision with Enemy2 Left
		while(player.hitTestPoint(enemy2.left()))
		{
			player.x--;
			enemy2.vx = 0;
			if(!invincible)
			{
				losePlayerHealth();
				console.log("Player Health: " + player.health);
			}
			if(!invincibleEnemy)
			{
				loseEnemy2Health();
				console.log("Enemy2 Health: " + enemy2.health);
			}
		}
		//Player Collision with Enemy2 Right
		while(player.hitTestPoint(enemy2.right()))
		{
			player.x++;
			enemy2.vx = 0;
			if(!invincible)
			{
				losePlayerHealth();
				console.log("Player Health: " + player.health);
			}
			if(!invincibleEnemy)
			{
				loseEnemy2Health();
				console.log("Enemy2 Health: " + enemy2.health);
			}
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

		if(enemy1.y < enemy1.height/2 && enemy1.health > 0)
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

		if(enemy2.y < enemy2.height/2 && enemy1.health > 0)
		{
			enemy2.y = enemy2.height/2;
		}
		if(enemy2.y > canvas.height - enemy2.height/2)
		{
			enemy2.y = canvas.height - enemy2.height/2;
		}


		//Update the Screen
		platforms[0].drawRect();
		player.drawRect();
		enemy1.drawCircle();
		enemy2.drawRect();

		//Player Health
		var hearts = [];
		for(var i = 0; i < player.health; i++)
		{
			if(i==0)
			{
				hearts[i] = new Heart();
				//hearts[i].drawRect();
				context.drawImage(img, hearts[i].x, hearts[i].y, hearts[i].width, hearts[i].height);
			}
			else
			{
				hearts[i] = new Heart();
				hearts[i].x = hearts[i-1].x + hearts[i].width + 10;
				//hearts[i].drawRect();
				context.drawImage(img, hearts[i].x, hearts[i].y, hearts[i].width, hearts[i].height);
			}
		}
	}
}

function losePlayerHealth()
	{
		if (player.health > 1)
		{
			player.health -= 1; 
			invincible = true;
			player.color = 'pink';
			clearTimeout(wait);
			wait = setTimeout(makeNotInvincible, 3000);
		}
		else if (player.health == 1)
		{
			player.health -= 1; 
			//game over
			//console.log("Game Over");
			gameOverScreen();
		}
	}

function loseEnemy1Health()
	{
		if (enemy1.health > 1)
		{
			enemy1.health -= 1; 
			enemy1.color = 'red';
			invincibleEnemy = true;
			clearTimeout(wait2);
			wait2 = setTimeout(makeNotInvincibleEnemy, 500);
		}
		else
		{
			enemy1.health -= 1; 
			enemy1.vy = -1;
			enemy1.y = -10000;
			console.log("Enemy 1 Died");
		}
	}

function loseEnemy2Health()
	{
		if (enemy2.health > 1)
		{
			enemy2.health -= 1; 
			enemy2.color = 'red';
			invincibleEnemy = true;
			clearTimeout(wait2);
			wait2 = setTimeout(makeNotInvincibleEnemy, 500);
		}
		else
		{
			enemy2.health -= 1; 
			enemy2.vy = -1;
			enemy2.y = -10000;
			console.log("Enemy 2 Died");
		}
	}

function makeNotInvincible()
{
	invincible = false;
	player.color = 'hotpink';
}

function makeNotInvincibleEnemy()
{
	invincibleEnemy = false;
}

function gameOverScreen()
{
	gameOver = true;
	context.clearRect(0,0,canvas.width, canvas.height);	
	context.font = "bold 48px Arial";
	context.textAlign = "center";
	context.fillText("Game Over", canvas.width/2, canvas.height/2)
}