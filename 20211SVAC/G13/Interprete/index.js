var parseXPath = require("./analizadorXPath/Xpath");
var parseXML = require('./analizadorXML/grammar');

var fs = require('fs');

function exec(input1, input2) {
    var xml = parseXML.parse(input1);

    if(xml.errores.length > 0) {
        console.log(xml.errores);

    } else {
        var data = xml.datos;
        var xpath = parseXPath.parse(input2);
        
        if(xpath.errores.length > 0) {
            console.log(xpath.errores);
        } else {
            var retorno = xpath.Ejecutar(data);
            console.log(retorno);
        }
    }
}
module.exports.exec = exec;

function ejecutar(input) {
    var input1 = fs.readFileSync('../src/simp.xml').toString();
    var xml = parseXML.parse(input1);

    if(xml.errores.length > 0) {
        console.log('F super F');
        console.log(xml.errores);

    } else {
        console.log('XML superado');
        
        var data = xml.datos;
        var xpath = parseXPath.parse(input);
        
        if(xpath.errores.length > 0) {
            console.log('F mega F');
            console.log(xpath.errores);
        } else {
            console.log('XPath superado');
            var retorno = xpath.Ejecutar(data);
            console.log(retorno);
        }
    }
}

ejecutar('catalog/book[last()] | catalog/book[last() - 1]');