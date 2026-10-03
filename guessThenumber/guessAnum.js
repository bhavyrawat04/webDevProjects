let randNum = parseInt(Math.random()*100+1);

const submitButton = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrhi');
const StartOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
    submitButton.addEventListener('click',function(e){
        e.preventDefault(); //preventing the event listener to sending the value to server
        //or it's default behaviour
        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    //use to validate the input
    if(isNaN(guess)){
        alert('Please enter a valid number');
    } else if(guess<1){
        alert('Please enter a valid number more than 1');
    } else if(guess>100){
        alert('Please enter a valid number less than 100');
    } else{
        prevGuess.push(guess);//pushing the previous guesses to the arr
        if(numGuess === 10){
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randNum}`)
            endGame()
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }

}

function checkGuess(guess){
    //checking the guess value if it is low or hi
    if(guess === randNum){
        displayMessage(`You guessed it right genius!!`);
        endGame();
    } else if(guess<randNum){
        displayMessage(`Number is too low`);
    }else if(guess>randNum){
        displayMessage(`Number is too high`);
    }
}

function displayGuess(guess){
    //cleans the value and the updates guess arrays
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11-numGuess}`
}

function displayMessage(message){
    //dispplayin the message or interaction with dom
    lowOrHi.innerHTML = `<h2>${message}</h2>`;

}

function newGame(){
    //starting newGame
    const newGameButton = document.querySelector('#newGame');

    newGameButton.addEventListener('click',function(e){
     randNum = parseInt(Math.random()*100+1);
     prevGuess = [];
     numGuess = 1;
     guessSlot.innerHTML = '';
     remaining.innerHTML = `${11-numGuess}`;
     lowOrHi.innerHTML = '';
     userInput.removeAttribute('disabled')
     StartOver.removeChild(p);

     playGame = true;
    })

}

function endGame(){
    //end game
    userInput.value = '';
    userInput.setAttribute('disable','');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    StartOver.appendChild(p);
    playGame = false;
    newGame()
}