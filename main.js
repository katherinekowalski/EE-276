// ============================================================================================
// EE276 Final Project Main File
// Contributors: Calvin Lin, Katherine Kowalski, Yasmeen Jassim
// File: main.js
// 
// 
// This file handles backend processes of the game. Specifically it turns all words into
// a Huffman encoded value based on the probabilities in which letters appear in a Wheel 
// of Fortune game according to an accumulated database.
// ============================================================================================
window.onload = function (e) {
    console.log("==window loaded==");

    // ============================================================================================
    // Function: Player()
    // ============================================================================================

    function Player(name, totalScore) {
        console.log("==Player==");
        this.name = name;
        this.totalScore = totalScore;
    };

    String.prototype.replaceAt = function (index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    var game = {

        playerArray: [],
        currentPlayer: 0,
        round: 1,
        wordArray: ["INFORMATION"],//,"POLAR", "ASYMPTOTIC", "GAUSSIAN", "COMPRESSION", "DISTORTION"
        binaryArray: [],
        guessedArray: [],
        guessCount: 0,
        currentWord: "",
        currentValue: "",
        correctLetterCount: 0,
        newGuess: true,
        hold: false,


        activateButtons: function () {
            console.log("==activateButtons==");
            $('#startGame').on('click', game.checkUser);
        },

        checkUser: function () {
            console.log("==checkUser==");
            if ($('#userName_1').val()) {
                game.makePlayers();
            } else {
                alert("Please enter a name for player one.")
            }
        },

        // ============================================================================================
        // Function: makePlayers
        // ============================================================================================

        makePlayers: function () {
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

        // ============================================================================================
        // Function: loadPuzzle
        // ============================================================================================

        loadPuzzle: function () {
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

        // ============================================================================================
        // Function: highlightPlayer
        // ============================================================================================

        highlightPlayer: function () {
            console.log("==highlightPlayer==");
            if (game.currentPlayer == 0) {
                $('#player_1').css("color", "#FB6542");
            } else {
                $('#player_1').css("color", "#000");
            };
            if (game.currentPlayer == 1) {
                $('#player_2').css("color", "#FB6542");
            } else {
                $('#player_2').css("color", "#000");
            };
            if (game.currentPlayer == 2) {
                $('#player_3').css("color", "#FB6542");
            } else {
                $('#player_3').css("color", "#000");
            };
        },

        // ============================================================================================
        // Function: awaitingButton()
        // ============================================================================================

        awaitingButton: function () {
            //<button onclick="game.addScore">Click me</button>
            add.onclick = function () { game.addScore("") }
            bankrupt.onclick = function () { game.bankrupt() }
            truncate.onclick = function () { game.truncate($('#enterLetter').val(), 2) }
            flip.onclick = function () { game.flip($('#enterLetter').val()) }
            flipecc.onclick = function () { game.flipecc($('#enterLetter').val()) }
            bitrep.onclick = function () { game.bitrep($('#enterLetter').val()) }
            incrbitrate.onclick = function () { game.incrbitrate($('#enterLetter').val()) }
            skip.onclick = function () { game.skip() }
            endgame.onclick = function () { game.endGame() }
        },

        // ============================================================================================
        // Function: checkLetter()
        // ============================================================================================

        checkLetter: function (guessedLetter) {
            console.log("==checkLetter==");
            console.log(guessedLetter);
            this.correctLetterCount = 0;
            if (guessedLetter.length != 0) {

                game.newGuess = true;

                for (var i = 0; i < game.guessedArray.length; i++) {
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

        // ============================================================================================
        // Function: addScore()
        // ============================================================================================

        addScore: function (input) {
            var guessedLetter = $('#enterLetter').val();
            if (input.length != 0) {
                guessedLetter = input;
            }
            var correctGuess = game.checkLetter(guessedLetter);
            document.getElementById("guessedLetters").innerHTML = "Guesses:" + " " + game.guessedArray.join(", ");

            var pointsToAdd = $('#score').val();
            console.log("==AddScore==");
            console.log(pointsToAdd);
            if (game.currentPlayer == 0 && correctGuess) {
                game.playerArray[0].totalScore = (Number(game.playerArray[0].totalScore) + Number(pointsToAdd) * Number(game.correctLetterCount)).toString();
                $('#totalScore_1').text(game.playerArray[0].totalScore);
            }
            else if (game.currentPlayer == 1 && correctGuess) {
                game.playerArray[1].totalScore = (Number(game.playerArray[1].totalScore) + Number(pointsToAdd) * Number(game.correctLetterCount)).toString();
                $('#totalScore_2').text(game.playerArray[1].totalScore);
            }
            else if (game.currentPlayer == 2 && correctGuess) {
                game.playerArray[2].totalScore = (Number(game.playerArray[2].totalScore) + Number(pointsToAdd) * Number(game.correctLetterCount)).toString();
                $('#totalScore_3').text(game.playerArray[2].totalScore);
            }
            if (game.newGuess && !game.hold) {
                game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length;
            }
            game.newGuess = true;
            console.log("game.currentPlayer", game.currentPlayer);

            game.highlightPlayer();
            game.awaitingButton();
        },

        // ============================================================================================
        // Function: bankrupt()
        // ============================================================================================

        bankrupt: function () {
            console.log("==bankrupt==");
            if (game.currentPlayer == 0) {
                game.playerArray[0].totalScore = 0;
                console.log("Bankrupt: " + game.playerArray[0].totalScore);
                $('#totalScore_1').text(Number(game.playerArray[0].totalScore));
            } else if (game.currentPlayer == 1) {
                game.playerArray[1].totalScore = 0;
                $('#totalScore_2').text(Number(game.playerArray[1].totalScore));
            } else if (game.currentPlayer == 2) {
                game.playerArray[2].totalScore = 0;
                $('#totalScore_3').text(Number(game.playerArray[2].totalScore));
            }
            game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length;
            game.awaitingButton();
            game.highlightPlayer();
        },

        // ============================================================================================
        // Function: flipecc()
        // ============================================================================================

        flipecc: function (input) {
            console.log("==Bit Flip + ECC==");
            var guess = input.replaceAt(0, ((Number(input.charAt(0)) + 1) % 2).toString());
            game.addScore(guess);
            // game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length; 
        },

        // ============================================================================================
        // Function: bitrep()
        // ============================================================================================ 

        bitrep: function (input) {
            console.log("==Bit Flip + Bit Repetition==");
            game.addScore(input);
            // game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length; 
        },

        // ============================================================================================
        // Function: incrbitrate()
        // ============================================================================================

        incrbitrate: function (input) { //get 2 guesses
            console.log("==incr bit rate==");
            var partial="";
            var letter1;
            var letter2;
            for (var i = 0; i < input.length; i++) {
                
                if (input.charAt(i) ==',') {
                    letter1 = input.substr(0, i);
                    letter2 = input.substr(i+1, input.length);
                    break;
                } 
            }
            console.log("l1" + letter1)
            console.log("l2" + letter2)
            game.hold = true;
            game.addScore(letter1);
            game.hold = false;
            game.addScore(letter2);
            
            // game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length;
        },

        // ============================================================================================
        // Function: truncate()
        // ============================================================================================

        truncate: function (input, numToTrunc) {
            console.log("==truncate==");

            var guess = input.substring(0, input.length - 2);
            game.addScore(guess);
            game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length;
        },

        // ============================================================================================
        // Function: flip()
        // ============================================================================================

        flip: function (input) {
            console.log("==flip==");
            //random number from 1-length input
            var num = Math.floor(Math.random() * input.length);
            //flip bit
            var guess = input.replaceAt(num, ((Number(input.charAt(num)) + 1) % 2).toString());
            game.addScore(guess);
            // game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length; 

        },

        // ============================================================================================
        // Function: skip()
        // ============================================================================================

        skip: function () {
            console.log("==skip==");
            game.currentPlayer = (game.currentPlayer + 1) % game.playerArray.length;
            game.highlightPlayer();
            game.awaitingButton();
        },
        // ============================================================================================
        // Function: endgame()
        // ============================================================================================

        endGame: function () {
            console.log("==endGame==");
            for (var i = 0; i < game.currentWord.length; i++) {

                var currentLetter = game.currentWord[i];
                console.log(currentLetter);
                $('#letter_' + i + '> p').css("visibility", "visible");
            }
            alert("The correct word is " + game.currentWord);
        }
    }
    Player();
    game.activateButtons();
};