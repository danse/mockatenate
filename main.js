function clone(o) {
    return JSON.parse(JSON.stringify(o));
}
  
// > addThis({}, ['one'], 'a')
// {"one":"a"}
// > addThis({one:'b'}, ['one'], 'a')
// {"one":"a"}
// > addThis({one:{two:'b'}}, ['one', 'three'], 'a')
// {"one":{"two":"b", "three":"a"}}
function addThis(obj, steps, content) {
    var result = clone(obj);
    var pointer = result;
    var last = steps.pop();
    steps.map(function(step) {
        if(!(step in pointer)) {
            pointer[step] = {};
        }
        pointer = pointer[step];
    });
    pointer[last] = content;
    return result;
}

// > finalWrap({hey:'Joe'})
// 'var mocks = {"hey":"Joe"};'
function finalWrap(json) {
    return 'var mocks = ' + JSON.stringify(json) + ';';
}

exports.addThis = addThis;
exports.finalWrap = finalWrap;
