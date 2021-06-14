const atributo = require("./Expresiones/Atributo");

new atributo.default(ide, valor, linea, col);

const tipo = require("./Simbolos/Tipo");

new tipo.default(tipo.tipoDato.CADENA);

const objeto = require("./Expresiones/Objeto");

new objeto.default(ide, contenido, atributos, objetos, fila, columna);
