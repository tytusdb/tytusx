"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionLogica = void 0;
var TiposXpath_1 = require("./TiposXpath");
var OperacionLogica = /** @class */ (function () {
    function OperacionLogica(op_izquierda, op_derecha, operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    OperacionLogica.prototype.getTipo = function (arbol) {
        return TiposXpath_1.TiposXpath.STRING;
    };
    OperacionLogica.prototype.getValorImplicito = function (arbol) {
        return "en proceso";
    };
    return OperacionLogica;
}());
exports.OperacionLogica = OperacionLogica;
