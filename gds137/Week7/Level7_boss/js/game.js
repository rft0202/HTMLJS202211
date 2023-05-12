//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval;
var player;

var gameOver = false;

var imgHeart=document.getElementById("heart");
var imgCookie=document.getElementById("cookie");
var imgCracker=document.getElementById("cracker");

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	//Instantiate Platform
	var platforms = [];
	var numOfPlatforms = 2;

	for(var p = 0; p < numOfPlatforms; p++)
	{
		platforms[p] = new GameObject();
	}

	//Platform 0
	platforms[0].width = canvas.width*2;
	platforms[0].x = canvas.width/2;
	platforms[0].y = canvas.height - platforms[0].height/2;
	platforms[0].color = "mediumseagreen";

	//Platform 1
	platforms[1].width = canvas.width/2;
	platforms[1].height = 50;
	platforms[1].x = canvas.width - platforms[1].width/2;
	platforms[1].y = canvas.height/2 + platforms[1].height*3;
	platforms[1].color = "mediumseagreen";
	
	//Instantiate Player 1
	player = new GameObject();
	player.width = 25;
	player.height = 75; 
	player.x = player.width;
	player.y = canvas.height - platforms[0].height;
	player.color = 'hotpink';

	//Instantiate Enemy Type B
	var enemyB = [];
	var numOfEnemyB = 2; //number of brave enemies
	var cookie = [];

	for(var i = 0; i < numOfEnemyB; i++)
	{
		enemyB[i] = new BraveEnemy();
		enemyB[i].x = canvas.width - enemyB[i].width/1.5;
		enemyB[i].y = canvas.height - platforms[0].height;

		cookie[i] = new GameObject(enemyB[i]);
		cookie[i].width = enemyB[i].width/2;
		cookie[i].height = enemyB[i].height/2;
		cookie[i].y = -10000;
	}
	//EnemyB 1
	enemyB[1].y = platforms[1].y - enemyB[1].height/2;

	//Instantiate Enemy Type C
	var enemyC = [];
	var numOfEnemyC = 2; //number of cowardly enemies
	var cracker = []

	for(var i = 0; i < numOfEnemyC; i++)
	{
		enemyC[i] = new CowardlyEnemy();
		enemyC[i].x = canvas.width/2;
		enemyC[i].y = canvas.height - platforms[0].height;

		cracker[i] = new GameObject(enemyC[i]);
		cracker[i].width = enemyC[i].width/2;
		cracker[i].height = enemyC[i].height/2;
		cracker[i].y = -10000;
	}

	//EnemyC 1
	enemyC[1].x = canvas.width/2 + enemyC[1].width;
	enemyC[1].y = platforms[1].y - enemyC[1].height/2;

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
		

		//EnemyB Physics
		for(var i = 0; i < numOfEnemyB; i++)
		{
			enemyB[i].vx *= fX;
			enemyB[i].vy *= fY;

			enemyB[i].vy += gravity;

			if (enemyB[i].health > 0)
			{
				enemyB[i].x += Math.round(enemyB[i].vx);
				enemyB[i].y += Math.round(enemyB[i].vy);

				enemyB[i].attack(player);
			}
		}
		
		//EnemyC Physics
		for(var i = 0; i < numOfEnemyC; i++)
		{
			enemyC[i].vx *= fX;
			enemyC[i].vy *= fY;
		
			enemyC[i].vy += gravity;

			if (enemyC[i].health > 0)
			{
				enemyC[i].x += Math.round(enemyC[i].vx);
				enemyC[i].y += Math.round(enemyC[i].vy);

				enemyC[i].flee(player);
			}
		}

		//Enemy B Collision
		for(var i = 0; i < numOfEnemyB; i++)
		{
			//Hit platforms
			for(var p = 0; p < numOfPlatforms; p++)
			{
				while(platforms[p].hitTestPoint(enemyB[i].bottom()) && enemyB[i].vy >=0)
				{
					enemyB[i].y--;
					enemyB[i].vy = 0;
				} 
			}

			//Player Collision with top of EnemyB
			while(player.hitTestPoint(enemyB[i].top())) 
			{
				player.y--;
				player.canJump = true;
				if(!invincibleEnemy)
				{
					loseEnemyBHealth(i);
					console.log("EnemyB Health: " + enemyB[i].health);
				}
			}
			
			//Player Collision with EnemyB Left
			while(player.hitTestPoint(enemyB[i].left()))
			{
				//enemyB[i].x -= player.width - enemyB[i].width/2;
				enemyB[i].x++;
				enemyB[i].vx = 0;
				if(!invincible)
				{
					losePlayerHealth();
					console.log("Player Health: " + player.health);
				}
			}
			//Player Collision with enemyB Right
			while(player.hitTestPoint(enemyB[i].right()))
			{
				//enemyB[i].x -= player.width - enemyB[i].width/2;
				enemyB[i].x--;
				enemyB[i].vx = 0;
				if(!invincible)
				{
					losePlayerHealth();
					console.log("Player Health: " + player.health);
				}
			}

			//Enemy B Wall Collision
			if(enemyB[i].x < enemyB[i].width/2)
			{
				enemyB[i].x = enemyB[i].width/2;
			}
			if(enemyB[i].x > canvas.width - enemyB[i].width/2)
			{
				enemyB[i].x = canvas.width - enemyB[i].width/2;
			}

			if(enemyB[i].y < enemyB[i].height/2 && enemyB[i].health > 0)
			{
				enemyB[i].y = enemyB[i].height/2;
			}
			if(enemyB[i].y > canvas.height - enemyB[i].height/2)
			{
				enemyB[i].y = canvas.height - enemyB[i].height/2;
			}

			//Player Cookie Collision
			if(player.hitTestObject(cookie[i])) 
			{
				touchCookie(i);
			}
			/*
			//Cookie Platform Collision
			for(var p = 1; p < numOfPlatforms; p++)
			{
				//Top
				while(cookie[i].hitTestPoint(platforms[p].top()))
				{
					cookie[i].y--;
				}
				//Bottom
				while(cookie[i].hitTestPoint(platforms[p].bottom()))
				{
					cookie[i].y++;
				}
			}
			*/
		}

		//EnemyC Collision
		for(var i = 0; i < numOfEnemyC; i++)
		{
			//Hit platforms
			for(var p = 0; p < numOfPlatforms; p++)
			{
				while(platforms[p].hitTestPoint(enemyC[i].bottom()) && enemyC[i].vy >=0)
				{
					enemyC[i].y--;
					enemyC[i].vy = 0;
				} 
			}

			//Player Collision with top of EnemyC
			while(player.hitTestPoint(enemyC[i].top()) || player.hitTestPoint(enemyC[i].topLeft()) || player.hitTestPoint(enemyC[i].topRight()))
			{
				player.y--;
				player.canJump = true;
				if(!invincibleEnemy)
				{
					loseEnemyCHealth(i);
					console.log("EnemyC Health: " + enemyC[i].health);
				}
			}

			//Player Collision with EnemyC Left
			while(player.hitTestPoint(enemyC[i].left()))
			{
				player.x--;
				enemyC[i].vx = 0;
				if(!invincible)
				{
					losePlayerHealth();
					console.log("Player Health: " + player.health);
				}
			}
			//Player Collision with enemyC Right
			while(player.hitTestPoint(enemyC[i].right()))
			{
				player.x++;
				enemyC[i].vx = 0;
				if(!invincible)
				{
					losePlayerHealth();
					console.log("Player Health: " + player.health);
				}
			}

			//Enemy C Wall Collision
			if(enemyC[i].x < enemyC[i].width/2)
			{
				enemyC[i].x = enemyC[i].width/2;
			}
			if(enemyC[i].x > canvas.width - enemyC[i].width/2)
			{
				enemyC[i].x = canvas.width - enemyC[i].width/2;
			}

			if(enemyC[i].y < enemyC[i].height/2 && enemyC[i].health > 0)
			{
				enemyC[i].y = enemyC[i].height/2;
			}
			if(enemyC[i].y > canvas.height - enemyC[i].height/2)
			{
				enemyC[i].y = canvas.height - enemyC[i].height/2;
			}

			//Player Cracker Collision
			if(player.hitTestObject(cracker[i])) 
			{
				touchCracker(i);
			}

		}

		//Player hit platform 0
		while(platforms[0].hitTestPoint(player.bottom()) && player.vy >=0)
			{
				player.y--;
				player.vy = 0;
				player.canJump = true;
			} 

		//Player hit all platforms
		for(var p = 1; p < numOfPlatforms; p++)
		{
			while(platforms[p].hitTestPoint(player.bottom()) && player.vy >=0 && !s)
			{
				player.y--;
				player.vy = 0;
				player.canJump = true;
			} 
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

		if(player.y < player.height/2)
		{
			player.y = player.height/2;
		}
		if(player.y > canvas.height - player.height/2)
		{
			player.y = canvas.height - player.height/2;
		}

		//Update the Screen
		
		for(var p = 0; p < numOfPlatforms; p++)
		{
			platforms[p].drawRect();
		}

		player.drawRect();

		for(var i = 0; i < numOfEnemyB; i++)
		{
			enemyB[i].drawCircle();
			context.drawImage(imgCookie, cookie[i].x, cookie[i].y, cookie[i].width, cookie[i].height);
		}

		for(var i = 0; i < numOfEnemyC; i++)
		{
			enemyC[i].drawRect();
			context.drawImage(imgCracker, cracker[i].x, cracker[i].y, cracker[i].width, cracker[i].height);
		}

		//Player Health
		var hearts = [];
		for(var i = 0; i < player.health; i++)
		{
			if(i==0)
			{
				hearts[i] = new Heart();
				//hearts[i].drawRect();
				context.drawImage(imgHeart, hearts[i].x, hearts[i].y, hearts[i].width, hearts[i].height);
			}
			else
			{
				hearts[i] = new Heart();
				hearts[i].x = hearts[i-1].x + hearts[i].width + 10;
				//hearts[i].drawRect();
				context.drawImage(imgHeart, hearts[i].x, hearts[i].y, hearts[i].width, hearts[i].height);
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

function loseEnemyBHealth(i)
	{
		if (enemyB[i].health > 1 && player.health < 5)
		{
			enemyB[i].health -= 1; 
			enemyB[i].color = 'red';
			invincibleEnemy = true;
			clearTimeout(wait2);
			wait2 = setTimeout(makeNotInvincibleEnemy, 500);
		}
		else if (player.health >= 5)
		{
			enemyB[i].health -= 2; 
			enemyB[i].vy = 0;
			enemyB[i].y = -10000;
			console.log("Enemy 1 Died");
			cookie[i].x = enemyB[i].x;
			cookie[i].y = player.y - player.height;
		}
		else
		{
			enemyB[i].health -= 1; 
			enemyB[i].vy = 0;
			enemyB[i].y = -10000;
			console.log("Enemy 1 Died");
			cookie[i].x = enemyB[i].x;
			cookie[i].y = player.y - player.height;
		}
	}

function loseEnemyCHealth(i)
	{
		if (enemyC[i].health > 1 && player.health < 5)
		{
			enemyC[i].health -= 1; 
			enemyC[i].color = 'red';
			invincibleEnemy = true;
			clearTimeout(wait2);
			wait2 = setTimeout(makeNotInvincibleEnemy, 500);
		}
		else if (player.health >= 5)
		{
			enemyC[i].health -= 2; 
			enemyC[i].vy = 0;
			enemyC[i].y = -10000;
			console.log("Enemy 1 Died");
			cracker[i].x = enemyC[i].x;
			cracker[i].y = player.y - player.height;
		}
		else
		{
			enemyC[i].health -= 1; 
			enemyC[i].vy = -1;
			enemyC[i].y = -10000;
			console.log("Enemy 2 Died");
			cracker[i].x = enemyC[i].x;
			cracker[i].y = player.y - player.height;;
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

function touchCookie(i)
{
	cookie[i].y = -1000;
	if (player.health < 10)
	{
		player.health++;
	}
}

function touchCracker(i)
{
	cracker[i].y = -1000;
	if (player.health < 10)
	{
		player.health++;
	}
}

function gameOverScreen()
{
	gameOver = true;
	context.clearRect(0,0,canvas.width, canvas.height);	
	context.font = "bold 48px Arial";
	context.textAlign = "center";
	context.fillText("Game Over", canvas.width/2, canvas.height/2)
}