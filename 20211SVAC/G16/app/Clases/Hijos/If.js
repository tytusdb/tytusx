"use strict";
exports.__esModule = true;
exports.If = void 0;
var Tipo_js_1 = require("./Tipo.js");
var Operaciones_js_1 = require("./Operaciones.js");
var If = /** @class */ (function () {
    function If(condicion, sentencias, sino, fila, columna, t) {
        this.condicion = condicion;
        this.sentencias = sentencias;
        this.sino = sino;
        this.fila = fila;
        this.columna = columna;
        this.t = t;
    }
    If.prototype.ejecutar = function (entorno, node) {
        var retorno = this.condicion.ejecutar(entorno, node);
        if (retorno != null && retorno != false) {
            if (this.sentencias instanceof Operaciones_js_1.Operacion) {
                var resultado = this.sentencias.ejecutar(entorno, this.sentencias);
                if (resultado != null) {
                    if (this.sino.operador1.tipo == Tipo_js_1.Tipo.VARIABLE) {
                        entorno.setVariable(this.sino.operador1.valor, resultado);
                    }
                    console.log("*****está en el if*****");
                    console.log(this.sentencias.operador1);
                    return resultado;
                }
            }
            return this.sentencias.ejecutar(entorno, this.sentencias);
        }
        else if (this.sino != null) {
            if (this.sino instanceof Operaciones_js_1.Operacion) {
                var resultado = this.sino.ejecutar(entorno, this.sino);
                if (resultado != null) {
                    if (this.sino.operador1.tipo == Tipo_js_1.Tipo.VARIABLE) {
                        entorno.setVariable(this.sino.operador1.valor, resultado);
                    }
                    console.log("****está en el sino*****");
                    console.log(this.sino);
                    return resultado;
                }
            }
            return this.sino.ejecutar(entorno, this.sino);
        }
    };
    return If;
}());
exports.If = If;
