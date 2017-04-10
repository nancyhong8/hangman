Nancy's Hangman

This hangman was built using MEAN stack :

###  Technologies
- [MongoDb](http://www.mongodb.org/)
- [ExpressJs](http://expressjs.com/)
- [AngularJs](http://angularjs.org/)
- [NodeJS](https://nodejs.org/en/)


### File Descriptions
- app.js: creates the angular module
- config.js: configuration
- draggable.directive.js: directive that makes the instructions box draggable
- welcome.controller.js: controller for the welcome/instructions box
- modal.controller.js: controls the modals that renders lost/won game
- hangman.controller.js: controller for the actual hangman game
- server.mongo.js: holds the http request methods, mongoose code dealing with the mongoDB database
- test.js: testing the http requests

Testing was done using Karma + Jasmine

This app is hosted on heroku:
https://nancy-hangman.herokuapp.com/