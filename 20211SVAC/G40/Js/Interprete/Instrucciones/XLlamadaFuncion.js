"use strict";

var XLlamadaFuncion = /** @class */ (function () {
    function XLlamadaFuncion(linea, columna, XLlamada, etiqueta1, etiqueta2) {
        this.linea = linea;
        this.columna = columna;
        this.XLlamada = XLlamada;
        this.etiqueta1 = etiqueta1;
        this.etiqueta2 = etiqueta2;
        this.tipo = TipoXInstruccion.XLLAMADARFUNCION;
    }
    XLlamadaFuncion.prototype.ejecutar = function (ent, arbol) {

        var expAux = "";

        if(this.etiqueta1 == this.etiqueta2){
            var entornoAux = new Entorno(null);
            var salida = this.XLlamada.getValorImplicito(entornoAux).toString();
            expAux = `<${this.etiqueta1}>${salida.toString()}</${this.etiqueta2}>\n`;
            return expAux;

        } else {
            ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", this.etiqueta1 +`> no es igual que `+this.etiqueta2 ,"XQUERY")); NumeroE++;
            return `<` + this.etiqueta1 +`> no es igual que </`+this.etiqueta2 + `>`;
        }     
    };


    XLlamadaFuncion.prototype.getTipo = function (){
        return this.tipo;
    };

    XLlamadaFuncion.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };


    return XLlamadaFuncion;
}());