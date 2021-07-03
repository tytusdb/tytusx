"use strict";

var XIF = /** @class */ (function () {
    function XIF(linea, columna, condicion, condicion2, returnif, returnelseif, returnelse, tipo) {
        this.condicion = condicion;
        this.condicion2 = condicion2;
        this.returnif = returnif;
        this.returnelseif = returnelseif;
        this.returnelse = returnelse;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.entorno = null;
    }
    XIF.prototype.getTipo = function () {
        return this.tipo;
    };
    XIF.prototype.getValorImplicito = function (entorno) {

        if(this.tipo == TipoXIF.IF){

            if(this.condicion.getValorImplicito(entorno) == true){
                return this.returnif.getValorImplicito(entorno);
            } else {
                return this.returnelse.getValorImplicito(entorno);
            }

        } else if (this.tipo == TipoXIF.IFELSE) {

            if(this.condicion.getValorImplicito(entorno) == true){
                return this.returnif.getValorImplicito(entorno);
            } else if(this.condicion2.getValorImplicito(entorno) == true){
                return this.returnelseif.getValorImplicito(entorno);
            } else {
                return this.returnelse.getValorImplicito(entorno);
            }

        }

        this.entorno = entorno;
    
    };

    XIF.prototype.getEntorno = function () {
        return this.entorno;
    };

    XIF.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    return XIF;
}());

