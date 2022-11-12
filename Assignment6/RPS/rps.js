//canvas drawing stuff
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

//drawing the fonts
ctx.font = "40px Trebuchet MS";
ctx.fillStyle = "purple";
ctx.strokeStyle = "blue";
ctx.fillText("Welcome to the RPS Game!", 132, 100);
ctx.strokeText("Welcome to the RPS Game!", 132, 100);
//original: 125, 280

//alert("Select rock, paper, or scissors.");
var rps = ["rock","paper","scissors"];
//console.log(rps[2]);

document.getElementById("rock").addEventListener('click',function(e){
    arguments;ctx.clearRect(0, 0, canvas.width, canvas.height);ctx.fillText("You picked " + rps[0] + "!", 250, 200);
    playGame(rps[0]);
});
document.getElementById("paper").addEventListener('click',function(e){
    arguments;ctx.clearRect(0, 0, canvas.width, canvas.height);ctx.fillText("You picked " + rps[1] + "!", 230, 200);
    playGame(rps[1]);
});
document.getElementById("scissors").addEventListener('click',function(e){
    arguments;ctx.clearRect(0, 0, canvas.width, canvas.height);ctx.fillText("You picked " + rps[2] + "!", 210, 200);
    playGame(rps[2]);
});

function playGame(playerChoice){
    var cpuChoice = Math.floor(Math.random() * 2.99);
    console.log(cpuChoice, playerChoice);

    switch(playerChoice){
        case "rock":
            if(cpuChoice == 0){
                //rock
                ctx.fillText("CPU chose Rock. It's a tie!", 180, 300);
            }
            else if(cpuChoice == 1){
                //paper
                ctx.fillText("CPU chose Paper. You lose!", 180, 300);
            }
            else{
                //scissors
                ctx.fillText("CPU chose Scissors. You win!", 180, 300);
            }

            break;

        case "paper":
            if(cpuChoice == 0){
                //rock
                ctx.fillText("CPU chose Rock. You win", 180, 300);
            }
            else if(cpuChoice == 1){
                //paper
                ctx.fillText("CPU chose Paper. It's a tie!", 180, 300);
            }
            else{
                //scissors
                ctx.fillText("CPU chose Scissors. You lose!", 180, 300);
            }
            
            break;

        case "scissors":
            if(cpuChoice == 0){
                //rock
                ctx.fillText("CPU chose Rock. You lose!", 180, 300);
            }
            else if(cpuChoice == 1){
                //paper
                ctx.fillText("CPU chose Paper. You win!", 180, 300);
            }
            else{
                //scissors
                ctx.fillText("CPU chose Scissors. It's a tie!", 180, 300);
            }
            
            break;
    }
}