(function() {
    angular
        .module("hangmanApp")
        .controller("ModalController", modalController);

    function modalController($scope, close, $routeParams, $http, $location) {
        // gets the word of the game to show if game is lost
        var username = $routeParams['username'];
        $http.get("/api/word/" + username)
            .then(function(word) {
                $scope.word = word.data;
            },function(error) {
                console.log(error);
            })

        $scope.close = function(result) {
            close(result, 500);
            location.reload();
        }
    };
})();