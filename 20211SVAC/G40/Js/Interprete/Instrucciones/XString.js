"use strict";

var XString = /** @class */ (function () {
    function XString(linea, columna, expresion) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = TipoXInstruccion.XSTRING;
    }
    XString.prototype.ejecutar = function (ent, arbol) {
       
        var expAux = this.expresion.getValorImplicito("","");
        return expAux.toString();

    };

    XString.prototype.getTipo = function (){
        return this.tipo;
    };
    return XString;
}());