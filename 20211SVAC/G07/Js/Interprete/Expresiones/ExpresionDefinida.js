"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.ExpresionDefinida = void 0;
var ExpresionDefinida = /** @class */ (function () {
    function ExpresionDefinida(linea, columna, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }
    ExpresionDefinida.prototype.getTipo = function (objetos, entornos) {
        return this.tipo;
    };
    ExpresionDefinida.prototype.getValorImplicito = function (objetos, entornos) {
        
        if(this.tipo==TipoExpresionDefinida.LAST){
            return objetos.length;
        } else if(this.tipo==TipoExpresionDefinida.POSITION){
            return [objetos, entornos];
        } else if(this.tipo==TipoExpresionDefinida.ASTERISCO){
            
            var objetosAux = [];
            var entornosAux = [];
            
                objetos.forEach(function (objeto){

                    if (objeto.getObjetos().length>0){
                        if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                            objetosAux.push(objeto);
                            if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                entornosAux.push(objeto.getEntorno());
                            } 
                        }  
                    }

                            
                                
                });            
            
            objetosGlobal = objetosAux;   
            entornosGlobal = entornosAux;                                          
            return [entornosAux, objetosAux];
        } else if(this.tipo==TipoExpresionDefinida.ARROBA){
            
            var objetosAux = [];
            var entornosAux = [];
            
            objetos.forEach(function (objeto){

                if(objeto.getAtributos().length>0){
                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                        objetosAux.push(objeto);
                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                            entornosAux.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
                      
            objetosGlobal = objetosAux;   
            entornosGlobal = entornosAux;                                          
            return [entornosAux, objetosAux];
        } else if(this.tipo==TipoExpresionDefinida.NODE){
            
            var objetosAux = [];
            var entornosAux = [];
            
            objetos.forEach(function (obj){

                var objetosArr = obj.getObjetos();

                objetosArr.forEach(function (objeto){

                
                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                        objetosAux.push(objeto);
                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                            entornosAux.push(objeto.getEntorno());
                        } 
                    }  
                      
                 
                });            
            });
                     
            objetosGlobal = objetosAux;   
            entornosGlobal = entornosAux;                                          
            return [entornosAux, objetosAux];
        } else if(this.tipo==TipoExpresionDefinida.TEXT){
            
            var objetosAux = [];
            var entornosAux = [];
            
            objetosGlobal.forEach(function (objeto){

                if(objeto.getTexto() != ""){
                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                        objetosAux.push(objeto);
                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                            entornosAux.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            console.log("holaaaaaaaaa")
            objetosGlobal = objetosAux;
            entornosGlobal = entornosAux; 
            return [entornosAux, objetosAux];
        }  
        
    };
    return ExpresionDefinida;
}());
//exports.ExpresionDefinida = ExpresionDefinida;
