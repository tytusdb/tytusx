"use strict";


//Object.defineProperty(exports, "__esModule", { value: true });
//exports.NodoXpath = void 0;
var NodoXpath = /** @class */ (function () {
    function NodoXpath(id, tipo, axes, listaSelectores, expresion, linea, columna) {
        this.listaSelectores = listaSelectores;
        this.linea = linea;
        this.columna = columna;
        this.expresionXpath = expresion;
        this.axes = axes;
        this.tipo = tipo;
        this.global = null;
        this.resultado = null;
    }
    NodoXpath.prototype.agregarSelect = function (selector) {
        this.listaSelectores.push(selector);
    };
    NodoXpath.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };

    NodoXpath.prototype.containsAny = function (source,target){
    var result = source.filter(function(item){ return target.indexOf(item) > -1});   
    return (result.length > 0);  
    };  

    NodoXpath.prototype.setGlobal = function (global){
        this.global = global;
        };  

    NodoXpath.prototype.getGlobal = function (){
            return this.global;
            };  

    NodoXpath.prototype.getValorImplicito = function (ent, arbol) {

        if(ent.length<1){
            return [];
        }
    
        if((this.getTipo()== TipoNodo.SELECTOR_EXPRESION) || (this.getTipo()== TipoNodo.SELECTOR_AXES)){

            var entornoActual = ent;
            var busquedaGlobal = 13;
            
            for (var i=0; i < this.listaSelectores.length;i++ ){
                
                if ((this.listaSelectores[i] == TipoSelector.DOBLE_SLASH) || 
                (this.listaSelectores[i] == TipoSelector.PUNTO_DOSSLASH) ){
                                busquedaGlobal = 14;
                } else if ((this.listaSelectores[i] == TipoSelector.DOSPUNTOS_DOSSLASH) || 
                (this.listaSelectores[i] == TipoSelector.DOSPUNTOS_SLASH)){
                    
                    var entornoAux = [];

                    entornoActual.forEach(function (entorno){

                        if(entorno.getAnterior()!=null){

                            if(EntornoYaExiste(entornoAux,entorno.getAnterior().getID())==false){
                                entornoAux.push(entorno.getAnterior());
                            }
                        }
                       
                    });

                    if (entornoAux.length > 0){
                        if (this.listaSelectores[i] == TipoSelector.DOSPUNTOS_DOSSLASH){
                            busquedaGlobal = 14;
                            entornoActual = this.getGlobal();
                        }  else {
                            entornoActual = entornoAux;
                        }               
                        

                    } else {
                        //si llegamos a esta parte significa que ningun elemento tenia una raiz padre
                        //por lo tanto el selector ..// no devuelve nada 
                        return [];
                    }                   
                } 
            } 

            if (this.getTipo()== TipoNodo.SELECTOR_EXPRESION){
               this.resultado = this.expresionXpath.getValorImplicito(entornoActual, busquedaGlobal);
               return this.resultado;
               //console.log(this.resultado);
            } else if (this.getTipo()== TipoNodo.SELECTOR_AXES) {
                this.resultado = this.axes.getValorImplicito(entornoActual, this.getGlobal(), busquedaGlobal);
                return this.resultado;
                //console.log(this.resultado);
            }

        } else if (this.getTipo()== TipoNodo.EXPRESION){
            
           this.resultado = this.expresionXpath.getValorImplicito(ent, 13);
           return this.resultado;
           //console.log(this.resultado);

        } else if (this.getTipo()== TipoNodo.AXES){
        
           this.resultado = this.axes.getValorImplicito(ent, this.getGlobal(), 13);
           return this.resultado;
           //console.log(this.resultado);
        } 
                
    };
    return NodoXpath;
}());
//exports.NodoXpath = NodoXpath;