"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Axes = void 0;
var Axes = /** @class */ (function () {
    function Axes(linea, columna, tipo, expresion) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = tipo;
        this.resultado = null;
    }
    Axes.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    Axes.prototype.getValorImplicito = function (ent, global, busqueda) {
        
        var entornoActual = ent;

        if (this.getTipo() == TipoAxes.ANCESTOR){


            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            }else {

                var entornoAux = [];

                entornoActual.forEach(function (objeto){
    
                    var anteriorAux = objeto.getEntorno().getAnterior();
    
                    while (anteriorAux != null) {
        
                        if(!EntornoYaExiste(entornoAux,anteriorAux.getID())){
                            entornoAux.push(anteriorAux);
                        }
                        anteriorAux = anteriorAux.getAnterior();                
                      }               
                });
    
                if (entornoAux.length > 0){               
                    entornoActual = ObtenerObjetos(entornoAux);
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 13);
    
                    /**AQUI RETORNAMOS EL RESULTADO DE LA EXPRESION */
                    return this.resultado
    
                } else {
                    //si llegamos a esta parte significa que ningun elemento tenia una raiz padre
                    //por lo tanto axes ancestor no devuelve nada 
                    return null;
                }   

            }

        } else if (this.getTipo() == TipoAxes.ANCESTOR_OR_SELF){

            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            }else {

                var entornoAux = [];

                entornoActual.forEach(function (objeto){
    
                    var anteriorAux = objeto.getEntorno();
    
                    while (anteriorAux != null) {
        
                        if(!EntornoYaExiste(entornoAux,anteriorAux.getID())){
                            entornoAux.push(anteriorAux);
                        }
                        anteriorAux = anteriorAux.getAnterior();                
                      }               
                });
    
                if (entornoAux.length > 0){               
                    entornoActual = ObtenerObjetos(entornoAux);
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 13);
    
                    /**AQUI RETORNAMOS EL RESULTADO DE LA EXPRESION */
                    return this.resultado
    
                } else {
                    //si llegamos a esta parte significa que ningun elemento tenia una raiz padre
                    //por lo tanto axes ancestor no devuelve nada 
                    return null;
                }   

            }  

        } else if (this.getTipo() == TipoAxes.CHILD){

            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            } else {
                this.resultado = this.expresion.getValorImplicito(entornoActual, 13);
                return this.resultado;
            }

        } else if (this.getTipo() == TipoAxes.DESCENDANT){

            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            } else {
                this.resultado = this.expresion.getValorImplicito(entornoActual, 14);
                return this.resultado;
            }

        } else if (this.getTipo() == TipoAxes.DESCENDANT_OR_SELF){

            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            } else {

                var entornoAux = [];

                entornoActual.forEach(function (objeto){
    
                    var anteriorAux = objeto.getEntorno().getAnterior();
    
                    if (anteriorAux != null) {
        
                        if(!EntornoYaExiste(entornoAux,anteriorAux.getID())){
                            entornoAux.push(anteriorAux);
                        }                                       
                      }               
                });
    
                if (entornoAux.length > 0){               
                    entornoActual = ObtenerObjetos(entornoAux);
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 14);
    
                    /**AQUI RETORNAMOS EL RESULTADO DE LA EXPRESION */
                    return this.resultado
    
                } else {
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 14);
    
                    /**AQUI RETORNAMOS EL RESULTADO DE LA EXPRESION */
                    return this.resultado
                }   
             
            }


        } else if (this.getTipo() == TipoAxes.FOLLOWING){

            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            } else {

                var entornoAux = [];

                entornoActual.forEach(function (objeto){
    
                    var anteriorAux = objeto.getEntorno().getAnterior();
    
                    if (anteriorAux != null) {
        
                        if(!EntornoYaExiste(entornoAux,anteriorAux.getID())){
                            entornoAux.push(anteriorAux);
                        }                                       
                      }               
                });
    
                if (entornoAux.length > 0){               
                    entornoActual = ObtenerObjetos(entornoAux);
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 15);
                    /**AQUI RETORNAMOS EL RESULTADO DE LA EXPRESION */
                    return this.resultado
    
                } else {
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 15);
                    /**AQUI RETORNAMOS EL RESULTADO DE LA EXPRESION */
                    return this.resultado
                }   
            }

        } else if (this.getTipo() == TipoAxes.FOLLOWING_SIBLING){

            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            } else {

                var entornoAux = [];

                entornoActual.forEach(function (objeto){
    
                    var anteriorAux = objeto.getEntorno().getAnterior();
    
                    if (anteriorAux != null) {
        
                        if(!EntornoYaExiste(entornoAux,anteriorAux.getID())){
                            entornoAux.push(anteriorAux);
                        }                                       
                      }               
                });
    
                if (entornoAux.length > 0){               
                    entornoActual = ObtenerObjetos(entornoAux);
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 16);
                    /**AQUI RETORNAMOS EL RESULTADO DE LA EXPRESION */
                    return this.resultado;
    
                } else {
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 16);
                    /**AQUI RETORNAMOS EL RESULTADO DE LA EXPRESION */
                    return this.resultado;
                }   
            }

        } else if (this.getTipo() == TipoAxes.PARENT){

            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            } else {

                var entornoAux = [];

                entornoActual.forEach(function (objeto){
    
                    var anteriorAux = objeto.getEntorno().getAnterior();
    
                    if (anteriorAux != null) {
        
                        if(!EntornoYaExiste(entornoAux,anteriorAux.getID())){
                            entornoAux.push(anteriorAux);
                        }                                       
                      }               
                });
    
                if (entornoAux.length > 0){               
                    entornoActual = ObtenerObjetos(entornoAux);
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 13);
                    /**AQUI RETORNAMOS EL RESULTADO DE LA EXPRESION */
                    return this.resultado;
    
                } else {
                    return null;
                }   
            }

        } else if (this.getTipo() == TipoAxes.PRECEDING){

            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            } else {
                this.resultado = this.expresion.getValorImplicito(entornoActual, 17);
                return this.resultado;
            }

        } else if (this.getTipo() == TipoAxes.PRECEDING_SIBLING){

            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            } else {
                this.resultado = this.expresion.getValorImplicito(entornoActual, 18);
                return this.resultado;
            }

        } else if (this.getTipo()== TipoAxes.SELF){
            if (busqueda==14){
                this.resultado = this.expresion.getValorImplicito(global, 14);
                return this.resultado;
            } else {
                this.resultado = this.expresion.getValorImplicito(entornoActual, 19);
                return this.resultado;
            }
        } 

    };


    
    return Axes;
}());
//exports.Axes = Axes;