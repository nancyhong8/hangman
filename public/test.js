


describe('testing controller', function() {

    var scope, controller, httpBackend;

    beforeEach(module('hangmanApp'));
    beforeEach(inject(function ($rootScope, $controller, $httpBackend, $location) {
        scope = $rootScope.$new();
        controller = $controller;
        httpBackend = $httpBackend;

        httpBackend
            .when('POST', '/api/testing10')
            .respond(200, {
                username: 'testing10',
                wins: 0,
                loses: 0,
                guessedLetters: [],
                wrongLetters: [],
                spaces: []
            });

        httpBackend
            .when('GET', '/api/old/testing10')
            .respond(200, {
                username: 'testing',
                wins: 4,
                loses: 5,
                guessedLetters: [],
                wrongLetters: [],
                spaces: ['_']
            });

        httpBackend
            .when('PUT', '/api/letterClicked/testing/m')
            .respond(200, {
                username: 'testing',
                wins: 0,
                loses: 0,
                guessedLetters: ['m'],
                wrongLetters: [],
                spaces: ['_']
            });

        httpBackend
            .when('GET', '/api/word/testing')
            .respond(200, 'hangman');

    }))

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();

    });



    it("should successfully return a game using an old username", function() {
        ctrl = controller('hangmanController', {
            $scope: scope,
            $routeParams: {username: 'testing10'}
        });
        scope.startGame();
        httpBackend.flush();
        expect(scope.wins).toEqual(4);
        expect(scope.loses).toEqual(5);
        expect(scope.wrongGuesses).toEqual(0);
    })

    it("should successfully return a game using a new username", function() {
        ctrl = controller('welcomeController', {$scope: scope});
        scope.newUsername = 'testing10';
        scope.startGame();
        httpBackend.flush();
    })

    it("should successfully return a game changed when a letter is clicked", function() {
        ctrl = controller('hangmanController', {
            $scope: scope
        });
        scope.username = 'testing';
        scope.letterClicked(12);
        httpBackend.flush();
        expect(scope.wins).toEqual(0);
        expect(scope.loses).toEqual(0);
        expect(scope.wrongGuesses).toEqual(0);
    })
})