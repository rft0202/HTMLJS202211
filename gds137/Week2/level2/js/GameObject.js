// JavaScript Document
function GameObject()
{
	//object's location
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	
	//object's dimensions
	this.width = 100;
	this.height = 100;
	
	//object's velocity or speed on each axis
	this.vx = 0;
	this.vy = 0;
	
	//object's color
	this.color = "#502a7f";
	
	//This draws the object to the screen
	this.drawCircle = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			//context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
            context.beginPath();
            context.arc(0,0,this.width/2,0,360*Math.PI/180,true)
            context.closePath();
            context.fill();
		context.restore();
		
	}	

	this.drawRect = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
			context.beginPath();
			//context.arc(0,0,this.width/2,0,360*Math.PI/180,true)
			context.closePath();
			context.fill();
		context.restore();
	}
	
	//This changes the object's position
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}
}
