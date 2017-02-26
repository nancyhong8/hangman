module.exports = function (app) {

    app.get("/api/getLoses", getLoses);
    app.get("/api/addLose", addLose);
    app.get("/api/word", selectWord);
    app.get("/api/addWin", addWin);
    app.get("/api/getWins", getWins);
    app.get("/api/letterClicked", letterClicked);
    app.get("/api/:username", makeUsername);

    var GameModel = require('mongoose').model('Game');
    // give the database the username
    // req will pass the username in the url
    // res will send a good status
    function makeUsername(req, res) {
        console.log("reached makeuser");
        var username = req.params['username'];
        var word = selectRandomWord();
        var newGame = new GameModel(
            {   _id: username,
                word: word,
                wins: 0,
                loses: 0,
                guessedLetters: "",
                wrongLetters: ""
            }
        ).save(function (err, fluffy) {
            if (err)
                return console.error(err);
        });
        GameModel.find(function (err, kittens) {
            if (err) return console.error(err);
            console.log("my database: " + kittens );
        })
        res.send(word);
    }

    function letterClicked(req, res) {
        var letter = req.body;
        for(var i = 0; i < word.length; i++) {
            if(word[i] == letter) {
                space[i] = letter;
            }

        }
        if(!space.includes("_")) {
            addWins();
            openWon();
        }
        if(word.includes(letter)) {
            wrongGuesses += 1;
            wrongLetter.push(letter);
            if(wrongGuesses < 11) {
                drawArray[wrongGuesses]();
            }
            if (wrongGuesses == 10) {
                addLoses();
                openLost();
            }

        }
    }

    var word;

    function selectRandomWord() {
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
                console.log("from the selectRnadomWord " + word);
                return word;
            }
        })
    }

    function selectWord(req, res) {
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
                res.send(word.replace(/\r?\n|\r/,''));

            }
        })
    }





    var wins = 0;
    var loses = 0;
    function addWin(req, res) {
        wins = wins + 1;
        console.log(wins);
        res.send(wins.toString());
    }
    function addLose(req, res) {
        loses = loses + 1;
        res.send(loses.toString());
    }
    function getLoses(req, res) {
        res.send(loses.toString());
    }
    function getWins(req, res) {
        res.send(wins.toString());
    }




}