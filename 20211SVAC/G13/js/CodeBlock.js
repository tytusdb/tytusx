"use strict";
//Clase para almacenar bloques de codigo de tres direcciones
Object.defineProperty(exports, "__esModule", { value: true });
var CodeBlock = /** @class */ (function () {
    /**
     * Constructor de bloque de codigo de tres direcciones
     * @param bloq arreglo de strings que contiene codigo de 3 direcciones
     * @param temps arreglos de string que contiene lista de temporales usados
     */
    function CodeBlock(bloq, temps) {
        this.bloques = bloq;
        this.temporales = temps;
    }
    CodeBlock.prototype.addBloque = function (bloq) {
        this.bloques.push(bloq);
    };
    CodeBlock.prototype.addTemporal = function (temp) {
        this.temporales.push(temp);
    };
    return CodeBlock;
}());
exports.CodeBlock = CodeBlock;
