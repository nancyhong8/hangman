(function() {
    angular
        .module("hangmanApp")
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/welcome", {
                templateUrl: "../templates/welcome.html",
                controller: "welcomeController"
            })
            .when("/:username", {
                templateUrl: "../templates/game.html",
                controller: "hangmanController"
            })
            .otherwise({
                redirectTo: "/welcome"
            })
    }
})();