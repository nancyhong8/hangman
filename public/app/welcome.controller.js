(function() {
    angular
        .module("hangmanApp")
        .controller("welcomeController", welcomeController);

    function welcomeController($scope, $http, ModalService, $location, $routeParams) {

        $scope.startGame = function() {
            // if it's a new username create the
            // document in the database
            if ($scope.newUsername != null) {
                $http({
                    method: 'POST',
                    url: "/api/" + $scope.newUsername
                }).then(function(game) {
                    $location.url("/" + $scope.newUsername);
                    // if the username is already taken
                },function(error) {
                    $scope.usernameTaken = true;
                    $scope.usernameTakenMSG = "This username is taken";
                })
            }
            // if existing username make sure it exists
            if ($scope.oldUsername != null) {
                $http({
                    method: 'GET',
                    url: '/api/old/' + $scope.oldUsername
                }).then(function(game) {
                    $location.url("/" + $scope.oldUsername);
                },function(error) {
                    $scope.usernameTaken = true;
                    $scope.usernameTakenMSG = "This username does not exist";
                })
            }
        }
    }
})();