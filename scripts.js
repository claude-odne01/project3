let updatescore = document.getElementById('score');
let updatehighscore = document.getElementById('highscore');
let newhint = document.getElementById('hint1');
let newimage = document.getElementById('playerimage');
let winmsg = document.getElementById('winscript');
let winmsg1 = document.getElementById('winscript1');
let winmsg2 = document.getElementById('winscript2');
let winmsg3 = document.getElementById('winscript3');
let historymsg = document.getElementById('game1');
let historystring ='';

let randomnumber = generateRandomInteger(101);
let userGuess = document.getElementById('uGuess');

let score = document.getElementById('game1');
let userScore = 10;
let highScore = 0;
let scoreHistory = [];
let historyCtr = 0;
let hint = 1;

function resetGame () {
     
     if (userScore >= highScore) { 
          highScore = userScore;
     }
     
     let newRandomNumber = generateRandomInteger(100);
     randomnumber = newRandomNumber;
     
     document.getElementById("playerimage").src = "img/player.png";
     document.getElementById("uGuess").defaultValue = 1;
     
     alert( 'Generating a New Secret Number :)' );
     unlockGame();
     newhint.innerHTML = 'Guess a Number!';
     winmsg.innerHTML = '';
     winmsg1.innerHTML = '';
     winmsg2.innerHTML = '';
     winmsg3.innerHTML = '';
     historymsg.innerHTML = '';
     historystring='';
     userGuess.innerHTML='1';
     while(scoreHistory.length > 0) {
          scoreHistory.pop();
     }
     historyCtr=0;
     showFunction();

}
//  ********************************************      Main Game Loop     *******************************************************
//********************************************************************************************************************************** 
function verifyGuess() {
     userGuess = document.getElementById('uGuess');
     
     if( scoreHistory.includes(userGuess.value) ) {
          alert('Duplicate Guess')
     }
     else if ((userGuess.value == randomnumber)  ) {
          historyCtr++;
          scoreHistory.push(userGuess.value);
          update();
          lockGame();
          
          newhint.innerHTML = 'Good Guess!';
          winmsg.innerHTML = 'CONGRATULATIONS!';
          winmsg1.innerHTML = `Your guess was correct. <span style="font-size: 24px; font-weight: bold;">${randomnumber}</span> is my secret number.`;
          winmsg2.innerHTML = `<span style="font-size: 20px; font-weight: bold">Your Score: ${userScore}</span>`;
          winmsg3.innerHTML = `<span style="font-weight: bold;">High Score: ${highScore}</span>`;
          
          document.getElementById("playerimage").src = "img/win.jpg";
          hideFunction()

     }
     else {
          historyCtr++;
          scoreHistory.push(userGuess.value);
          userScore = userScore - 1;
          hint = randomnumber+2;
          if ( userScore > 1) {
               
               if(userGuess.value > randomnumber) {
                    newhint.innerHTML = `Your Guess was too HIGH. Guess Again! Hint: ${hint}`;
               }
               else {
                    newhint.innerHTML = `Your Guess was too LOW. Guess Again! Hint: ${hint}`;
               }
          }
          else {
               update();
               document.getElementById("playerimage").src = "img/loss.jpg";
               winmsg.innerHTML = 'Unfortunately you lost the game...';
               winmsg1.innerHTML = `Don't Give Up and Try Again. You can win next time.`;
               winmsg2.innerHTML = `My number was: <span style="font-size: 20px; font-weight: bold"> ${randomnumber}</span>`;
               winmsg3.innerHTML = `<span style="font-weight: bold;">High Score: ${highScore}</span>`;
               hideFunction();
               lockGame();
               
          }
     }
     
     updatescore.innerHTML = `Score: ${userScore}`;
  
     

     let ctr = 0;
     historystring='';
     while ( ctr < historyCtr )  {
          historystring += `<li> ${scoreHistory[ctr]}</li>`;
          ctr++;
     }
     
     historymsg.innerHTML = historystring;
}
//  ***************************************************************************************************************
// ****************************************************************************************************************

function generateRandomInteger (max) {
     return (Math.floor(Math.random() * max));
}

function lockGame() {
     document.getElementById("uGuess").disabled = true;
     document.getElementById("guessBtn").disabled = true;
} 

function unlockGame() {
     userScore = 10;

     updatescore.innerHTML = `Score: ${userScore}`;

     document.getElementById("uGuess").disabled = false;
     document.getElementById("guessBtn").disabled = false;
}

function update() {
     if (userScore > highScore) {
          highScore = userScore;
          updatehighscore.innerHTML = `High Score: ${highScore}`;
     }
}

function hideFunction() {
     var x = document.getElementById("guessBtn");
     if (x.style.display === "none") {
          x.style.display = "block";
          x.style.justifyContent = "center";
     } else {
          x.style.display = "none";
     }
}

function showFunction() {
     var x = document.getElementById("guessBtn");
     if (x.style.display === "none") {
          x.style.display = "block";
          x.style.justifyContent = "center";
     }
}

guessBtn.addEventListener('click', verifyGuess);
resetBtn.addEventListener('click', resetGame);