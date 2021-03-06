var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var hangman = require("./public/service.js");
hangman(app);

var port = process.env.PORT || 4000;

app.listen(port);