/*----------------------------------------------
This file contains the data used to render the player's sprites
Properties:
	Object: info | information about the sprite file
		String: info.src | The location of the spritesheet
	Object: states | contains the data for each animation state
		Object: [`state name`] | The data used to render the idle state
			Number: fps | The frame rate in which to render the animation
			Boolean: cycle | Whether or not the animation will loop
			Array: frames| Contains objects with geometric data for each frame of animtati.
					Must contain at least one frame object.
					The animation will run for however many frame objects are added to the array
				Object: [index number] | A frame of animation
					Number: width | the actual 1/1 horizontal size of the portion of image file to be rendered
					Number: height | the actual 1/1 vertical size of the portion of image file to be rendered
					Number: startX | the horizontal starting point of the portion of image file to be rendered
					Nunber: startY | the vertical starting point of the portion of image file to be rendered
/*----------------------------------------------*/

var playerData ={
	info:{
		src:`images/marinasprites.png`
	},
	states:{
		//The idle animation 
    	idle:
		{
			fps:10,
			cycle:true,
			frames:
			[
				{width:78, height:128, startX:0, startY:0},
				{width:78, height:128, startX:78, startY:0},
				{width:78, height:128, startX:156, startY:0},
				{width:78, height:128, startX:78, startY:0},
				
			]
		},
		//The walwidth:78, height:128,
		walk:
		{
			fps:3,
			cycle:true,
			frames:
			[
				//{width:78, height:128, startX:0, startY:0},
				{width:78, height:128, startX:234, startY:0},
				{width:78, height:128, startX:312, startY:0},
				{width:78, height:128, startX:390, startY:0},
				{width:78, height:128, startX:468, startY:0}
			]
		},
		//The jump animation 
		jump:
		{
			fps:15,
			cycle:false,
			frames:
			[
				{width:78, height:128, startX:546, startY:0}
			]
		},
		//The crouch animation 
		crouch:
		{
			fps:15,
			cycle:true,
			frames:
			[
				{width:78, height:128, startX:624, startY:0}
				/*{width:78, height:128, startX:768, startY:0},
				{width:78, height:128, startX:768, startY:0},
				{width:78, height:128, startX:768, startY:0},
				{width:78, height:128, startX:896, startY:0}*/
			]
		},
		//The attack animation 
		attack:
		{
			fps:3,
			cycle:false,
			//width:300,
			frames:
			[
				{width:100, height:128, startX:702, startY:0}/*,
				{width:100, height:128, startX:1024, startY:0},
				{width:100, height:128, startX:1024, startY:0},
				{width:100, height:128, startX:1152, startY:0},
				{width:100, height:128, startX:1152, startY:0},
				{width:100, height:128, startX:1152, startY:0},
				{width:100, height:128, startX:1152, startY:0}*/
				
			]
		}
	}
		
}