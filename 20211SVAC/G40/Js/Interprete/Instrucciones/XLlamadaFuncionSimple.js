"use strict";

var XLlamadaFuncionSimple = /** @class */ (function () {
    function XLlamadaFuncionSimple(linea, columna, XLlamada) {
        this.linea = linea;
        this.columna = columna;
        this.XLlamada = XLlamada;
        this.tipo = TipoXInstruccion.XLLAMADARFUNCION;
    }
    XLlamadaFuncionSimple.prototype.ejecutar = function (ent, arbol) {

        var expAux = "";
        var entornoAux = new Entorno(null);
        var salida = this.XLlamada.getValorImplicito(entornoAux).toString();
        expAux = salida.toString();
        return expAux;
          
    };


    XLlamadaFuncionSimple.prototype.getTipo = function (){
        return this.tipo;
    };

    XLlamadaFuncionSimple.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };


    return XLlamadaFuncionSimple;
}());