//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;
var enemy1;

var p1Wins = 0;
var p2Wins = 0;

var img=document.getElementById("ric");

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate Player 1
	player = new GameObject();
	player.x = 0;
	player.y = canvas.height/2;
	player.width = 20;
	player.height = 125; 
	player.color = 'mediumslateblue';

	//Instantiate Enemy 1
	enemy1 = new BraveEnemy();
	enemy1.x = canvas.width;
	enemy1.y = canvas.height/2;
	enemy1.width = 20;
	enemy1.height = 125; 
	enemy1.color = 'lightseagreen';

	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	

	//Move Player 1 (left)
	if(w)
	{
		console.log("Moving Up");
		player.y += -3;
	}
	if(s)
	{
		console.log("Moving Down");
		player.y += 3;
	}
	if(a)
	{
		console.log("Moving Left");
		player.x += -3;
	}
	if(d)
	{
		console.log("Moving Right");
		player.x += 3;
	}
	
	 //FOR OWN GAME
	//Player 2 AI - Hit the Ball
	var dx = player.x - enemy1.x; //how many pixels apart y
	var dy = player.y - enemy1.y; //how many pixels apart x
	var rad = Math.atan2(dy,dx); //angle of triangle
	enemy1.vy += Math.sin(rad)*1; //force
	enemy1.vy *= .97; //friction
	var dist = Math.sqrt(dx*dx + dy*dy) //hypotenuse
	if (dist < 100)
	{
		enemy1.move();
	}
	
	/*
	//Player 2 AI - Run away from the Ball
	var dx = ball.x - player2.x; //how many pixels apart y
	var dy = ball.y - player2.y; //how many pixels apart x
	var rad = Math.atan2(dy,dx); //angle of triangle
	player2.vy += Math.sin(rad)*-1; //force //negative 1 makes it run away
	player2.vy *= .97; //friction
	var dist = Math.sqrt(dx*dx + dy*dy) //hypotenuse
	if (dist < 200)
	{
		player2.move();
	}
	*/

	//Player 1 Wall Collision
	if(player.y < player.height/2)
	{
		player.y = player.height/2;
	}
	if(player.y > canvas.height - player.height/2)
	{
		player.y = canvas.height - player.height/2;
	}

	//Player 2 Wall Collision
	if(enemy1.y < enemy1.height/2)
	{
		enemy1.y = enemy1.height/2;
	}
	if(enemy1.y > canvas.height - enemy1.height/2)
	{
		enemy1.y = canvas.height - enemy1.height/2;
	}

	//Update the Screen
	player.drawRect();
	enemy1.drawCircle();
	
}
