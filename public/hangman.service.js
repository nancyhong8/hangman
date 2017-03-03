// SERVER

module.exports = function (app) {
    // HTTP call map
    app.get("/api/letterClicked/:letter", letterClicked);
    app.get("/api/new/:username", makeUsername);
    app.get("/api/old/:username", retrieveUsername);

    /**
     *   Setting up the database
     *   creating a modal for a game
     */
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/HangmanDB');
    var gameSchema = new mongoose.Schema(
        {   _id: {type: String, required: true},
            word: {type: String, required: true},
            wins: {type: Number, default: 0},
            loses: {type: Number, default: 0},
            guessedLetters: {type: [String], default: []},
            wrongLetters: {type: [String], default: []},
            spaces: [String]
        }
    )
    var GameModel = mongoose.model('Game', gameSchema);



    var word;
    var game;

    /**
     * Uses an existing username key to retrieve game
     * from the database
     * @param req contains the username
     * @param res sends back the retrieved game for the username
     *         or a message that the user doesn't exist
     */

    function retrieveUsername(req, res) {
        var username = req.params['username'];
        var words = [];

        // Try to find the game using the username given
        GameModel.findOne({_id: username}, function(err, oldGame) {
            // Send back the game to the controller
            if (oldGame) {
                selectWord(function(wordSelected) {
                    word = wordSelected;
                    oldGame.word = wordSelected;
                    oldGame.spaces = [];
                    oldGame.wrongLetters = [];
                    oldGame.guessedLetters = [];
                    for(i = 0; i < wordSelected.length; i++) {
                        oldGame.spaces.push("_");
                    }
                    oldGame.save(function (err, user) {
                        if (err)
                            return console.error(err);
                    });
                    game = oldGame;
                    res.send(oldGame);
                })

            }
            // If the username doesnt exist
            else {
                console.log("reached error");
                res.send("noUsername");
            }
        })
    }

    /**
     * Makes a game for the given username in the
     * database
     * @param req contains the given username
     * @param res sends back a game created or
     *        message that the username is already taken
     */
    function makeUsername(req, res) {

        var username = req.params['username'];
        var words = [];

        GameModel.count({_id: username}, function (err, count) {
            // Checks if username already exists
            if (count > 0) {
                res.send("usernameTaken");
            } else {
                selectWord(function(wordSelected) {
                    var word = wordSelected;

                    // create the player object in the database
                    // and send the word back
                    var newGame = new GameModel(
                        {   _id: username,
                            word: wordSelected,
                        }
                    )
                    newGame.save(function (err, user) {
                        if (err)
                            return console.error(err);
                    });
                    for(i = 0; i < wordSelected.length; i++) {
                        newGame.spaces.push("_");
                    }

                    game = newGame;
                    res.send(newGame);
                })
            }
        })
    }


    /**
     *
     * @param req
     * @param res
     */
    function letterClicked(req, res) {
        var letter = req.params['letter'];

        console.log(letter)
        console.log("spaces: " + game.spaces.length)
        if(game.guessedLetters.includes(letter)) {
            res.send("alreadyGuessed");
            return;
        }

        game.guessedLetters.push(letter);
        for(var i = 0; i < word.length; i++) {
            if(word[i] == letter) {
                game.spaces[i] = letter;
            }
        }
        console.log(game.spaces);

        if(!game.spaces.includes("_")) {
            game.wins = game.wins + 1;
            // openWon();
        }
        if(!word.includes(letter)) {
            game.wrongLetters.push(letter);

            if (game.wrongLetters.length == 10) {
                game.loses = game.loses + 1;
                // openLost();
            }

        }
        game.save(function (err, user) {
            if (err)
                return console.error(err);
        });

        res.send(game);
    }





    // function selectWord(req, res) {
    //     var words = [];
    //
    //     fs = require('fs');
    //     fs.readFile(__dirname + '/words.txt', 'utf8', function(err, data) {
    //         if(err) {
    //             console.log("couldnt open word file: " + err);
    //         }
    //         else {
    //             var lines = data.split('\n');
    //             for (var i = 0; i < lines.length; i++) {
    //                 words.push(lines[i]);
    //             }
    //             var index = Math.floor(Math.random() * lines.length);
    //             word = words[index];
    //             console.log(word);
    //             res.send(word.replace(/\r?\n|\r/,''));
    //
    //         }
    //     })
    // }

    function selectWord(callback) {
        var words = [];

        fs = require('fs');
        fs.readFile(__dirname + '/words.txt', 'utf8', function(err, data) {
            if(err) {
                console.log("couldnt open word file: " + err);
            }
            else {
                var lines = data.split('\n');
                for (var i = 0; i < lines.length; i++) {
                    words.push(lines[i]);
                }
                var index = Math.floor(Math.random() * lines.length);
                word = words[index];
                console.log(word);
                //res.send(word.replace(/\r?\n|\r/,''));
                callback(word.replace(/\r?\n|\r/,''));
            }
        })
    }



    //
    // var wins = 0;
    // var loses = 0;
    // function addWin(req, res) {
    //     wins = wins + 1;
    //     console.log(wins);
    //     res.send(wins.toString());
    // }
    // function addLose(req, res) {
    //     loses = loses + 1;
    //     res.send(loses.toString());
    // }
    // function getLoses(req, res) {
    //     res.send(loses.toString());
    // }
    // function getWins(req, res) {
    //     res.send(wins.toString());
    // }




}