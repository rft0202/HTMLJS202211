//Define Booleans for each key
var w = false;
var s = false;

var up = false;
var down = false;

//Add Event Listeners
/* //advanced controls
document.addEventListener("keydown", function(e){
	keys[String.fromCharCode(e.keyCode)]=true;
	console.log(keys);
}); 
document.addEventListener("keyup", function(e){keys=[]}); 
*/
document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

document.addEventListener("keydown", press2);
document.addEventListener("keyup", release2);

//Event Functions
//Player 1 Controls
function press(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Pressed" + e.keyCode);
	
	if(e.keyCode == 87)
	{
		w = true;
	}
	if(e.keyCode == 83)
	{
		s = true;
	}
}

function release(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Released" + e.keyCode);
	
	if(e.keyCode == 87)
	{
		w = false;
	}
	if(e.keyCode == 83)
	{
		s = false;
	}
}

//Player 2 Controls
function press2(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Pressed" + e.keyCode);
	
	if(e.keyCode == 38)
	{
		up = true;
	}
	if(e.keyCode == 40)
	{
		down = true;
	}
}

function release2(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Released" + e.keyCode);
	
	if(e.keyCode == 38)
	{
		up = false;
	}
	if(e.keyCode == 40)
	{
		down = false;
	}
}