// JavaScript Document
function Ball()
{
	//ball's location
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	
	//ball's dimensions
	this.width = 100;
	this.height = 100;
	
	//ball's velocity or speed on each axis
	this.vx = 0;
	this.vy = 0;
	
	//ball's color
	this.color = "#502a7f";
	
	//This draws the ball to the screen
	this.draw = function()
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
	
	//This changes the ball's position
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}
}
