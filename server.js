var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/HangmanDB');
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     // we're connected!
// });

var gameSchema = mongoose.Schema(
    {   _id: String,
        word: String,
        wins: Number,
        loses: Number,
        guessedLetters: String,
        wrongLetters: String
    }
)

var Game = mongoose.model('Game', gameSchema);


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var hangman = require("./public/hangman.service.js");
hangman(app);

var port = process.env.PORT || 4000;

app.listen(port);