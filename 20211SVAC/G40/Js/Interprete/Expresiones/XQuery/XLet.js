"use strict";

var XLet = /** @class */ (function () {
    function XLet(linea, columna, identificador, valor, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.valor = valor;
        this.tipo = tipo;
        this.entorno = null;
    }
    XLet.prototype.getTipo = function () {
        return this.tipo;
    };
    XLet.prototype.getID = function () {
        return this.identificador;
    };
    
    XLet.prototype.getValorImplicito = function (entorno) {

        var entornoPadre = entorno;

        if(entornoPadre.existe(this.identificador) == false){

            var valorAux = this.valor.getValorImplicito(entornoPadre);

            if((typeof (valorAux) === 'number') && (this.isInt(Number(valorAux)) == true)){
                    
                var simboloAux = new Simbolo(Tipo.INT, this.identificador, this.linea, this.linea, valorAux, 0);
                entornoPadre.agregar(simboloAux.getID(),simboloAux);
                this.entorno = entornoPadre;
                return "";
            
            } else if((typeof (valorAux) === 'number') && (this.isInt(Number(valorAux)) == false)){
                
                var simboloAux = new Simbolo(Tipo.DOUBLE, this.identificador, this.linea, this.linea, valorAux, 0);
                entornoPadre.agregar(simboloAux.getID(),simboloAux);
                this.entorno = entornoPadre;
                return "";
            
            } else if((typeof (valorAux) === 'boolean')){
                
                var simboloAux = new Simbolo(Tipo.BOOL, this.identificador, this.linea, this.linea, (valorAux === 'true'), 0);
                entornoPadre.agregar(simboloAux.getID(),simboloAux);
                this.entorno = entornoPadre;
                return "";
            
            } else if((typeof (valorAux) === 'string')){
                
                var simboloAux = new Simbolo(Tipo.STRING, this.identificador, this.linea, this.linea, valorAux, 0);
                entornoPadre.agregar(simboloAux.getID(),simboloAux);
                this.entorno = entornoPadre;
                return "";
            }        

        } else {
            this.entorno = entorno;
            ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", "La variable " + this.identificador + " ya ha sido declarada.","XQUERY")); NumeroE++;
            return "";
        }

    };
    XLet.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    XLet.prototype.getEntorno = function () {
        return this.entorno;
    };

    return XLet;
}());

