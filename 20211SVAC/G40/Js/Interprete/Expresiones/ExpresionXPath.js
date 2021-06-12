"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.ExpresionXPath = void 0;
var ExpresionXPath = /** @class */ (function () {
    function ExpresionXPath(linea, columna, identificador, tipo, predicado) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.identificador = identificador;
        this.predicado = predicado;
    }
    ExpresionXPath.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    ExpresionXPath.prototype.getValorImplicito = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    return ExpresionXPath;
}());
//exports.ExpresionXPath = ExpresionXPath;