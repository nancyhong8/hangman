// require('../public/app.js');



describe('testing controller', function() {
    beforeEach(module('hangmanApp'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('spaceRender', function() {
        it('should render the spaces', function() {
            var $scope = {};
            var controller = $controller('hangmanController', {$scope: $scope});
            $scope.newUsername = 'testing2';
            $scope.startGame();
            console.log($scope.usernameTaken);


        })
    })
})

