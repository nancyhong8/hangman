


describe('testing controller', function() {

    var scope, controller, httpBackend;

    beforeEach(module('hangmanApp'));
    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        controller = $controller;
        httpBackend = $httpBackend;

        httpBackend
            .when('GET', '/api/new/testing10')
            .respond(200, {
                username: 'testing10',
                wins: 0,
                loses: 0,
                guessedLetters: [],
                wrongLetters: [],
                spaces: []
            });

        httpBackend
            .when('GET', '/api/old/testing')
            .respond(200, {
                username: 'testing',
                wins: 4,
                loses: 5,
                guessedLetters: [],
                wrongLetters: [],
                spaces: ['_']
            });

        httpBackend
            .when('GET', '/api/letterClicked/testing/m')
            .respond(200, {
                username: 'testing',
                wins: 0,
                loses: 0,
                guessedLetters: ['m'],
                wrongLetters: [],
                spaces: ['_']
            });

    }))

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();

    });



    it("should successfully return a game using an old username", function() {
        ctrl = controller('hangmanController', {$scope: scope});
        scope.oldUsername = 'testing';
        scope.startGame();
        httpBackend.flush();
        expect(scope.instructionVisible).toBe(false);
        expect(scope.wins).toEqual(4);
        expect(scope.loses).toEqual(5);
        expect(scope.wrongGuesses).toEqual(0);
    })

    it("should successfully return a game using a new username", function() {
        ctrl = controller('hangmanController', {$scope: scope});
        scope.newUsername = 'testing10';
        scope.oldUsername = null;
        scope.startGame();
        httpBackend.flush();
        expect(scope.instructionVisible).toBe(false);
        expect(scope.wins).toEqual(0);
        expect(scope.loses).toEqual(0);
        expect(scope.wrongGuesses).toEqual(0);

    })

    it("should successfully return a game changed when a letter is clicked", function() {
        ctrl = controller('hangmanController', {$scope: scope});
        scope.username = 'testing';
        scope.letterClicked(12);
        httpBackend.flush();
        expect(scope.wins).toEqual(0);
        expect(scope.loses).toEqual(0);
        expect(scope.wrongGuesses).toEqual(0);
    })


})


