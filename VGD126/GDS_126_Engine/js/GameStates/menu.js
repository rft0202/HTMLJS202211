/*---------------------------------
This file contains all of the code for the Main Menu
----------------------------------*/

//var startButton = new GameObject({width:200}); //put .makeSprite(buttonData) after last yellow parentheses)
var startButton = new GameObject({width:100}).makeSprite(buttonData);
//startButton.img.src="images/mrt.jpg"
//startButton.width=200;
startButton.hitBoxWidth=800
console.log(startButton.collisionPoints.right)


var menuBackground = new GameObject();
menuBackground.img.src = "images/menu.png"
menuBackground.width=canvas.width
menuBackground.height=canvas.height

gameStates[`menu`] =function(){

	//Makes the button clickable
	if(startButton.overlap(mouse))
	{
		if(mouse.pressed)
		{
			//Changes to the game state
			gameStates.changeState(`level1`)
		}

		//Hover Effect Graffic
		//startButton.color = `yellow`
		startButton.changeState(`hover`)
	}
	else
	{
		//Default Button Graphic
		startButton.changeState(`idle`)
	}
	
	menuBackground.drawStaticImage();
	//startButton.render().drawSprite()
	startButton.play(function(){return}).drawSprite()
}
	
	
