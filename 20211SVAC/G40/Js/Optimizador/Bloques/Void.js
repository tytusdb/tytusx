"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Void = void 0;
var Void = /** @class */ (function () {
    function Void(id, linea, columna, tipo, instrucciones) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.instrucciones = instrucciones;
        this.identificador = id;
        this.codigo = ""

    }
    Void.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };
    Void.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Void.prototype.getTipo = function () {
        return this.tipo;
    };
    Void.prototype.getCodigo3D = function () {

        var codigoAux = "void " + this.identificador + "(){\n\n";

        for (var i = 0; i < this.instrucciones.length; i++) {
            codigoAux += this.instrucciones[i].getCodigo3D() + "\n";
          }

        codigoAux += "}\n";

        this.codigo = codigoAux;

        return this.codigo;
    };
    return Void;
}());
//exports.Void = Void;
