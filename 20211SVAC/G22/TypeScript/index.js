"use strict";

var gramatica = require('./gramar-xml');
function ejecutarCodigo(entrada) {
    var objetos = gramatica.parse(entrada);

    //const ast:AST = new AST(instrucciones);
    //instrucciones.forEach((element:Instruccion) => {
    //    element.ejecutar(entornoGlobal,ast);
    //});
}
ejecutarCodigo("\n<bookstore>\n<book>\n  <title lang=\"en\" > Harry Potter </title >\n  <author > J K. Rowling </author >\n  <year > 2005 </year >\n  <price > 29.99 </price >\n</book >\n</bookstore >\n");
