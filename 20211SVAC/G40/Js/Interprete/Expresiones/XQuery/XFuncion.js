"use strict";

var XFuncion = /** @class */ (function () {
    function XFuncion(linea, columna, id, parametros, instrucciones, retorno) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.tipoRetorno = retorno;
        this.entorno = null;
    }

    XFuncion.prototype.getID = function () {
        return this.identificador;
    };

    XFuncion.prototype.getTipo = function () {
        return this.tipo;
    };

    XFuncion.prototype.getValorImplicito = function (valores, entorno) {
        
        var valoresAux = valores;
        var instrucionesAux = this.instrucciones;
        var entornoAux = entorno;

        if(this.parametros.length == valoresAux.length){

           var parametrosCorrectos = this.generarEntorno(this.parametros, valoresAux, entornoAux);

           if(parametrosCorrectos == true){

                var resultadoXFuncion = "";

                for(var i = 0; i < instrucionesAux.length; i++){

                    var resultadoAux = instrucionesAux[i].getValorImplicito(this.entorno);   
                        this.entorno = instrucionesAux[i].getEntorno();             
                        resultadoXFuncion = resultadoAux;                  

                    if(instrucionesAux[i].getTipo() == TipoXSENFUNCION.XRETURN){
                        return resultadoXFuncion;
                    }              
                }

                return resultadoXFuncion;

           } else {
            return "";
           }

        } else {
            ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", "La función " + this.identificador + "() recibe " + this.parametros.length + " parámetros.","XQUERY")); NumeroE++;
            return "";
        }
        
    };

    XFuncion.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    XFuncion.prototype.getParametros = function () {
        return this.parametros;
    };

    XFuncion.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };

    XFuncion.prototype.getTipoRetorno = function () {
        return this.tipoRetorno;
    };

    XFuncion.prototype.generarEntorno = function(parametros, valores, entorno){

        function EsNumero(str) {
            if (typeof str != "string") return false 
            return !isNaN(str) && !isNaN(parseFloat(str)) 
        }

        var entornoPadre = entorno;
        var entornoAux = new Entorno(null);

        for(var i = 0; i < parametros.length; i++){


            //Esto recibe un valor INTEGER, DOUBLE, FLOAT, STRING O BOOLEAN
            if(valores[i].getTipo() == TipoXValor.PRIMITIVO){

                var valorAux = valores[i].getValorImplicito(entornoPadre);

                if((parametros[i].getTipo() == TipoXDataType.INTEGER) && (typeof (valorAux) === 'number') && (this.isInt(Number(valorAux)) == true)){
                    
                    var simboloAux = new Simbolo(Tipo.INT, parametros[i].getID(), this.linea, this.linea, valorAux, 0);
                    entornoAux.agregar(simboloAux.getID(),simboloAux);
                
                } else if((parametros[i].getTipo() == TipoXDataType.DOUBLE) && (typeof (valorAux) === 'number') && (this.isInt(Number(valorAux)) == false)){
                    
                    var simboloAux = new Simbolo(Tipo.DOUBLE, parametros[i].getID(), this.linea, this.linea, valorAux, 0);
                    entornoAux.agregar(simboloAux.getID(),simboloAux);
                
                } else if((parametros[i].getTipo() == TipoXDataType.FLOAT) && (typeof (valorAux) === 'number') && (this.isInt(Number(valorAux)) == false)){
                    
                    var simboloAux = new Simbolo(Tipo.DOUBLE, parametros[i].getID(), this.linea, this.linea, valorAux, 0);
                    entornoAux.agregar(simboloAux.getID(),simboloAux);
                
                } else if((parametros[i].getTipo() == TipoXDataType.DECIMAL) && (typeof (valorAux) === 'number') && (this.isInt(Number(valorAux)) == false)){
                    
                    var simboloAux = new Simbolo(Tipo.DOUBLE, parametros[i].getID(), this.linea, this.linea, valorAux, 0);
                    entornoAux.agregar(simboloAux.getID(),simboloAux);
                
                } else if((parametros[i].getTipo() == TipoXDataType.BOOLEAN) && (typeof (valorAux) === 'boolean')){
                    
                    var simboloAux = new Simbolo(Tipo.BOOL, parametros[i].getID(), this.linea, this.linea, (valorAux === 'true'), 0);
                    entornoAux.agregar(simboloAux.getID(),simboloAux);
                
                } else if((parametros[i].getTipo() == TipoXDataType.STRING) && (typeof (valorAux) === 'string')){
                    
                    var simboloAux = new Simbolo(Tipo.STRING, parametros[i].getID(), this.linea, this.linea, valorAux, 0);
                    entornoAux.agregar(simboloAux.getID(),simboloAux);
                
                } else {
                    ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", `Parámetro no válido`,"XQUERY")); NumeroE++;  
                    return false;
                }



            } else if (valores[i].getTipo() == TipoXValor.XPATH) {

                var valorAux = valores[i].getValorImplicito(entornoPadre);

                if(valorAux!= null){

                    if((parametros[i].getTipo() == TipoXDataType.INTEGER) && (EsNumero(valorAux)==true) && (this.isInt(Number(valorAux)) == true)){
                    
                        var simboloAux = new Simbolo(Tipo.INT, parametros[i].getID(), this.linea, this.linea, Number(valorAux), 0);
                        entornoAux.agregar(simboloAux.getID(),simboloAux);
                    
                    } else if((parametros[i].getTipo() == TipoXDataType.DOUBLE) && (EsNumero(valorAux)==true) && (this.isInt(Number(valorAux)) == false)){
                    
                        var simboloAux = new Simbolo(Tipo.DOUBLE, parametros[i].getID(), this.linea, this.linea,  Number(valorAux), 0);
                        entornoAux.agregar(simboloAux.getID(),simboloAux);
                    
                    } else if((parametros[i].getTipo() == TipoXDataType.FLOAT) && (EsNumero(valorAux)==true) && (this.isInt(Number(valorAux)) == false)){
                        
                        var simboloAux = new Simbolo(Tipo.DOUBLE, parametros[i].getID(), this.linea, this.linea,  Number(valorAux), 0);
                        entornoAux.agregar(simboloAux.getID(),simboloAux);
                    
                    } else if((parametros[i].getTipo() == TipoXDataType.DECIMAL) && (EsNumero(valorAux)==true) && (this.isInt(Number(valorAux)) == false)){
                        
                        var simboloAux = new Simbolo(Tipo.DOUBLE, parametros[i].getID(), this.linea, this.linea,  Number(valorAux), 0);
                        entornoAux.agregar(simboloAux.getID(),simboloAux);
                    
                    }else if((parametros[i].getTipo() == TipoXDataType.STRING) && (typeof (valorAux) === 'string')){
                    
                        var simboloAux = new Simbolo(Tipo.STRING, parametros[i].getID(), this.linea, this.linea, valorAux, 0);
                        entornoAux.agregar(simboloAux.getID(),simboloAux);
                    
                    } else {
                        ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", `Parámetro no válido`,"XQUERY")); NumeroE++;  
                        return false;
                    }

                } else {
                    ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", `La expresión XPATH no retorna un valor valido.`,"XQUERY")); NumeroE++;  
                    return false;
                }
            }
        }

        this.entorno = entornoAux;
        return true;

    }


    return XFuncion;
}());
