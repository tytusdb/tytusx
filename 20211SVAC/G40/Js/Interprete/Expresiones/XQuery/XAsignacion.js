"use strict";

var XAsignacion = /** @class */ (function () {
    function XAsignacion(linea, columna, identificador, valor, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.valor = valor;
        this.tipo = tipo;
        this.entorno = null;
    }
    XAsignacion.prototype.getTipo = function () {
        return this.tipo;
    };
    XAsignacion.prototype.getValorImplicito = function (entorno) {

        var entornoPadre = entorno;

        if(entornoPadre.existe(this.identificador) == true){

            var valorAux = this.valor.getValorImplicito(entornoPadre);

            if((typeof (valorAux) === 'number') && (this.isInt(Number(valorAux)) == true)){
                    
                var simboloAux = new Simbolo(Tipo.INT, this.identificador, this.linea, this.linea, valorAux, 0);
                entornoPadre.reemplazar(simboloAux.getID(),simboloAux);
                this.entorno = entornoPadre;
                return "";
            
            } else if((typeof (valorAux) === 'number') && (this.isInt(Number(valorAux)) == false)){
                
                var simboloAux = new Simbolo(Tipo.DOUBLE, this.identificador, this.linea, this.linea, valorAux, 0);
                entornoPadre.reemplazar(simboloAux.getID(),simboloAux);
                this.entorno = entornoPadre;
                return "";
            
            } else if((typeof (valorAux) === 'boolean')){
                
                var simboloAux = new Simbolo(Tipo.BOOL, this.identificador, this.linea, this.linea, (valorAux === 'true'), 0);
                entornoPadre.reemplazar(simboloAux.getID(),simboloAux);
                this.entorno = entornoPadre;
                return "";
            
            } else if((typeof (valorAux) === 'string')){
                
                var simboloAux = new Simbolo(Tipo.STRING, this.identificador, this.linea, this.linea, valorAux, 0);
                entornoPadre.reemplazar(simboloAux.getID(),simboloAux);
                this.entorno = entornoPadre;
                return "";
            } 


        } else {
            this.entorno = entorno;
            ListaErr.reemplazarError(new Error(NumeroE, this.linea, this.columna, "Semántico", "La variable " + this.identificador + " no ha sido declarada.","XQUERY")); NumeroE++;
            return "";
        }

    
    };
    XAsignacion.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    XAsignacion.prototype.getEntorno = function () {
        return this.entorno;
    };

    return XAsignacion;
}());

