"use strict";
exports.__esModule = true;
exports.Return = void 0;
var Return = /** @class */ (function () {
    function Return(Expresion, linea, columna, t) {
        this.Expresion = Expresion;
        this.linea = linea;
        this.columna = columna;
        this.t = t;
    }
    Return.prototype.ejecutar = function (Entorno, node) {
        console.log("Pasó por return");
        if (this.Expresion != "nothing") {
            var retorno = this.Expresion.ejecutar(Entorno, this.Expresion);
            if (retorno.length != undefined && !(retorno instanceof String)) {
                var cadenita_1 = "";
                retorno.forEach(function (element) {
                    cadenita_1 += element + "\n";
                });
                return cadenita_1;
            }
            return retorno;
        }
        else {
            return "return";
        }
    };
    return Return;
}());
exports.Return = Return;
