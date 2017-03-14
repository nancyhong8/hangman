// SERVER

module.exports = function (app) {
    // HTTP call map
    app.get("/api/letterClicked/:letter", letterClicked);
    app.get("/api/new/:username", makeUsername);
    app.get("/api/old/:username", retrieveUsername);

    /**
     *   Setting up the database (using mLab)
     *   creating a model for a game
     */
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://nancyh:Rewolf123@ds117899.mlab.com:17899/heroku_xn9ljwr0');
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
     * handles the letter clicked
     * @param req contains the letter clicked
     * @param res sends back the altered game
     */
    function letterClicked(req, res) {
        var letter = req.params['letter'];

        // check if the letter has been guessed,
        // if so, send the message to the controller to render
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

        if(!game.spaces.includes("_")) {
            game.wins = game.wins + 1;
        }
        if(!word.includes(letter)) {
            game.wrongLetters.push(letter);

            if (game.wrongLetters.length == 10) {
                game.loses = game.loses + 1;
            }

        }
        game.save(function (err, user) {
            if (err)
                return console.error(err);
        });

        res.send(game);
    }

    /**
     * selects a word from the word.txt file
     * and then evokes the callback method that
     * handles the word once its successfully found
     * word.txt file was taken from https://github.com/Xethron/Hangman
     * @param callback
     */
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
                if(word.length < 4) {
                    selectWord(callback);
                } else {
                    callback(word.replace(/\r?\n|\r/,''));
                }

            }
        })
    }

}