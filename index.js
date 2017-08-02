/**
 * Creates symlink of the source directory in app_modules
 * and adds app_modules to node's module require path.
 * This makes it possible to require without relative paths
 * DO NOT MOVE THIS FILE!!
 **/

var fs = require('fs');
var path = require('path');
var moduleRequirePath;

function makeSymlinkModule(sourcePath, moduleName) {
  var modulePath = path.resolve(moduleRequirePath, moduleName);
  try {
    if (fs.readlinkSync(modulePath)) {
      // the symlink exists - we must remove it
      fs.unlinkSync(modulePath);
    }
  } catch (e) {
    // good! the symlink doesn't exist
  }

  fs.symlinkSync(sourcePath, modulePath);
}

function addModuleRequirePath(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  var existingPath = process.env.NODE_PATH;
  if (existingPath) {
    if (!existingPath.includes(dir)) {
      process.env.NODE_PATH= [ existingPath, dir ].join(":");
    }
  } else {
    process.env.NODE_PATH = dir;
  }
  require("module").Module._initPaths(); // a bit hacky!
}

module.exports = {
  initModulesPath(projectRoot, modulesDirectory) {
    console.log('app_modules.initModulesPath is deprecated.  Use app_modules.init'); // eslint-disable-line
    return this.init(projectRoot, modulesDirectory);
  },
  init(projectRoot, modulesDirectory) {
    modulesDirectory = modulesDirectory || 'app_modules';
    moduleRequirePath = path.resolve(projectRoot, modulesDirectory);
    addModuleRequirePath(moduleRequirePath);
  },
  addModule(name, sourcePath) {
    makeSymlinkModule(sourcePath, name);
  }
};
