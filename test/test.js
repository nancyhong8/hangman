var expect = require("chai").expect;
var server = require("../server.js");
var sinon      = require('sinon');
var request = require("request");
var retrievedGame = require("../public/hangman.service.js");


describe('server response', function() {
    before(function() {
        console.log("reached before");
        server.listen(4000);
    })
    after(function() {
        console.log("reached!");
        it('should return 400', function(done) {
            request.get('http://localhost:4000/api/old/testing', function(err, res, body) {
                expect(res.statusCode).to.equal(400);
                console.log(res.body);
                done();
            })
        })

        server.close();
    })
})



// describe("retrieving game using existing username", function() {
//     it("passes back a game using an existing username", function(done) {
//         // var game = retrieveGame.retrieveUsername("/");
//         $httpBackend
//             .when('GET', 'http://localhost:4000/api/new/testing2')
//             .response(200, {});
//
//         expect($httpBackend.flush).not.toThrow();
//
//
//     })
// })



describe("retrieving game using existing username", function() {



    it("passes back a game using an existing username", function(done) {
        // var game = retrieveGame.retrieveUsername("/");
        request("http://localhost:4000/api/old/testing", function(error, response, body) {
            // expect(body._id).to.equal("testing");
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.include("\"_id\":\"testing\"");
            expect(response.body).to.include("wrongLetters\":[]");
            expect(response.body).to.include("guessedLetters\":[]");
            done();
        })
    })
})

describe("newUsername", function() {
//
//     // before(function(){
//     //     sinon
//     //         .stub(request, 'get')
//     //         .yields();
//     // });
//     // after(function(){
//     //     request.get.restore();
//     // });
//
//     // var get = sinon.stub($, 'GET')
//     //     .yields();
//     //
//     //
//     // newUsername({})
//
//     // sinon.stub(request, 'GET').yields();
//     // request.get.restore()
//
    beforeEach(angular.mock.module('hangmanApp'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));
//
//
//
//
//
//
    it("tesitng sinon works", function() {
                var $scope = {};
                var controller = $controller('hangmanController', {$scope: $scope});
        $scope.oldUsername = 'testing7';
        // var get = sinon.stub($, 'GET');
        // var expectedURL = '/api/new/testing8';
        // var expectedParams = {
        //     _id: 'testing8'
        // };
        //
        // startGame();
        // get.restore();
        // sinon.assert.calledWith(get, expectedUrl, expectedParams);

    })
//
//     it("passes back a error message that user is taken", function(done) {
//         // var game = retrieveGame.retrieveUsername("/");
//         request("http://localhost:4000/api/new/testing8", function(error, response, body) {
//             // expect(response.._id).to.equal("testing4");
//             expect(response.statusCode).to.equal(200);
//             expect(response.body).to.include("\"_id\":\"testing7\"");
//             done();
//         })
//     })




})


describe("changing game state with letter clicked", function() {
    it("passes back a changed game state after letter clicked", function(done) {
        // var game = retrieveGame.retrieveUsername("/");
        request("http://localhost:4000/api/letterClicked/m", function(error, response, body) {
            // expect(body._id).to.equal("testing");
            expect(response.statusCode).to.equal(200);
            console.log(body);
            expect(response.body).to.include("\"guessedLetters\":[\"m\"");
            done();
        })
    })
})

