// ============================================================================================
// EE276 Final Project Main File
// Contributors: Calvin Lin, Katherine Kowalski, Yasmeen Jassim
// File: main.js
// 
// 
// This file handles backend processes of the game. Specifically it turns all words into
// their respective binary value.
// ============================================================================================
window.onload = function (e) {
    console.log("==window loaded==");
    
    function Player(name, totalScore) {
        console.log("==Player==");
        this.name = name;
        this.totalScore = totalScore;
    };

    var game = {

        playerArray: [],
        currentPlayer: 0,
        round: 1,
        wordArray: ["TSACHY", "WEISSMAN", "KASIA", "YASMEEN", "SHUBHAM", "CALVIN"],
        binaryArray: [],
        //wheelArray: ["BANKRUPT", "TRUNCATE", "FLIP", "UNFLIP","SKIP", "ADD", "SUBTRACT"],
        currentWord: "",
        currentValue: "",


        activateButtons: function() {
            console.log("==activateButtons==");
            $('#startGame').on('click', game.checkUser);
        },

        checkUser: function() {
            console.log("==checkUser==");
            if ($('#userName_1').val()) {
              game.makePlayers();
            } else {
              alert("Please enter a name for player one.")
            }
        },

        makePlayers: function() {
            console.log("==makePlayers==");
            $('#startModal').css("display", "none");
            var playerOneName = $('#userName_1').val()
            var playerTwoName = $('#userName_2').val()
            var playerThreeName = $('#userName_3').val()
            $('#player_1').text(playerOneName);
            $('#player_1').css("color", "#FB6542");
            var playerOne = new Player(playerOneName, 0);
            game.playerArray.push(playerOne);
            if (playerTwoName) {
              $('#player_2').text(playerTwoName);
              var playerTwo = new Player(playerTwoName, 0);
              game.playerArray.push(playerTwo);
            };
            if (playerThreeName) {
              $('#player_3').text(playerThreeName);
              var playerThree = new Player(playerThreeName, 0);
              game.playerArray.push(playerThree);
            };
            console.log("game.playerArray", game.playerArray);
            game.loadPuzzle();
        },


        loadPuzzle: function() {
            console.log("==loadPuzzle==");
            var randomPhrase = game.wordArray[Math.floor(Math.random() * game.wordArray.length)];
            game.currentWord = randomPhrase;
            $('#gameDisplay').empty();
            for (var i = 0; i < game.currentWord.length; i++) {
              
                var letter_hash = new Object(); //Maps letters to binary value
                var currentLetter;    

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


                if (game.currentWord[i] != " ") {
                    currentLetter = letter_hash[game.currentWord[i]];
                    game.binaryArray.push(currentLetter);
                } 
                

                $('#gameDisplay').append("<div class='highlightLetter' id='letter_" + i + "'> <p class='individualLetter'>" + currentLetter + "</p> </div>");
                if (currentLetter == " ") {
                    console.log("blank");
                    $('#letter_' + i).css("border-color", "#eee");
                }
            };
            $('#enterLetter').val("");
            game.awaitingButton();
            console.log("game.currentWord", game.currentWord);
            console.log(game.binaryArray)
        },

        awaitingButton: function () {
            $('#bankrupt').on('click', game.bankrupt);
            $('#truncate').on('click', game.truncate);
            $('#bitflip').on('click', game.flip);
            $('#bitflipecc').on('click',game.flipecc);
            $('#bitflipbitrep').on('click',game.bitrep);
            $('#incrbitrate').on('click', game.incrbitrate);
            $('#skip').on('click', game.skip);
        },

        checkLetter: function(guessedLetter){
            console.log("==checkLetter==");
            var guessedLetter = $('#enterLetter').val();
            console.log(guessedLetter);
            if (guessedLetter.length != 0) {
              var letterCount = 0;
              for (var i = 0; i < game.binaryArray.length; i++) {
                if (game.binaryArray[i] == guessedLetter) {
                  $('#letter_' + i + '> p').css("visibility", "visible");
                  letterCount++;
                } else {
                  console.log("==checkNextLetter==");
                }
              }
              if (letterCount == 0) {
                game.currentPlayer = game.currentPlayer + 1;
                if (game.currentPlayer == game.playerArray.length) {
                  game.currentPlayer = 0;
                }
              }
            }
            console.log("game.currentPlayer", game.currentPlayer);
        },

        addScore: function(){
            var guessedLetter = $('#enterLetter').val();
            game.checkLetter(guessedLetter);
            var pointsToAdd = $('#add').val();
            console.log("==AddScore==");
            if (game.currentPlayer == 0){
              game.playerArray[0].totalScore += pointsToAdd; // adding the score per number of letters
              console.log(game.playerArray[2].totalScore);
              $('#totalScore_1').text(totalScore);
            };
            if (game.currentPlayer == 1){
              game.playerArray[1].totalScore += pointsToAdd;
              $('#totalScore_2').text(totalScore);
            };
            if (game.currentPlayer == 2){
              game.playerArray[2].totalScore += pointsToAdd;
              $('#totalScore_3').text(totalScore);
            };
            game.awaitingButton();
        },

        bankrupt: function(){
            console.log("==bankrupt==");
            if (game.currentPlayer == 0){
              $('#total_score1').text(0);
              game.currentPlayer = game.currentPlayer + 1;
              if (game.currentPlayer == game.playerArray.length) {
                game.currentPlayer = 0;
              };
            };
            if (game.currentPlayer == 1){
              $('#total_score2').text(0);
              game.currentPlayer = game.currentPlayer + 1;
              if (game.currentPlayer == game.playerArray.length) {
                game.currentPlayer = 0;
              };
            };
            if (game.currentPlayer == 2){
              $('#total_score3').text(0);
              game.currentPlayer = game.currentPlayer + 1;
              if (game.currentPlayer == game.playerArray.length) {
                game.currentPlayer = 0;
              };
            };
            game.awaitingButton();
        },

        
        flipecc: function () {
            console.log("==Bit Flip + ECC==");
        },

        bitrep: function() {
            console.log("==Bit Flip + Bit Repetition");
        },

        incrbitrate: function () {
            console.log("==Bit Flip + Bit Repetition");
        },

        truncate: function() {
            console.log("==truncate==");
        },

        flip: function() {
            console.log("==flip==");
        },
        
        skip: function () {
            console.log("==skip==");
        },
    }





// ============================================================================================
// Helper Functions
// ============================================================================================
// String.prototype.replaceAt=function(index, replacement) {
//     return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
// }
// // Function to generate random number  
// function randomNumber(min, max) {  
//     return Math.random() * (max - min) + min; 
// } 

// ============================================================================================
// Here are the functions of Negative consequences
// ============================================================================================
// function truncateBits(input, numTruncate) { 
//     //INPUT: guessed letter in encoding
//     //OUTPUT: modified letter in bits
//     return truncateString(input, numTruncate)


// }

// function flipBit(input) {
//     var number = parseInt(input);
//     //random number from 1-length input
//     var num = randomNumber(0, input.length);
//     //flip bit
//     return input.replaceAt(num, ((parseInt(input(num)) + 1) % 2).toString()); 
// }

// ============================================================================================
// Here are the functions of Positive consequences
// ============================================================================================
// function bitRepetition(guess, x) { 
//     //repeat each bit x times
//     //take most plausible outcome
//     //return
//     //make x>2 so you can always reconstruct the guess
//     return guess


// }

// function ECC(input, bitToCorrect) { //error correcting code, bits are 0 indexed!
//     var number = parseInt(input);
//     //flip bit
//     return input.replaceAt(bitToCorrect, ((parseInt(input(num)) + 1) % 2).toString()); 
// }

// function knownChannel() { //error correcting code
    
// }


// function addPoints(currPoints, netGain) {
//     return currPoints + netGain;
// }

// function endGame() {
//     state = "END_GAME";
// }


    Player();
    game.activateButtons();
};