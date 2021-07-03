"use strict";

var XValor = /** @class */ (function () {
    function XValor(expresion, linea, columna, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.valor = expresion;
        this.tipo = tipo;
    }
    XValor.prototype.getTipo = function () {
        return this.tipo;
    };
    XValor.prototype.getValorImplicito = function (entorno) {

        if(this.tipo == TipoXValor.PRIMITIVO){

            return this.valor.getValorImplicito(entorno);
            
        } else if (this.tipo == TipoXValor.XPATH) {
            var xpathAux = this.valor.ejecutar(tablaSimbolosXML.getEntornoGlobal(),null);
            if (xpathAux.length == 1){
                return xpathAux[0].getTexto();
            } else if (xpathAux.length <= 0){
                ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", `La Expresion XPath no retorna ningun resultado`,"XQUERY")); NumeroE++;  
                return null;
            } else {
                ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", `La Expresion XPath retorna más de un resultado`,"XQUERY")); NumeroE++; 
                return null;
            }
        }
        
    };
    XValor.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    return XValor;
}());

