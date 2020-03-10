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
// ============================================================================================
// Helper Functions
// ============================================================================================
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

var game = {

        playerArray: [],
        currentPlayer: 0,
        round: 1,
        wordArray: ["TSAACHY", "WEISSMAN", "KASIA", "YASMEEN", "SHUBHAM", "CAALVIN"],
        binaryArray: [],
        guessedArray: [],
        guessCount: 0,
        currentWord: "",
        currentValue: "",
        correctLetterCount: 0,
        newGuess: true,


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

        highlightPlayer: function() {
            console.log("==highlightPlayer==");
            if (game.currentPlayer == 0){
              $('#player_1').css("color", "#FB6542");
          } else {
              $('#player_1').css("color", "#000");
          };
          if (game.currentPlayer == 1){
              $('#player_2').css("color", "#FB6542");
          } else {
              $('#player_2').css("color", "#000");
          };
          if (game.currentPlayer == 2){
              $('#player_3').css("color", "#FB6542");
          } else {
              $('#player_3').css("color", "#000");
          };
      },

      awaitingButton: function () {
            //<button onclick="game.addScore">Click me</button>
            add.onclick = function() {game.addScore("")}
            bankrupt.onclick = function() {game.bankrupt()}
            truncate.onclick = function() {game.truncate($('#enterLetter').val(), 2)}
            flip.onclick = function() {game.flip($('#enterLetter').val())}
            flipecc.onclick = function() {game.flipecc($('#enterLetter').val())}
            bitrep.onclick = function() {game.bitrep($('#enterLetter').val())}
            incrbitrate.onclick = function() {game.incrbitrate($('#enterLetter').val())}
            skip.onclick = function() {game.skip()}
        },

        checkLetter: function(guessedLetter){
            console.log("==checkLetter==");
            console.log(guessedLetter);
            this.correctLetterCount = 0;
            if (guessedLetter.length != 0) {

                var newGuess = true;

                for (var i = 0; i < game.binaryArray.length; i ++) {
                    if (game.guessedArray[i] == guessedLetter) {
                        alert("You have already guessed this! Guess again.");
                        game.newGuess = false;
                        return false;
                    }
                }

                
                game.guessedArray.push(guessedLetter);

                for (var i = 0; i < game.binaryArray.length; i++) {
                    if (game.binaryArray[i] == guessedLetter) {
                        $('#letter_' + i + '> p').css("visibility", "visible");
                        this.correctLetterCount++;
                    } else {
                        game.guessCount = game.guessCount + 1;
                        console.log("==checkNextLetter==");
                    }
                }


                if (this.correctLetterCount > 0) {
                    return true;
                }
            }
            return false;
        },

        addScore: function(input){
            var guessedLetter = $('#enterLetter').val();
            if(input.length != 0) {
                guessedLetter = input;
            }
            var correctGuess = game.checkLetter(guessedLetter);
            var pointsToAdd = $('#score').val();
            console.log("==AddScore==");
            console.log(pointsToAdd);
            if (game.currentPlayer == 0 && correctGuess) {
                game.playerArray[0].totalScore = (Number(game.playerArray[0].totalScore) + Number(pointsToAdd)*Number(game.correctLetterCount)).toString();
                $('#totalScore_1').text(game.playerArray[0].totalScore);
            }
            else if (game.currentPlayer == 1 && correctGuess) {
                game.playerArray[1].totalScore = (Number(game.playerArray[1].totalScore) + Number(pointsToAdd)*Number(game.correctLetterCount)).toString();
                $('#totalScore_2').text(game.playerArray[1].totalScore);
            }
            else if (game.currentPlayer == 2 && correctGuess) {
                game.playerArray[2].totalScore = (Number(game.playerArray[2].totalScore) + Number(pointsToAdd)*Number(game.correctLetterCount)).toString();
                $('#totalScore_3').text(game.playerArray[2].totalScore);
            }
            if (game.newGuess) {
                game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length;
            }
            game.newGuess = true;
            console.log("game.currentPlayer", game.currentPlayer);

            game.highlightPlayer();
            game.awaitingButton();
        },

        bankrupt: function(){
            console.log("==bankrupt==");
            if (game.currentPlayer == 0){
              $('#total_score1').text(0);
          };
          if (game.currentPlayer == 1){
              $('#total_score2').text(0);
          };
          if (game.currentPlayer == 2){
              $('#total_score3').text(0);
          };

            //game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length;
            game.awaitingButton();
        },

        flipecc: function (guess) {
            console.log("==Bit Flip + ECC==");
            if(game.checkLetter(guess)) {
                game.addScore(guess);
            }
            game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length; 
        },

        bitrep: function(guess) {
            console.log("==Bit Flip + Bit Repetition==");
            if(game.checkLetter(guess)) {
                game.addScore(guess);
            }
            game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length; 

        },

        incrbitrate: function (input) { //get 2 guesses
            console.log("==incr bit rate==");
            var partial="";
            var letter1;
            var letter2;
            var L1 = false;
            var L2 = false;
            for (var i = 0; i < input.length; i++) {
                if (game.binaryArray.includes(partial) && !L1) {
                    letter1 = partial;
                    letter2 = input.substr(i, input.length);
                    break;
                } 
                else{
                    partial = partial.concat(input.charAt(i));
                }
            }
            console.log(letter1)
            console.log(letter2)
            if(game.checkLetter(letter1)) {
                game.addScore(letter1);
            }
            if(game.checkLetter(letter2)) {
                game.addScore(letter2);
            }
            
            game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length;
        },

        truncate: function(input, numTruncate) {
            console.log("==truncate==");
            var guess = truncateString(input, numTruncate);
            if(game.checkLetter(guess)) {
                game.addScore(guess);
            }
            game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length;
        },

        flip: function(input) {
            console.log("==flip==");
            //random number from 1-length input
            var num = Math.floor(Math.random() * input.length);
            //flip bit
            var guess = input.replaceAt(num, ((Number(input.charAt(num)) + 1) % 2).toString());
            if(game.checkLetter(guess)) {
                game.addScore(guess);
            }
            game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length; 

        },
        
        skip: function () {
            console.log("==skip==");
            game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length;
        }
    }


// function endGame() {
//     state = "END_GAME";
// }


Player();
game.activateButtons();
};