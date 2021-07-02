var fs = require('fs');

var parser = require('../gramaticaXPath');

let tree
fs.readFile('./entrada2.txt', p, (err, data) => {
    if (err) throw err;
    tree = parser.parse(data);
    //  console.log(t.reporte)
    console.log(tree);


});