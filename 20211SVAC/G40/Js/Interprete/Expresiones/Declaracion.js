"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Sentencia = void 0;
var Declaracion = /** @class */ (function () {
    function Declaracion(tipo, expresion, id, linea, columna) {
        this.linea = linea;
        this.expresion = expresion;
        this.id = id;
        this.columna = columna;
        this.tipo = tipo;
    }
    Declaracion.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    Declaracion.prototype.getValorImplicito = function (objetos, arbol) {

        var objetosAux = [];
        var entornosAux = [];


    };
    return Declaracion;
}());
//exports.Sentencia = Sentencia;
