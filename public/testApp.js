


describe('testing controller', function() {

    var scope, controller, httpBackend;

    beforeEach(module('hangmanApp'));
    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        controller = $controller;
        httpBackend = $httpBackend;

        httpBackend
            .when('GET', 'http://localhost:4000/api/new/testing')
            .respond(200, {_id: 'testing'});

    }))

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();

    });



    it("should work", function() {
        ctrl = controller('hangmanController', {$scope: scope});

        httpBackend.flush();
        expect(scope.instructionVisible).toBe(false);

    })

    // beforeEach(module('hangmanApp'));

    // var $controller;

    // beforeEach(inject(function(_$controller_) {
    //     $controller = _$controller_;
    // }));



    // var scope, httpBackend, $controller;
    //
    // beforeEach(module('hangmanApp'));
    //
    // beforeEach(inject(function($rootScope, $httpBackend, $controller) {
    //     httpBackend = $httpBackend;
    //     $controller = $controller;
        // scope = $rootScope.$new();
        //
        // createController = function() {
        //     return $controller('hangmanController', {
        //         '$scope': scope
        //     });
        // };


    // }));

    // afterEach(function() {
    //     httpBackend.verifyNoOutstandingExpectation();
    //     httpBackend.verifyNoOutstandingRequest();
    // });


    // beforeEach(
    //     inject(function( $httpBackend, $rootScope, $controller) {
    //         var httpBackend = _$httpBackend_;
    //         var $scope = {};
    //         var controller = $controller('hangmanController', {$scope: $scope});
    //     }));


    //
    // it("the http calls should respond with a successful status", function() {
    //
    //     var $scope = {};
    //     var controller = $controller('hangmanController', {$scope: $scope});
    //
    //     $scope.word = 'hangman';
    //
    //     httpBackend
    //         .when('GET', 'http://localhost:4000/api/new/testing')
    //         .respond(200, {_id: 'testing'});
    //
    //     expect($scope.instructionVisible).toBe(false);
    //     expect($scope.game).toEqual({_id: 'testing'});

        // $httpBackend
        //     .when('GET', 'http://localhost:4000/api/old/testingNew')
        //     .respond(200, {_id: 'testing'})
        //
        // // $httpBackend.flush();
        //
        //
        //
        // $httpBackend
        //     .when('GET', 'http://localhost:4000/api/letterClicked/m')
        //     .respond(200);

        // var nock = require('nock');
        //
        // var couchdb = nock('http://myapp.iriscouch.com')
        //     .get('/api/old/testing')
        //     .reply(200, {
        //         _id: 'testing'
        //     });


        // $scope.oldUsername = 'testing7';
        // var get = sinon.stub($, 'GET');
        // var expectedURL = '/api/new/testing8';
        // var expectedParams = {
        //     _id: 'testing8'
        // };
        //
        // $scope.startGame();
        // get.restore();
        // sinon.assert.calledWith(get, expectedUrl, expectedParams);



    // describe('spaceRender', function() {
    //     it('should render the spaces', function() {
    //         var $scope = {};
    //         var controller = $controller('hangmanController', {$scope: $scope});
    //         $scope.newUsername = 'testing2';
    //         $scope.startGame();
    //         console.log($scope.usernameTaken);
    //
    //
    //     })
    // })
})


// describe('hangmanController', function() {
//     var $httpBackend, $rootScope, createController, authRequestHandler;
//
//     beforeEach(module('hangmanApp'));
//
//     beforeEach(inject(function($injector) {
//         $httpBackend = $injector.get('$httpBackend');
//
//         authRequestHandler = $httpBackend.when('GET', '/api/old/testing')
//             .respond({})
//     }))
// })

