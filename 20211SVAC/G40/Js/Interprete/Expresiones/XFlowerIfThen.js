"use strict";

var XFlowerIfThen = /** @class */ (function () {
    function XFlowerIfThen(condicion, datareturn, linea, columna) {
        this.linea = linea;
        this.condicion = condicion
        this.datareturn = datareturn;
        this.columna = columna;
        this.tipo = "";
    }
    XFlowerIfThen.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    XFlowerIfThen.prototype.getValorImplicito = function (objetosPadre, arbol) {


        var resultadoconsulta = this.condicion.getValorImplicito(objetosPadre,"")[0];

        if(resultadoconsulta.length>0){

            return this.datareturn.getValorImplicito(objetosPadre,"");

        } else {
            return [null,null];
        }


    };
    return XFlowerIfThen;
}());

