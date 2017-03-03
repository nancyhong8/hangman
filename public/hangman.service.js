module.exports = function (app) {

    // app.get("/api/getLoses", getLoses);
    // app.get("/api/addLose", addLose);
    app.get("/api/word", selectWord);
    // app.get("/api/addWin", addWin);
    // app.get("/api/getWins", getWins);
    app.get("/api/letterClicked/:letter", letterClicked);
    app.get("/api/new/:username", makeUsername);
    app.get("/api/old/:username", retrieveUsername);



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
    // var spaces = [];
    var game;
    // Uses and existing username key to update
    // user's word and send back the word to render
    function retrieveUsername(req, res) {
        console.log("reached retrivee");
        var username = req.params['username'];
        console.log("old username: " + username);
        var words = [];

        GameModel.findOne({_id: username}, function(err, oldGame) {

            if (oldGame) {
                selectWord(function(wordSelected) {
                    word = wordSelected;
                    console.log("wordSelected: " + wordSelected);
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
                    // res.send(wordSelected.replace(/\r?\n|\r/,''));
                    game = oldGame;
                    console.log("updated oldgame: " + oldGame);
                    console.log("updated game: " + game);
                    res.send(oldGame);
                })

            } else {
                console.log("reached error");
                res.send("noUsername");
            }
        })
    }

    // give the database the username
    // req will pass the username in the url
    // res will send a word randomly selected
    function makeUsername(req, res) {

        var username = req.params['username'];
        var words = [];

        GameModel.count({_id: username}, function (err, count) {
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

                    console.log("new Game: " + newGame);
                    console.log("new Game id: " + newGame._id);
                    game = newGame;
                    res.send(newGame);
                    // res.send(wordSelected.replace(/\r?\n|\r/,''));
                })
            }
        })
    }


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