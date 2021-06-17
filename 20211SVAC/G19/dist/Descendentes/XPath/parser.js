var fs = require('fs'); 

var parser = require('../gramaticaXPath');

let ast
fs.readFile('./XPATH/entrada2.txt',p, (err, data) => {
    if (err) throw err;
    ast =parser.parse(data.toString());
  //  console.log(t.reporte)
    console.log(ast.tree.children[0]);

    
});