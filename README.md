# ng-rise
ng-rise is a minimal AngularJS application. Its content has only the minimum conditions to start code an app: *Angular*, *Angular-Route* and automated tasks to watch and update *.js* and *.styl* files.

[![Code Climate](https://codeclimate.com/github/rafaelcamargo/ng-rise/badges/gpa.svg)](https://codeclimate.com/github/rafaelcamargo/ng-rise) [![Test Coverage](https://codeclimate.com/github/rafaelcamargo/ng-rise/badges/coverage.svg)](https://codeclimate.com/github/rafaelcamargo/ng-rise/coverage) [![CircleCI](https://circleci.com/gh/rafaelcamargo/ng-rise.svg?style=svg)](https://circleci.com/gh/rafaelcamargo/ng-rise)

## Requirements
To run this project, you need Nodejs installed in your system.

## Installation

```
git clone git@github.com:rafaelcamargo/ng-rise.git
cd ng-rise
npm install -g grunt-cli karma-cli
npm install
grunt build
grunt start
open http://localhost:9000
```

## Base structure

```
index.html
app
|-- app.js
|-- routes.js
|-- commons
|-- |-- directives
|-- |-- |-- welcome
|-- |-- |-- |-- welcome-template.html
|-- |-- |-- |-- welcome-directive.js
|-- views
|-- |-- introduction
|-- |-- |-- introduction-template.html
|-- |-- |-- introduction-controller.js
assets
|-- styl
|-- |-- native.styl
spec
|-- commons
|-- |-- directives
|-- |-- |-- welcome-spec.js
|-- views
|-- |-- introduction-spec.js
```
