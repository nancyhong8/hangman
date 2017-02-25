module.exports = function (app) {

    app.get("/api/word", selectWord);

    function selectWord(req, res) {
        $.get('words.txt', function (data) {
            var word;
            var lines = data.split('\n');
            for (var i = 0; i < lines.length; i++) {
                words.push(lines[i]);
            }
            var index = Math.floor(Math.random() * lines.length);
            word = words[index];
            if (word.length < 4) {
                console.log("reached too short");
                init();
            }
            // spaceRender(word);
        })
        res.send(word);

    }


}