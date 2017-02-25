module.exports = function (app) {

    app.get("/api/getLoses", getLoses);
    app.get("/api/addLose", addLose);
    app.get("/api/word", selectWord);
    app.get("/api/addWin", addWin);
    app.get("/api/getWins", getWins);



    function selectWord(req, res) {
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
        res.send("hangman");
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