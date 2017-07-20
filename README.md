# app_modules

Get rid of relative import syntax by making app subdirectories appear as custom-named modules to require/import.

E.g.,
```javascript
require('app/foo');
// instead of
require('../../../foo');
```

## Install
```shell
npm install app_modules
```

## How

If requiring a relative file like this makes you sad:
```javascript
// in projectroot/src/a/b/c.js we need a reference to
//    projectroot/src/foor/bar.js
var foo = require('../../../foo/bar');
```

Do this instead:
```javascript
// before requiring other files...
var app_modules = require('app_modules');

app_modules.initModulesPath('/path/to/my/project/');  
app_modules.addModule('app', '/path/to/my/project/src/');
```

Now you can do:
```javascript
var bar = require('app/foo/bar'); // profit!
```

Note that if you transpile your code, say from src/ to lib/, just dynamically generate the right path at load time, replacing
```javascript
app_modules.addModule('app', '/path/to/my/project/src/');
```
with
```javascript
app_modules.addModule('app', '/path/to/my/project/lib/');
```
Your references to app/foo/bar work in both the source and transpiled code.

## How it works

The `initModulesPath` function creates a directory (named app_modules by default) in your project root, and adds this to your NODE_PATH.  The `addModules` function symlinks subdirectories of your choice into the app_modules directory.  


### Warning

This library uses an old but unofficial method `_initPaths` defined on the `Modules` class.

## API

### initModulesPath

Ensures a directory exists in the project root and adds it to the NODE_PATH.  Directories in this folder will be accessible as modules.

```javascript
initModulesPath(projectRoot, app_modules_dirname)
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
