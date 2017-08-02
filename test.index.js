var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var tmp = require('tmp');

var app_modules = require('./index');

var tmpObj;
var testDir;

/**
* Remove directory recursively
* @param {string} dir_path
* @see https://stackoverflow.com/a/42505874/3027390
*/
function rimraf(dir_path) {
  if (fs.existsSync(dir_path)) {
    fs.readdirSync(dir_path).forEach(function(entry) {
      var entry_path = path.join(dir_path, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        rimraf(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(dir_path);
  }
}

describe('app_modules', function () {
  beforeEach(function () {
    tmpObj = tmp.dirSync();
    testDir = tmpObj.name;
  });

  afterEach(function () {
    rimraf(testDir);
  });

  context('init', function () {
    it('should create an directory with the specify name', function () {
      app_modules.init(testDir, 'testing');
      expect(fs.statSync(path.resolve(testDir, 'testing')).isDirectory()).to.be.ok;
    });

    it('should create an app_modules directory if name is not specified', function () {
      app_modules.init(testDir);
      expect(fs.statSync(path.resolve(testDir, 'app_modules')).isDirectory()).to.be.ok;
    });
  });

  context('addModule', function () {
    it('should add a symlink to the app_modules directory', function () {
      app_modules.init(testDir);
      app_modules.addModule('xyz', path.resolve(__dirname, 'testModules'));
      expect(fs.lstatSync(path.resolve(testDir, 'app_modules/xyz')).isSymbolicLink()).to.be.ok;
    });

    it('should add a symlink that is accessible by require', function () {
      app_modules.init(testDir);
      app_modules.addModule('xyz', path.resolve(__dirname, 'testModules'));
      expect(require('xyz/foo/bar')).to.equal('baz!');
    });
  });
});
