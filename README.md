# ng-rise
ng-rise is a minimal AngularJS application. Its content has only the minimum conditions to start code an app: *Angular*, *Angular-Route* and automated tasks to watch and update *.js* and *.styl* files.


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


## Base structure

```
index.html
| app
  app.js
  | intro
    introView.html
    introController.js
| assets
  | css
  | js
  | styl
    native.styl
```
