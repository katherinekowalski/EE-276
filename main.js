// ============================================================================================
// EE276 Final Project Main File
// Contributors: Calvin Lin, Katherine Kowalski, Yasmeen Jassim
// File: main.js
// 
// 
// This file handles backend processes of the game. Specifically it turns all words into
// their respective binary value.
// ============================================================================================

var guess_words = [
    "HELLO",
    "WORLD",
    "TSACHY",
    "WEISMANN",
    "KATHERINE",
    "YASMEEN",
    "CALVIN"
]

var letter_hash = new Object(); //Maps letters to binary value
let encodedWord = [];           //Array of binary values for each letter in word
let all_guesses = [];           //Tracks all guessed inputs
let correct_guesses = [];       //Tracks all correct guesses
let answer = '';                //The final answer
var input = '';                 //User input

var game_states = [
    "START_GAME",
    "START_OF_TURN",
    "END_OF_TURN",
    "END_GAME"
]

letter_hash.E = '100';
letter_hash.T = '111';
letter_hash.A = '0000';
letter_hash.O = '0001';
letter_hash.I = '0011';
letter_hash.N = '0100';
letter_hash.S = '0110';
letter_hash.R = '1010';
letter_hash.H = '1101';
letter_hash.L = '00100';
letter_hash.D = '00101';
letter_hash.C = '01011';
letter_hash.U = '01110';
letter_hash.M = '10110';
letter_hash.F = '10111';
letter_hash.P = '11001';
letter_hash.G = '010100';
letter_hash.W = '010101';
letter_hash.Y = '011110';
letter_hash.B = '011111';
letter_hash.V = '110001';
letter_hash.K = '1100001';
letter_hash.X = '11000001';
letter_hash.J = '110000001';
letter_hash.Q = '1100000000';
letter_hash.Z = '1100000001';


function convertWord(answer) {
    for (let i = 0; i < answer.length; i++) {
        encodedWord.push(letter_hash[answer[i]]);
    }
    console.log(encodedWord);
    console.log(answer);
}

let state = '';



function chooseWord() {
    answer = guess_words[Math.floor(Math.random() * guess_words.length)];
    convertWord(answer);
}

//function generateButtons() {
//    let buttonsHTML = '10'.split('').map(letter => 


//}   
function initializeGame() {
    chooseWord();
    state = "START_GAME";
}


function getInput() {
    state = "START_OF_TURN";
    while (state != "CHECK_LETTER") {
        if (state = "START_OF_TURN") {
            input = window.prompt("Enter your guess in binary: ");
        } else {
            input = window.prompt("That letter has been all_guesses. Guess again: ");
        }
        for (let i = 0; i < answer.length; i++) {
            if (input != all_guesses[i]) {
                state = "CHECK_LETTER";
            } else {
                state = "GUESS_AGAIN";
            }
        }
    }
    console.log(input);
    all_guesses.push(input);
}

function checkAndUpdateWord() {
    for (let i = 0; i < answer.length; i++) {
        //change display
        //
    }
}

// ============================================================================================
// Here are the functions of consequences
// ============================================================================================
function truncateBits() { 
    //INPUT: guessed letter in encoding
    //OUTPUT: modified letter in bits

}

function flipBit() {

}


function addPoints() {

}

function endGame() {
    state = "END_GAME";
}



//Function calls
initializeGame();
while (state != "END_GAME") {
    getInput();
    checkAndUpdateWord();
    endGame();
}