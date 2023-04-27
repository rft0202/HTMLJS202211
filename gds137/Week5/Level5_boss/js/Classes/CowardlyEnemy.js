function CowardlyEnemy(obj)
{	
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.width = 50;
		this.height = 50;
		this.color = "darkorange";
		this.force = 0.5;
		this.ax = 1;
		this.ay = 1;
		this.vx = 0;
		this.vy = 0;
		this.health = 100;

		//whether or not the object can jump
		this.canJump = false;
		this.jumpHeight = -25;

		//------Allows us to pass object literals into the class to define its properties--------//
		//------This eliminate the need to pass in the property arguments in a specific order------------//
		if(obj!== undefined)
		{
			for(value in obj)
			{
				if(this[value]!== undefined) //if not undefined
				this[value] = obj[value]; //change it to the value in basic_platformer.js
			}
		}

	this.drawRect = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
		context.restore();
		
	}	
	
	this.drawCircle = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.beginPath();
			context.translate(this.x, this.y);
			context.arc(0,0,this.width/2,0,360*Math.PI/180,true)
			context.closePath();
			context.fill();
		context.restore();
		
	}	
	
	this.move = function()
	{
		this.vx += -this.ax * this.force;
		if(this.x > player.x) //player is to the left of enemy
		{
			this.x -= this.vx;
		}
		else
		{
			this.x += this.vx;
		}
		//this.y += this.vy;
	}
	
	this.flee = function()
	{
		var dx = player.x - this.x; //how many pixels apart y
		var dy = player.y - this.y; //how many pixels apart x
		var rad = Math.atan2(dy,dx); //angle of triangle
		this.vx += Math.sin(rad)*1; //force
		//this.vy *= .97; //friction
		var dist = Math.sqrt(dx*dx + dy*dy) //hypotenuse
		if (dist < 300)
		{
			this.move();
			//console.log(this.x + ", " + this.y);
		}
	}
	
	//---------Returns object's for the top, bottom, left and right of an object's bounding box.
	this.left = function() 
	{
		return {x:this.x - this.width/2 , y:this.y}
	}
	this.right = function() 
	{
		return {x:this.x + this.width/2 , y:this.y}
	}
	
	this.topLeft = function()
	{
		return {x:this.left().x, y: this.top().y}
	}
	this.topRight = function()
	{
		return {x:this.Right().x, y: this.top().y}
	}
	this.top = function() 
	{
		return {x:this.x, y:this.y - this.height/2}
	}
	this.bottom = function() 
	{
		return {x:this.x , y:this.y + this.height/2}
	}
	this.bottomLeft = function()
	{
		return {x: this.left().x, y: this.bottom().y}
	}
	this.bottomRight = function()
	{
		return {x: this.right().x, y: this.bottom().y}
	}
	
	this.hitTestObject = function(obj)
	{
		if(this.left().x <= obj.right().x && 
		   this.right().x >= obj.left().x &&
		   this.top().y <= obj.bottom().y &&
		   this.bottom().y >= obj.top().y)
		{
			return true
		}
		return false;
	}
		
	//------Tests whether a single point overlaps the bounding box of another object-------
	this.hitTestPoint = function(obj)
	{
		if(obj.x >= this.left().x && 
		   obj.x <= this.right().x &&
		   obj.y >= this.top().y &&  
		   obj.y <= this.bottom().y)
		{
			return true;
		}
		return false;
	}
	
	//Draws the collision points
	this.drawDebug = function()
	{
		var size = 5;
		context.save();
		context.fillStyle = "black";
		context.fillRect(this.left().x-size/2, this.left().y-size/2, size, size);
		context.fillRect(this.right().x-size/2, this.right().y-size/2, size, size);
		context.fillRect(this.top().x-size/2, this.top().y-size/2, size, size);
		context.fillRect(this.bottom().x-size/2, this.bottom().y-size/2, size, size);
		context.fillRect(this.x-size/2, this.y-size/2, size, size);
		context.restore();
	}
}