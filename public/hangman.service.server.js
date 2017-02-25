module.exports = function (app) {

    app.get("/api/getLoses", getLoses);
    app.get("/api/addLose", addLose);
    app.get("/api/word", selectWord);
    app.get("/api/addWin", addWin);
    app.get("/api/getWins", getWins);



    function selectWord(req, res) {
        var words = [];
        var word;
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


            // if (word.length < 4) {
            //     console.log("reached too short");
            //     init();
            // }
            // spaceRender(word);

        })
        console.log("word: " + word);

        // $.get('words.txt', function (data) {
        //     var word;
        //     var lines = data.split('\n');
        //     for (var i = 0; i < lines.length; i++) {
        //         words.push(lines[i]);
        //     }
        //     var index = Math.floor(Math.random() * lines.length);
        //     word = words[index];
        //     // if (word.length < 4) {
        //     //     console.log("reached too short");
        //     //     init();
        //     // }
        //     // spaceRender(word);
        // })

        // fh = fopen('words.text', 0);
        // if(fh != -1) {
        //     var word;
        //     var lines = fh.split('\n');
        //     for (var i = 0; i < lines.length; i++) {
        //         words.push(lines[i]);
        //     }
        //     var index = Math.floor(Math.random() * lines.length);
        //     word = words[index];
        // }


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