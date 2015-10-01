# Penneo Javascript SDK

## Installing dependencies

This application's dependencies are managed by [npm](https://www.npmjs.org/), before proceding with the cli commands below, make sure you have [node.js](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed.

####Install project dependencies
npm handles the installation of the dependencies within the project. Check the list of dependencies in `package.json` in the project root, Install the dependencies with the following command.

```sh
$ npm install
```

## How to use

The recommended way to include this sdk into your project is by using npm. Install it into your project as a dependency with

```sh
$ npm install penneo-js-sdk --save
```

Then either use the commands on the `node` execution context (server) or use a bundler tool like `Browserify` or `Webpack` to include the modules in the browser context.

## Import into your project

To include this project you need to require the module by using CommonJS syntax and then calling the available functions in the SDK.

Every function needs to run with a callback that will return the response. You can check the different types of responses in the documentation

```js
var penneo = require('./path/to/sdk');

penneo.authenticate(function(response){
	console.log('authenticated');
});
```

If you want to use the new ES6 syntax, you need a tool like Babel, that transpiles your code to ES5 and builds a distribution version. the same example outlined above, in conjunction with `Browserify` would result in

```js
import penneo from 'penneo-js-sdk' // import directly from node_module

penneo.authenticate(function(response){
	console.log('authenticated');
});
```
