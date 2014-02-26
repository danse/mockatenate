#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var program = require('commander');
var glob = require('glob');
var Q = require('q');
var main = require('mockatenate');


program.parse(process.argv);

program.on('-h, --help', function() {
    console.log('usage:');
    console.log('$ mockatenate <root_directory_for_your_mocks>');
});

var root = program.args[0];
var output = 'mock.js';
var mocks = {};

glob(root + '/**/*.json', function(er, files) {
    var promises = [];
    files.map(files, function(file) {
        var steps = path.basename(file).split(path.sep);
        var deferred = Q.defer();
        promises.push(deferred.promise);
        fs.read(file, function(content) {
            mocks = main.addThis(mocks, steps, content);
            deferred.resolve();
        });
    });
    Q.all(promises).then(function() {
        var content = main.finalWrap(mocks);
        fs.write(output, content, function() {
            console.log('mocks concatenated in the file', output);
        })
    });
});
