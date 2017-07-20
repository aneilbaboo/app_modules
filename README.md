# app_modules

Get rid of relative import syntax by making app subdirectories appear as custom-named modules to require/import.

If need to do this in your app, but hate it:
```javascript
var myutils = require('../../../../src/bar');
```

Do this instead:
```javascript
// init_app_modules.js
var app_modules = require('app_modules');

app_modules.initModulesPath('/path/to/my/project/');  
app_modules.addModule('app', '/path/to/my/project/src');
```

Now you can do:
```javascript
var myutils = require('app/bar'); // profit!
```

## API

### initModulesPath

Ensures a directory exists in the project root and adds it to the NODE_PATH.  Directories in this folder will be accessible as modules.

```javascript
initModulesPath(projectRoot, app_modules_dirname)
```

projectRoot - path to the root dir of your node project
app_modules_dirname - defaults to 'app_modules'

## addModule
Symlinks a directory into your app_modules directory.

```javascript
addModule(moduleName, sourcePath)
```

moduleName - name you'd like the sourcePath to be accessible as
sourcePath - absolute path to a directory
