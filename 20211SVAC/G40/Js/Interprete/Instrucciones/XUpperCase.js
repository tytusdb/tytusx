"use strict";

var XUpperCase = /** @class */ (function () {
    function XUpperCase(linea, columna, cadena) {
        this.linea = linea;
        this.columna = columna;
        this.cadena = cadena;
        this.tipo = TipoXInstruccion.XUPPER;
    }
    XUpperCase.prototype.ejecutar = function (ent, arbol) {
       
        var expAux = this.cadena.getValorImplicito("","");
        return expAux.toString().toUpperCase();

    };

    XUpperCase.prototype.getTipo = function (){
        return this.tipo;
    };
    return XUpperCase;
}());