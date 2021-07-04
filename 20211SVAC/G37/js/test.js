"use strict";
exports.__esModule = true;
var Ambito_1 = require("../CLASES/Ambito");
var gramatica1 = require('../xml/GRAMATICAS/gramatica1');
var gramatica = require('../xpath/Gramatica/gramatica');
function ejecutarCodigo(txml, txpath) {
    var entradaXML = txml;
    var entradaQuery = txpath;
    var xml = gramatica1.parse(entradaXML);
    var query = gramatica.parse(entradaQuery);
    var entornoGlobal = new Ambito_1.Ambito(null);
    xml.array.forEach(function (elemento) {
        console.log(elemento.identificador);
    });
}
ejecutarCodigo("\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n<bookstore>\n\n<book>\n  <title lang=\"en\">Harry Potter</title>\n  <price>29.99</price>\n</book>\n\n<book>\n  <title lang=\"en\">Learning XML</title>\n  <price>39.95</price>\n</book>\n\n</bookstore> \n", "bookstore/book");
