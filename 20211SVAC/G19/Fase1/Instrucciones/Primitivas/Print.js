"use strict";
var Print = /** @class */ (function () {
    function Print(exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }
    Print.prototype.ejecutar = function (ent, arbol) {
        var valor = this.expresion.getValorImplicito(ent, arbol);
        if (valor !== null) {
            console.log('>', valor);
        }
        else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    };
    return Print;
}());
//# sourceMappingURL=Print.js.map