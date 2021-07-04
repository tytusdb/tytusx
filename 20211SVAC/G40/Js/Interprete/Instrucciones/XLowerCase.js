"use strict";

var XLowerCase = /** @class */ (function () {
    function XLowerCase(linea, columna, cadena) {
        this.linea = linea;
        this.columna = columna;
        this.cadena = cadena;
        this.tipo = TipoXInstruccion.XLOWER;
    }
    XLowerCase.prototype.ejecutar = function (ent, arbol) {
       
        var expAux = this.cadena.getValorImplicito("","");
        return expAux.toString().toLowerCase();

    };

    XLowerCase.prototype.getTipo = function (){
        return this.tipo;
    };

    XLowerCase.prototype.getCadena = function (){
        return this.cadena.getValorImplicito("","").toString();
    };

    return XLowerCase;
}());