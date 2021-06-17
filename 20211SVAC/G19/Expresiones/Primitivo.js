"use strict";
var Primitivo = /** @class */ (function () {
    function Primitivo(valor, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    Primitivo.prototype.getTipo = function (ent, arbol) {
        var valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return 'boolean';
        }
        else if (typeof (valor) === 'string') {
            return 'string';
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return 'number';
            }
            return 'double';
        }
        else if (valor === null) {
            return 'null';
        }
        return 'void';
    };
    Primitivo.prototype.getValorImplicito = function (ent, arbol) {
        return this.valor;
    };
    Primitivo.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    return Primitivo;
}());
//# sourceMappingURL=Primitivo.js.map