"use strict";
exports.__esModule = true;
exports.OptiSintactico = void 0;
var Optimizador_1 = require("./Optimizador");
var OptiSintactico = /** @class */ (function () {
    function OptiSintactico() {
    }
    //converti el metodo en funcion para que devolviera algo
    OptiSintactico.optimizarC3D = function (texto, arbol) {
        var optimizador = new Optimizador_1.Optimizador();
        optimizador.inicializar();
        var salida = optimizador.optimizar(texto, arbol);
        optimizador.reportar();
        return salida;
    };
    return OptiSintactico;
}());
exports.OptiSintactico = OptiSintactico;
