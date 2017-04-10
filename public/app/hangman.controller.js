(function() {
    angular
        .module("hangmanApp")
        .controller("hangmanController", hangmanController);

    function hangmanController($scope, $http, ModalService, $location, $routeParams) {

        var alphabet = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ]
        $scope.alphabet = alphabet;

        $scope.startGame = startGame;
        startGame();

        /**
         * renders game by setting all the game variables taken from server
         * @param game
         */
        function renderGame(game) {

            $scope.loses = game.loses;
            $scope.wins = game.wins;
            $scope.wrongGuesses = game.wrongLetters.length;
            $scope.wrongLetter = game.wrongLetters.toString();
            if(game.wrongLetters.length > 0 && game.wrongLetters.length < 11) {

                drawArray[game.wrongLetters.length]();
            }
            $scope.space = game.spaces;
            $scope.username = game.username;
        }


        /**
         * starts the game by sending the username
         * to the database,
         * and gets sent back a game
         */
        function startGame() {
            var username = $routeParams['username'];
            $scope.username = username;

            if (username != null) {
                $http({
                    method: 'GET',
                    url: '/api/old/' + username
                }).then(function(game) {
                    renderGame(game.data);
                },function(error) {
                    console.log(error);
                })
            }
        }


        /**
         * Handling the clicked letter
         * sends letter to the server to handle
         * then receives back a new game state to render
         * @param index of the alphabet clicked
         * @param event
         */
        $scope.letterClicked = function (index, event) {
            $scope.alreadyGuessed = false;
            $scope.letterClickedIndex = index;

            $http({
                method: 'PUT',
                url: '/api/letterClicked/' + $scope.username + "/" + alphabet[index]
            }).then(function(game) {
                renderGame(game.data);
                // check if game is won
                if(!game.data.spaces.includes("_")) {
                    openWon();
                }
                // check if game is lost
                if (game.data.wrongLetters.length == 10) {
                    openLost();
                }
            },function(error) {
                // If the database sends back that
                // the letter has already been clicked,
                // render the error msg
                $scope.alreadyGuessed = true;
                $scope.letterAlreadyGuessed = "This letter has already been guessed";

            })


        }


        // When the game is lose or won,
        // using $modal, open a html modal template
        function openLost() {
            ModalService.showModal({
                templateUrl: "../templates/loser.html",
                controller: "ModalController"
            }).then(function(modal) {
                modal.close.then(function(result) {
                    console.log(result);
                });
            });
        }
        function openWon() {
            ModalService.showModal({
                templateUrl: "../templates/winner.html",
                controller: "ModalController"
            }).then(function(modal) {
                modal.close.then(function(result) {
                    console.log(result);
                });
            });
        }






        /**
         * Section below handles the drawing of hangman
         * The coordinate drawing code was taken from
         * https://codepen.io/cathydutton/pen/ldazc
         */


        /**
         * the drawing template
         * @param $pathFromx start x
         * @param $pathFromy start y
         * @param $pathTox finish x
         * @param $pathToy finish y
         */
        draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
            myStickman = document.getElementById("myCanvas");
            context = myStickman.getContext('2d');
            context.beginPath();
            context.moveTo($pathFromx, $pathFromy);
            context.lineTo($pathTox, $pathToy);
            context.stroke();
            context.closePath();
        }

        head = function(){
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

        // Array gets evoked in the renderGame method to draw the above components
        drawArray = [frame0, frame1, frame2, frame3, frame4, head, torso, leftArm, rightArm, leftLeg, rightLeg];

    }
})();