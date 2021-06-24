"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Declaracion = void 0;
var Declaracion = /** @class */ (function () {
    function Declaracion(linea, columna, tipo, ids, dato) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = "";
        this.tipo = tipo;
        this.instrucciones = [];
        this.ids = ids;
        this.dato = dato;


    }
    Declaracion.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };
    Declaracion.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Declaracion.prototype.getTipo = function () {
        return this.tipo;
    };
    Declaracion.prototype.getCodigo3D = function () {

        var idsAux = "";

        for (var i = 0; i < this.ids.length; i++) {
            if(i==0){
                idsAux += this.ids[i];
            } else {
                idsAux += ", " + this.ids[i];
            }
          }

        this.codigo = this.dato + " " + idsAux + ";\n";

        return this.codigo;
    };
    return Declaracion;
}());
//exports.Declaracion = Declaracion;
