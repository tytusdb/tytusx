const fs = require('fs')
const parser = require('xml2json')
 
var miObjeto;
fs.readFile('./library.xml',function(err,data){
    var json = parser.toJson(data);
    console.log("to Json ->", json);
    miObjeto = JSON.parse(json);
    console.log(miObjeto);
})
