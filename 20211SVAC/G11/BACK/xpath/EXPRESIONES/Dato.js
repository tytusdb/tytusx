"use strict";
exports.__esModule = true;
exports.Dato = void 0;

var Dato = /** @class */ (function () {
    function Dato(valor, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    Dato.prototype.getTipo = function (ent, arbol) {
        var valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return TipoXpath.BOOL;
        }
        else if (typeof (valor) === 'string') {
            return TipoXpath.CADENA;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return TipoXpath.ENTERO;
            }
            return TipoXpath.DECIMAL;
        }
        return TipoXpath.IDENTIFICADOR;
    };
    Dato.prototype.getValorImplicito = function (ent, arbol) {
        return this.valor;
    };
    Dato.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    return Dato;
}());
exports.Dato = Dato;
