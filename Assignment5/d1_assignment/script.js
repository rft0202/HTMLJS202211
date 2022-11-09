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
ctx.moveTo(85,685);
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
//Polygon style
ctx.fillStyle = "#ff00ff";
ctx.strokeStyle = "#00ffff";
ctx.lineWidth = "5";

//Polygon
ctx.beginPath();
ctx.moveTo(556,307);
ctx.lineTo(667,284);
ctx.lineTo(724,380);
ctx.lineTo(651,464);
ctx.lineTo(548,420);
ctx.closePath();
ctx.fill()
ctx.stroke();

//Star style
ctx.fillStyle = "#ffff00";
ctx.strokeStyle = "rgb(32,32,32)";
ctx.lineWidth = "5";

//Star
ctx.beginPath();
ctx.moveTo(635,496);
ctx.lineTo(668,554);
ctx.lineTo(733,566);
ctx.lineTo(688,615);
ctx.lineTo(696,681);
ctx.lineTo(635,653);
ctx.lineTo(575,681);
ctx.lineTo(583,615);
ctx.lineTo(538,566);
ctx.lineTo(603,554);
ctx.closePath();
ctx.fill()
ctx.stroke();