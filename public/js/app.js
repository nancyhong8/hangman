// (function () {
//     angular
//         .module("hangmanApp", []);
// })();

var hangmanApp = angular.module('hangmanApp', []);


hangmanApp.controller('hangmanController', function hangmanController($scope, $modal) {

    var word = "hangman";
    var correctLetter = [];
    var wrongLetter = [];
    $scope.correctLetter = correctLetter;
    $scope.word = word;
    var space = [];
    var wrongGuesses = 0;
    $scope.wrongGuesses = wrongGuesses;
    $scope.removeInstructions = removeInstructions;
    $scope.instructionVisible = true;
    $scope.instructionVisibility = function() {
        if ($scope.instructionVisible) {
            $scope.instructionVisible = false;
        }
        else {
            $scope.instructionVisible = true;
        }
    }


    function removeInstructions() {
        elt.html('');
    }


    // Handles the spaces for the letters of the word
    function spaceRender() {
        for (i = 0; i < word.length; i++) {
            if (word[i] === "-") {
                space.push("-");
            }
            else {
                space.push("_");
            }
        }
        $scope.space = space;

    }
    spaceRender();


    // Make the instructions visible/invisible based on button click
    // $scope.instructions = function () {
    //     var visibility = document.getElementById('instructions')
    //     if(visibility.style.display == "none") {
    //         visibility.style.display = "block";
    //     } else {
    //         visibility.style.display = "none";
    //     }
    // }

    var alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]
    $scope.alphabet = alphabet;


    // Handling the clicked letter
    $scope.letterClicked = function (index) {
        $scope.letterClickedIndex = index;
        var letter = alphabet[index];
        for(var i = 0; i < word.length; i++) {
            if(word[i] === letter) {
                space[i] = letter;
            }
            if(!space.includes("_")) {
                // winner();
            }
        }
        if(!word.includes(letter)) {
            wrongGuesses += 1;
            wrongLetter.push(letter);

            if(wrongGuesses < 10) {
                drawArray[wrongGuesses]();
            }
            if (wrongGuesses === 9) {
                loser();
            }

        }

        $scope.wrongLetter = wrongLetter;
        $scope.wrongGuesses = wrongGuesses;
    }

    $scope.arrayToString = function(string){
        if (string != null) {
            return string.join(", ");
        }

    };

    function loser() {
        $modal.open({
            template: "LOST!"
        })
        document.location.reload();
    }
    // function winner() {
    //     alert("Winner");
    // }









    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
        myStickman = document.getElementById("myCanvas");
        context = myStickman.getContext('2d');
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    canvas =  function(){
        console.log("reached");
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };
    // canvas();

    head = function(){
        console.log("reached head");
        myStickman = document.getElementById("myCanvas");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
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



    drawArray = [frame1, frame2, frame3, frame4, head, torso, leftArm, rightArm, leftLeg, rightLeg]




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