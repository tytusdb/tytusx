"use strict";

var XFlowerIF = /** @class */ (function () {
    function XFlowerIF(listacondiciones, elsereturn, linea, columna) {
        this.linea = linea;
        this.listacondiciones = listacondiciones;
        this.returnelse = elsereturn;
        this.columna = columna;
        this.tipo = "";
    }
    XFlowerIF.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    XFlowerIF.prototype.getValorImplicito = function (objetos, arbol) {

        
        var objetosXPath = objetos;
        var objetosSalida = [];

        if(objetosXPath.length > 0){

            for(var i = 0; i < objetosXPath.length; i++){       

                var encontroIf = false;

                for(var x = 0; x < this.listacondiciones.length; x++){

                   var resultadoCondicion = this.listacondiciones[x].getValorImplicito([objetosXPath[i]], "");

                    if(resultadoCondicion[1] != null){
                        objetosSalida = objetosSalida.concat(resultadoCondicion[1]);
                        encontroIf = true;
                        break;
                    }
                }        
                
                if(encontroIf == false){
                    var resultadoElse = this.returnelse.getValorImplicito([objetosXPath[i]],"");
                    if(resultadoElse[1].length != 0){
                        objetosSalida = objetosSalida.concat(resultadoElse[1]);
                    }
                }

            }

            return this.arregloAString(objetosSalida);
        } 

        return "";

    };


    XFlowerIF.prototype.arregloAString = function (objetos){

        var resultado = "";
        if(objetos!=null){
            if(objetos!=[]){
                objetos.forEach(function (objeto){
    
                    if(objeto.getAgregar()==1){
            
                        resultado+='<'+objeto.getID();
                        
                        if (objeto.getAtributos().length > 0) {
                            objeto.getAtributos().forEach(function (atributo) {
                            resultado+=" "+atributo.getID()+"="+`"`+atributo.getValor()+`"`;
                            });
                        }
                        resultado+=">";
                        if (objeto.getObjetos().length > 0) {
                            resultado+="\n"
                            GenerarSalidaXPath(objeto.getObjetos());
                        }
            
                        if(objeto.getTexto()!=""){
                            resultado+= CambiarCodificacion(objeto.getTexto());
                        }
            
                        resultado+='</'+objeto.getID()+'>'+"\n";
                    } else if(objeto.getAgregar()==2){
            
                        resultado+='<'+objeto.getID();
                        
                        if (objeto.getAtributos().length > 0) {
                            objeto.getAtributos().forEach(function (atributo) {
                            resultado+=" "+atributo.getID()+"="+`"`+atributo.getValor()+`"`;
                            });
                        }
                        resultado+=" />"+"\n";
                        }
            
                });
            } else {
                resultado = "No se encontraron coincidencias. :(";
            }
        } else {
            resultado = "No se encontraron coincidencias. :(";
        }

        return resultado;

    };

    return XFlowerIF;
}());

