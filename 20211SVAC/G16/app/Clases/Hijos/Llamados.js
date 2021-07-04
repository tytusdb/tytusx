"use strict";
exports.__esModule = true;
exports.Llamado = void 0;
var Funciones_js_1 = require("./Funciones.js");
var Llamado = /** @class */ (function () {
    function Llamado(prefijos, identificador, parametros, t) {
        this.array = new Array();
        this.prefijos = prefijos;
        this.identificador = identificador;
        this.parametros = parametros;
        this.t = t;
    }
    Llamado.prototype.ejecutar = function (entorno, node) {
        console.log("__________ESTÁ EN LLAMADO DE FUNCIÓN__________");
        var funcion = entorno.ExisteFuncion(this.identificador, entorno);
        if (funcion != null) {
            var func = funcion.Valor.valor;
            if (func != null) {
                if (func instanceof Funciones_js_1["default"]) {
                    this.array = [];
                    this.ObtenerValor(this.parametros, entorno);
                    console.log(this.array);
                    return func.ejecutar2(entorno, this.array);
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
    Llamado.prototype.ObtenerValor = function (parametro, entorno) {
        var _this = this;
        if (parametro instanceof Array) {
            parametro.forEach(function (param) {
                if (param instanceof Array) {
                    _this.ObtenerValor(param, entorno);
                }
                else {
                    var resultado = param.ejecutar(entorno, param);
                    if (resultado != undefined) {
                        _this.array.push(resultado);
                    }
                }
            });
        }
    };
    return Llamado;
}());
exports.Llamado = Llamado;
