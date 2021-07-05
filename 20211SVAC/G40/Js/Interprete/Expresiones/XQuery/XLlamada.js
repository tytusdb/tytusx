"use strict";

var XLlamada = /** @class */ (function () {
    function XLlamada(id, linea, columna, valores, tipo) {
        this.id = id;
        this.linea = linea;
        this.columna = columna;
        this.valores = valores;
        this.tipo = tipo;
    }
    XLlamada.prototype.getTipo = function () {
        return this.tipo;
    };
    XLlamada.prototype.getValorImplicito = function (entorno) {

        var entornoPadre = entorno;
        var xfuncionAux = null;
        var resultadoAux = null;

        for(var i = 0; i < funcionesXQuery.length; i++){

            if(funcionesXQuery[i].getID() == this.id){
                xfuncionAux = funcionesXQuery[i];
                break;
            }
        }

        if(xfuncionAux != null){           
            resultadoAux = xfuncionAux.getValorImplicito(this.valores, entornoPadre);
        }
        
        return resultadoAux;

    };
    XLlamada.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    return XLlamada;
}());

