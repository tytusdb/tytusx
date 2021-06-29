"use strict";


var XNumber = /** @class */ (function () {
    function XNumber(linea, columna, expresion) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = TipoXInstruccion.XNUMBER;
    }
    XNumber.prototype.ejecutar = function (ent, arbol) {

        var expAux = this.expresion.getValorImplicito("","");
        return Number(expAux.toString());
    };

    XNumber.prototype.getTipo = function (){
        return this.tipo;
    };

    return XNumber;
}());
