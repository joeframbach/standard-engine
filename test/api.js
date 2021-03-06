var Linter = require('../').linter
var path = require('path')
var test = require('tape')

// TODO: this test requires clone.js to be run first in order for the eslintrc to exist
var standard = new Linter({
  eslintConfig: {
    configFile: path.join(__dirname, '..', 'tmp', 'standard', 'rc', '.eslintrc'),
    useEslintrc: false
  }
})

test('api: lintFiles', function (t) {
  t.plan(3)
  standard.lintFiles([], { cwd: 'bin' }, function (err, result) {
    t.error(err, 'no error while linting')
    t.equal(typeof result, 'object', 'result is an object')
    t.equal(result.errorCount, 0)
  })
})

test('api: lintText', function (t) {
  t.plan(3)
  standard.lintText('console.log("hi there")\n', function (err, result) {
    t.error(err, 'no error while linting')
    t.equal(typeof result, 'object', 'result is an object')
    t.equal(result.errorCount, 1, 'should have used single quotes')
  })
})
