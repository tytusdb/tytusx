"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdSimple = void 0;
var TiposXpath_1 = require("./TiposXpath");
var IdSimple = /** @class */ (function () {
    function IdSimple(nombreId, linea, columna) {
        this.valorId = nombreId;
        this.tipo = TiposXpath_1.TiposXpath.ID_SIMPLE;
        this.linea = linea;
        this.columna = columna;
    }
    IdSimple.prototype.getTipo = function (arbol) {
        return this.tipo;
    };
    IdSimple.prototype.getValorImplicito = function (arbol) {
        return this.valorId;
    };
    return IdSimple;
}());
exports.IdSimple = IdSimple;
