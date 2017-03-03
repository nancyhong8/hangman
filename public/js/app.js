
var hangmanApp = angular.module('hangmanApp', ['ui.bootstrap']);


// DIRECTIVE
hangmanApp.directive('draggables', function dragInstructions() {
        function linkFunc(scope, element, attributes) {
            element.draggable();
        }
        return {
            link: linkFunc
        }
    }
)




// CONTROLLER
hangmanApp.controller('hangmanController', function hangmanController($scope, $modal, $http) {

    var newUsername;
    $scope.newUsername = newUsername;
    var oldUsername;
    $scope.oldUsername = oldUsername;
    $scope.startGame = startGame;
    var word;
    $scope.instructionVisible = true;
    var alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]
    $scope.alphabet = alphabet;


    // renders game by setting all the variables taken from server
    function renderGame(game) {
        word = game.word
        $scope.loses = game.loses;
        $scope.wins = game.wins;
        $scope.wrongGuesses = game.wrongLetters.length;
        $scope.wrongLetter = game.wrongLetters.toString();
        if(game.wrongLetters.length > 0 && game.wrongLetters.length < 11) {
            drawArray[game.wrongLetters.length]();
        }
        console.log("game from newGame: " + game.data);
        console.log("word from newGame: " + word);
        spaceRender(game.spaces);
    }

    // starts the game by sending the username
    // to the database, depending whether its new or old
    // and gets sent back either a username error
    // or otherwise a word
    function startGame() {

        if ($scope.newUsername != null) {
            $http({
                method: 'GET',
                url: '/api/new/' + $scope.newUsername
            }).then(function(game) {
                console.log(game.data);
                if (game.data == "usernameTaken") {
                    $scope.usernameTaken = true;
                    $scope.usernameTakenMSG = "This username is taken";
                } else {
                    $scope.instructionVisible = false;
                    renderGame(game.data);
                }

            }),function(error) {
                alert(error);
            }
        }
        if ($scope.oldUsername != null) {
            console.log("reached oldusername");
            $http({
                method: 'GET',
                url: '/api/old/' + $scope.oldUsername
            }).then(function(game) {
                console.log(game.data);
                if (game.data == "noUsername") {
                    $scope.usernameTaken = true;
                    $scope.usernameTakenMSG = "This username does not exist";
                } else {
                    $scope.instructionVisible = false;
                    renderGame(game.data);
                }

            }),function(error) {
                alert(error);
            }
        }
    }



    $scope.playAnother = function() {
        $scope.oldUsername = oldUsername;
        startGame();
        modalInstance = $modal.close({
            templateUrl: "templates/loser.html"
        });
        // $scope.instructionVisible = false;
        // location.reload();

        // $('modalInstance').modal('hide');

    }



    // Handling the clicked letter
    // sends letter to the server to handle
    // then receives back a new game state
    $scope.letterClicked = function (index, event) {
        $scope.alreadyGuessed = false;
        console.log($scope.space);
        $scope.letterClickedIndex = index;

        var letter = alphabet[index];
        $http({
            method: 'GET',
            url: '/api/letterClicked/' + letter

        }).then(function(game) {
            if(game.data == "alreadyGuessed") {
                $scope.alreadyGuessed = true;
                $scope.letterAlreadyGuessed = "This letter has already been guessed";
                return;
            }
            renderGame(game.data);

            if(!game.data.spaces.includes("_")) {
                openWon();
            }
            if(!game.data.word.includes(letter)) {
                if (game.data.wrongLetters.length == 10) {
                    openLost();
                }

            }

            console.log("game from letterClicked: " + game.data);
            console.log("reached");
        }),function(error) {
            alert(error);
        }

    }

    // function spaceRender2(word) {
    //     for (i = 0; i < word.length; i++) {
    //         if (word[i] === "-") {
    //             space.push("-");
    //         }
    //         else {
    //             space.push("_");
    //         }
    //     }
    //     $scope.space = space;
    //     $scope.word = word;
    // }

    function spaceRender(spaces) {
        // for (i = 0; i < spaces.length; i++) {
        //     if (word[i] === "-") {
        //         space.push("-");
        //     }
        //     else {
        //         space.push("_");
        //     }
        // }
        $scope.space = spaces;
        $scope.word = word;
    }

    // Handling the clicked letter
    // $scope.letterClicked2 = function (index, event) {
    //     console.log($scope.space);
    //     $scope.letterClickedIndex = index;
    //
    //     var letter = alphabet[index];
    //     $http({
    //         method: 'PUT',
    //         url: '/api/letterClicked/'
    //
    //
    //     }).then(function(data) {
    //         console.log("reached");
    //     }),function(error) {
    //         alert(error);
    //     }
    //
    // }

    //
    // function selectWord() {
    //     $http({
    //         method: 'GET',
    //         url: '/api/word'
    //     }).then(function(word) {
    //         console.log(word.data);
    //         if (word.data.length < 4) {
    //             console.log("short word");
    //             selectWord();
    //             return;
    //         }
    //         spaceRender(word.data);
    //     }),function(error) {
    //         alert("error!");
    //     }
    // }
    // $scope.selectWord = selectWord;

    // $scope.loses = getLoses;
    // function getLoses() {
    //     $http({
    //         method: 'GET',
    //         url: '/api/getLoses'
    //     }).then(function(loses) {
    //         $scope.loses = loses.data;
    //     }),function(error) {
    //         alert("error!");
    //     }
    // }
    // // getLoses();
    //
    // // $scope.wins = getWins;
    // function getWins() {
    //     $http({
    //         method: 'GET',
    //         url: '/api/getWins'
    //     }).then(function(wins) {
    //         $scope.wins = wins.data;
    //     }),function(error) {
    //         alert("error!");
    //     }
    // }
    // // getWins();
    //
    // function addWins() {
    //     $http({
    //         method: 'GET',
    //         url: '/api/addWin'
    //     }).then(function(wins) {
    //         $scope.wins = wins.data;
    //     }),function(error) {
    //         alert("error!");
    //     }
    // }
    //
    // function addLoses() {
    //     $http({
    //         method: 'GET',
    //         url: '/api/addLose'
    //     }).then(function(loses) {
    //         $scope.loses = loses.data;
    //     }),function(error) {
    //         alert("error!");
    //     }
    //
    // }
    //
    //
    //
    // function init() {
    //     document.location.reload();
    // }
    // $scope.init = init;




    // var wrongLetter = [];
    // var space = [];
    // var wrongGuesses = 0;
    // var words = [];

    // $(document).ready(function() {
    //     $.get('words.txt', function(data) {
    //         var lines = data.split('\n');
    //
    //         for(var i=0; i<lines.length; i++) {
    //             words.push(lines[i]);
    //         }
    //         var index = Math.floor(Math.random() * lines.length);
    //         console.log(index);
    //         $scope.word = words[index];
    //         if($scope.word.length < 4) {
    //             console.log("reached too short");
    //             init();
    //         }
    //         console.log($scope.word)
    //     })
    // })



    // $scope.wrongGuesses = wrongGuesses;



    // $scope.instructionVisibility = function() {
    //
    // }


    // Handles the spaces for the letters of the word





    var modalInstance;
    function openLost() {
        modalInstance = $modal.open({
            templateUrl: "templates/loser.html",
            controller: "hangmanController"
        })
    }
    function openWon() {
        modalInstance = $modal.open({
            templateUrl: "templates/winner.html",
            controller: "hangmanController"
        })
    }
    //
    // $scope.openLost = openLost;
    // $scope.arrayToString = function(string){
    //     if (string != null) {
    //         return string.join(", ");
    //     }
    // };





    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
        myStickman = document.getElementById("myCanvas");
        context = myStickman.getContext('2d');
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    head = function(){
        console.log("reached head");
        myStickman = document.getElementById("myCanvas");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
    }
    frame0 = function() {
        draw (20, 0, 150, 0);
    }

    frame1 = function() {
        draw (0, 150, 150, 150);
    };

    frame2 = function() {
        draw (10, 0, 10, 600);
    };

    frame3 = function() {
        draw (0, 5, 70, 5);
    };

    frame4 = function() {
        draw (60, 5, 60, 15);
    };

    torso = function() {
        draw (60, 36, 60, 70);
    };

    rightArm = function() {
        draw (60, 46, 100, 50);
    };

    leftArm = function() {
        draw (60, 46, 20, 50);
    };

    rightLeg = function() {
        draw (60, 70, 100, 100);
    };
    leftLeg = function() {
        draw (60, 70, 20, 100);
    };


    drawArray = [frame0, frame1, frame2, frame3, frame4, head, torso, leftArm, rightArm, leftLeg, rightLeg];




    // var spaces = [];
    //
    // $scope.spaces = spaces;
    //
    // // Handles the spaces for the letters of the word
    // function spacesRender() {
    //     for (i = 0; i < word.length; i++) {
    //         spaces.push["i"];
    //     }
    // }
    // spacesRender();






    // var vm = this;
    // vm.instructions = instructions;
    //
    // function init() {
    // }
    // function instructions() {
    //     alert("testing!");
    // }
})



// hangmanApp.controller('hangmanController', function hangmanController($route) {
//     $scope.phones = [
//         {
//             name: 'Nexus S',
//             snippet: 'Fast just got faster with Nexus S.'
//         }, {
//             name: 'Motorola XOOM™ with Wi-Fi',
//             snippet: 'The Next, Next Generation tablet.'
//         }, {
//             name: 'MOTOROLA XOOM™',
//             snippet: 'The Next, Next Generation tablet.'
//         }
//     ];
// });