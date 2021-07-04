"use strict";
exports.__esModule = true;
exports.Operador = void 0;
var Tipo_js_1 = require("./Tipo.js");
var Operador = /** @class */ (function () {
    function Operador(tipo, valor, etiqueta) {
        this.contenido = new Array();
        this.temp = [];
        this.contador = 0;
        this.tipo = tipo;
        this.valor = valor;
        this.etiqueta = etiqueta;
    }
    Operador.prototype.ejecutar = function (Entorno, node) {
        console.log("ESTÁ EN OPERADOR");
        if (this.etiqueta == null) {
            var respuesta = this.VerificarTipo(Entorno);
            if (respuesta == null) {
                return null;
            }
            return respuesta;
        }
        else {
            var respuesta = this.VerificarTipo(Entorno);
            if (respuesta != null) {
                return { etiqueta: this.etiqueta };
            }
            else {
                return respuesta;
            }
        }
    };
    Operador.prototype.VerificarTipo = function (entorno) {
        if (this.tipo == Tipo_js_1.Tipo.STRING) {
            try {
                var str = String(this.valor);
                var newCad = "";
                for (var i = 0; i < str.length; i++) {
                    if (i != 0 && i != str.length - 1) {
                        newCad += str[i];
                    }
                }
                return String(newCad);
            }
            catch (Error) {
                //error semántico
                return null;
            }
        }
        else if (this.tipo == Tipo_js_1.Tipo.DECIMAL || this.tipo == Tipo_js_1.Tipo.DOUBLE || this.tipo == Tipo_js_1.Tipo.FLOAT) {
            try {
                return parseFloat(this.valor);
            }
            catch (Error) {
                //error semántico
                return null;
            }
        }
        else if (this.tipo == Tipo_js_1.Tipo.INTEGER) {
            try {
                return parseInt(this.valor);
            }
            catch (Error) {
                //error semántico
                return null;
            }
        }
        else if (this.tipo == Tipo_js_1.Tipo.BOOLEAN) {
            try {
                return Boolean(this.valor);
            }
            catch (Error) {
                return null;
            }
        }
        else if (this.tipo == Tipo_js_1.Tipo.VARIABLE) {
            var variable = entorno.buscarVariable(this.valor, entorno);
            if (variable != null) {
                return variable.Valor.valor;
            }
            else {
                //No existe la variable, error semántico
                return null;
            }
        }
        else if (this.tipo == Tipo_js_1.Tipo.LLAMADA) {
            return this.valor.ejecutar(entorno, this.valor);
        }
        else {
            //error semántico
            return null;
        }
    };
    return Operador;
}());
exports.Operador = Operador;
