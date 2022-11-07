var shapes = new Image();
shapes.src = "images/shapes.png";

shapes.onload = function(){
    ctx.drawImage(shapes, 800, 800, 0, 0)
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

//Rectangle style
ctx.fillStyle = "yellow";
ctx.strokeStyle = "black";
ctx.lineWidth = "5";

//Rectangle
ctx.fillRect(85,302,100,100);
ctx.strokeRect(85,302,100,100);

//Line style
ctx.fillStyle = "none";
ctx.strokeStyle = "rgb(255,0,0)";
ctx.lineWidth = "5";

//Line
ctx.beginPath();
ctx.moveTo(85,682);
ctx.lineTo(278,549);
ctx.stroke();

//Circle style
ctx.fillStyle = "#ffff00";
ctx.strokeStyle = "red";
ctx.lineWidth = "5";

//Circle
ctx.beginPath();
ctx.arc(385,441, 67, 0, (3 * Math.PI),false);
ctx.closePath();
ctx.fill();
ctx.stroke();