"use strict";
exports.__esModule = true;
exports.Resultado = void 0;
var Resultado = /** @class */ (function () {
    function Resultado(exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }
    Resultado.prototype.ejecutar = function (ent, arbol) {
        var valor = this.expresion.getValorImplicito(ent, arbol);
        //const valor = this.expresion.getTipo(ent, arbol);
        //console.log(this.expresion);
        if (valor !== null) {
            console.log('>', valor);
        }
        else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    };
    return Resultado;
}());
exports.Resultado = Resultado;
