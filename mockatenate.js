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
    files.map(function(file) {
        var steps = path.basename(file, path.extname(file)).split(path.sep);
        var deferred = Q.defer();
        promises.push(deferred.promise);
        fs.readFile(file, 'utf8', function(err, content) {
            if (err) throw err;
            try {
                var parsed = JSON.parse(content);
            } catch (e) {
                console.log('error while parsing file', file, 'as JSON');
                console.log(e);
            }
            mocks = main.addThis(mocks, steps, parsed);
            deferred.resolve();
        });
    });
    Q.all(promises).then(function() {
        var content = main.finalWrap(mocks);
        fs.writeFile(output, content, function() {
            console.log('mocks concatenated in the file', output);
        })
    });
});
