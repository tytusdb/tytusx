"use strict";
exports.__esModule = true;
exports.tipoInstruccion = exports.Instruccion = exports.comprimidoInst = void 0;
var comprimidoInst = /** @class */ (function () {
    function comprimidoInst() {
    }
    return comprimidoInst;
}());
exports.comprimidoInst = comprimidoInst;
var Instruccion = /** @class */ (function () {
    function Instruccion(tipo, cadena, resultado, operador, arg1, arg2) {
        this.tipo = tipo;
        this.resultado = resultado;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.cadena = cadena;
        this.operador = operador;
    }
    Instruccion.prototype.getTipo = function () {
        return this.tipo;
    };
    Instruccion.prototype.getCadena = function () {
        return this.cadena;
    };
    return Instruccion;
}());
exports.Instruccion = Instruccion;
var tipoInstruccion;
(function (tipoInstruccion) {
    tipoInstruccion[tipoInstruccion["salto"] = 1] = "salto";
    tipoInstruccion[tipoInstruccion["salto_condicional"] = 2] = "salto_condicional";
    tipoInstruccion[tipoInstruccion["print"] = 3] = "print";
    tipoInstruccion[tipoInstruccion["etiqueta"] = 4] = "etiqueta";
    tipoInstruccion[tipoInstruccion["llamada_metodo"] = 5] = "llamada_metodo";
    tipoInstruccion[tipoInstruccion["inicio_metodo"] = 6] = "inicio_metodo";
    tipoInstruccion[tipoInstruccion["return"] = 7] = "return";
    tipoInstruccion[tipoInstruccion["asignacion_temporal"] = 8] = "asignacion_temporal";
    tipoInstruccion[tipoInstruccion["asignacion_stack"] = 9] = "asignacion_stack";
    tipoInstruccion[tipoInstruccion["asignacion_heap"] = 10] = "asignacion_heap";
    tipoInstruccion[tipoInstruccion["acceso_stack"] = 11] = "acceso_stack";
    tipoInstruccion[tipoInstruccion["acceso_heap"] = 12] = "acceso_heap";
    tipoInstruccion[tipoInstruccion["encabezado"] = 13] = "encabezado";
})(tipoInstruccion = exports.tipoInstruccion || (exports.tipoInstruccion = {}));
