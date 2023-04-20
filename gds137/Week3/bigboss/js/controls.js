//Define Booleans for each key
var a = false;
var d = false;

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

//Event Functions
//Player Controls
function press(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Pressed" + e.keyCode);
	
	if(e.keyCode == 65)
	{
		a = true;
	}
	if(e.keyCode == 68)
	{
		d = true;
	}
}

function release(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Released" + e.keyCode);
	
	if(e.keyCode == 65)
	{
		a = false;
	}
	if(e.keyCode == 68)
	{
		d = false;
	}
}
