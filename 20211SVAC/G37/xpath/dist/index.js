"use strict";
const gramatica = require('../Gramatica/gramatica');
function ejecutarCodigo(entrada) {
    const objetos = gramatica.parse(entrada);
    console.table(objetos);
}
ejecutarCodigo(`
    .......
`);
