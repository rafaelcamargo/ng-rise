# ng-rise
ng-rise is a minimal AngularJS application. Its content has only the minimum conditions to start code an app: *Angular*, *Angular-Route* and automated tasks to watch and update *.js* and *.styl* files.

## Requirements
To run this project, you need Nodejs installed in your system. *node ~v0.10 recommended*


## Installation

You have two ways to install ng-rise:

### Fast
Approximate time: *1m40s on 1Mbps internet*
```
curl -o ~/bin/ng-rise https://raw.githubusercontent.com/rafaelcamargo/ng-rise/master/install/ng-rise
chmod +x ~/bin/ng-rise
ng-rise
```

### Not too fast

```
git clone git@github.com:rafaelcamargo/ng-rise.git
cd ng-rise
npm install
grunt build
grunt start
open http://localhost:3000
```

### Troubleshooting
- If you get `npm: command not found`, make sure you have npm-cli installed in your system. *Nodejs should install it automatically*.
- If you get `grunt: command not found`, make sure npm installed `grunt-cli` successfully.


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
|-- css
|-- js
|-- styl
|-- |-- native.styl
spec
|-- unit
|-- |-- commons
|-- |-- |-- directives
|-- |-- |-- |-- welcome-spec.js
|-- |-- views
|-- |-- |-- introduction-spec.js
|-- visual
|-- |-- screenshots
|-- |-- |-- welcome-title.png
|-- |-- |-- welcome-message.png
|-- |-- |-- welcome-version.png
|-- |-- welcome-visual-spec.js
```
