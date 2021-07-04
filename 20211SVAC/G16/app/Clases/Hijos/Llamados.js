"use strict";
exports.__esModule = true;
exports.Llamado = void 0;
var Funciones_js_1 = require("./Funciones.js");
var Llamado = /** @class */ (function () {
    function Llamado(prefijos, identificador, parametros, t) {
        this.prefijos = prefijos;
        this.identificador = identificador;
        this.parametros = parametros;
        this.t = t;
    }
    Llamado.prototype.ejecutar = function (entorno, node) {
        console.log("pasó por llamado de función");
        console.log(entorno);
        var funcion = entorno.ExisteFuncion(this.identificador, entorno);
        if (funcion != null) {
            var func = funcion.Valor.valor;
            if (func != null) {
                if (func instanceof Funciones_js_1["default"]) {
                    func.ejecutar2(entorno, this.parametros);
                }
                else {
                    console.log("F");
                }
            }
        }
        else {
            alert("La función que desea llamar no existe en el entorno actual");
        }
    };
    return Llamado;
}());
exports.Llamado = Llamado;
