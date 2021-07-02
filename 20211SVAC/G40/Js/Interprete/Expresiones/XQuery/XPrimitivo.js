"use strict";

var XPrimitivo = /** @class */ (function () {
    function XPrimitivo(valor, linea, columna, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.tipo = tipo;
        this.cadena = false;
    }
    XPrimitivo.prototype.getTipo = function () {
        return this.tipo;
    };
    XPrimitivo.prototype.getValorImplicito = function (entorno) {

        if((this.tipo == TipoXPrimitivo.NUMERO) || (this.tipo == TipoXPrimitivo.CADENA)){
            return this.valor;
        } else if ((this.tipo == TipoXPrimitivo.IDENTIFICADOR) || (this.tipo == TipoXPrimitivo.IDFLOWER)){

            var valorAux = entorno.getSimbolo(this.valor);

            if(valorAux != null){
                return valorAux.getValor();
            } else {
                ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", this.valor + " no está definido.","XQUERY")); NumeroE++;
                return null;
            }
        }
    
    };
    XPrimitivo.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    XPrimitivo.prototype.esCadena = function () {
        return this.cadena;
    };

    XPrimitivo.prototype.setCadena = function (cadena) {
        this.cadena = cadena;
    };

    return XPrimitivo;
}());

