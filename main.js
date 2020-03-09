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
        wheelArray: ["BANKRUPT", "TRUNCATE", "FLIP", "UNFLIP","SKIP", "ADD", "SUBTRACT"],
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
            var playerOne = new Player(playerOneName, 0, 0);
            game.playerArray.push(playerOne);
            if (playerTwoName) {
              $('#player_2').text(playerTwoName);
              var playerTwo = new Player(playerTwoName, 0, 0);
              game.playerArray.push(playerTwo);
            };
            if (playerThreeName) {
              $('#player_3').text(playerThreeName);
              var playerThree = new Player(playerThreeName, 0, 0);
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
            $('#add').on('click', game.addScore);
            $('#subtract').on('click', game.subtractScore);
            $('#bankrupt').on('click', game.bankrupt);
            $('#truncate').on('click', game.truncate);
            $('#flip').on('click', game.flip);
            $('#skip').on('click', game.skip);
            $('#unflip').on('click', game.unflip);
        },

        checkLetter: function(){
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
            game.awaitingButton();
        },

        addScore: function(){
            game.checkLetter();
            console.log("==AddScore==");
            if (game.currentPlayer == 0){
              var updateOneScore = (game.playerArray[0].roundScore + game.currentValue);
              game.playerArray[0].totalScore = updateOneScore; // adding the score per number of letters
              $('#totalScore_1').text(updateOneScore);
            };
            if (game.currentPlayer == 1){
              var updateTwoScore = (game.playerArray[1].roundScore + game.currentValue);
              game.playerArray[1].totalScore = updateTwoScore;
              $('#totalScore_2').text(updateTwoScore);
            };
            if (game.currentPlayer == 2){
              var updateThreeScore = (game.playerArray[2].roundScore + game.currentValue);
              game.playerArray[2].totalScore = updateThreeScore;
              $('#totalScore_3').text(updateThreeScore);
            };
        },

        subtractScore: function () {
            console.log("==Subtract Score==");
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


        truncate: function() {
            console.log("==truncate==");
            game.awaitingButton();
        },

        flip: function() {
            console.log("==flip==");
            game.awaitingButton();
        },
        
        skip: function () {
            console.log("==skip==");
            game.awaitingButton();
        },

        unflip: function () {
            console.log("==unflip==");
            game.awaitingButton();
        }
    }


    Player();
    game.activateButtons();
};