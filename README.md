[![CircleCI](https://circleci.com/gh/aneilbaboo/app_modules.svg?style=shield&circle-token=5aa6e3e9eae97facd7cd6426c0a582fd3674e3bc)](https://circleci.com/gh/aneilbaboo/app_modules)

# app_modules

Get rid of relative import syntax by making app subdirectories appear as modules.

E.g.,
```javascript
require('app/foo');
// instead of
require('../../../foo');
```

Works seemlessly with transpiled code (see below).

## Install
```shell
npm install app_modules
```

## Configure

Run code like the following as early as possible in your app:

```javascript
// before requiring other files...
var app_modules = require('app_modules');

// IRL, compute the following paths dynamically:

// initialize the library (this creates an app_modules dir in your project root):
app_modules.init('/path/to/my/project/');   

// make src/ available as a module named app:
app_modules.addModule('app', '/path/to/my/project/src/'); // app_modules/app now points to src/
```

### Example

Given a Node.js project as follows:

```shell
- myproject
  - package.json
  - src/
    - main.js # start script
    - foo/
      - bar.js
  - lib/ # transpiled code
```

Initialize app_modules with dynamically computed paths:

```javascript
// src/main.js
var app_modules = require('app_modules');
var path = require('path');

app_modules.init(path.resolve(__dirname, '..'));  // path of project root
app_modules.addModule('app', __dirname);  // dynamically link app to either src/ or lib/

// ... continue loading
```

Now you can write:
```javascript
var bar = require('app/foo/bar');
```

The `app` module links correctly to `src/` or `lib/` depending on whether you're running the untranspiled `src/main.js` or transpiled `lib/main.js` code.

### Warning

This library uses an old but unofficial method `_initPaths` defined on the `Modules` class.  

## API

### init

Ensures a directory exists in the project root and adds it to the NODE_PATH.  Directories in this folder will be accessible as modules.

```javascript
init(projectRoot, app_modules_dirname)
// where
// projectRoot - path to the root dir of your node project
// app_modules_dirname - defaults to 'app_modules'
```

### addModule
Symlinks a directory into your app_modules directory.

```javascript
addModule(moduleName, sourcePath)
// where
// moduleName - name you'd like the sourcePath to be accessible as
// sourcePath - absolute path to a directory
```
