
class TraductorXPath{

    constructor(){
    }

    traducir(cadena, xpath){

        var salida = "";
        var cadenaXPath = cadena;
        var funcionXPath = xpath;
    
        if(cadenaXPath != "" && funcionXPath != null && funcionXPath != undefined){

            if(xpath.listaNodos.length == 1){

                if(xpath.listaNodos[0].listaSelectores.length == 1){

                    if(xpath.listaNodos[0].listaSelectores[0] == TipoSelector.SLASH &&
                        xpath.listaNodos[0].tipo == TipoNodo.SELECTOR_EXPRESION){

                            if( xpath.listaNodos[0].expresionXpath.tipo == TipoExpresionXPath.IDENTIFICADOR){
                               
                                temporalXHP = "t"+contadorTemporales;
                                contadorTemporales++;
                                
                                salida += "\n";
                                salida += "     " + temporalXHP + " = XHP;\n";
                                salida += "     //guardamos un slash\n";
                                salida += "     xheap[(int)XHP] = 47;\n"; 
                                salida += "     //aumentamos XHP en 1\n";
                                salida += "     XHP = XHP + 1;\n";


                                var idAux = xpath.listaNodos[0].expresionXpath.identificador;

                                
                                for(var i = 0; i<idAux.length; i++){
                                    salida += "     //guardamos la " + idAux[i] +"\n";
                                    salida += "     xheap[(int)XHP] = " + idAux.codePointAt(i) + ";\n";
                                    salida += "     //aumentamos XHP en 1\n";
                                    salida += "     XHP = XHP + 1;\n";
                                }

                                salida += "     //guardamos un -12(fin funcion XPATH)\n";
                                salida += "     xheap[(int)XHP] = -12;\n"; 
                                salida += "     //aumentamos XHP en 1\n";
                                salida += "     XHP = XHP + 1;\n";


                                salida += "\n";
                                temporalXML = "t"+contadorTemporales;
                                contadorTemporales++;
                                salida += "     //este temporal tendra la posicion a recorrer el XML en el HEAP\n";
                                salida += "     " + temporalXML + " = 0;\n";

                                temporalXHEAP = "t"+contadorTemporales;
                                contadorTemporales++;
                                salida += "     //este temporal tendra la posicion a recorrer el XHEAP\n";
                                salida += "     " + temporalXHEAP + " = 0;\n";

                                temporalFINXML = "t"+contadorTemporales;
                                contadorTemporales++;
                                salida += "     //este temporal tendra la posicion del heap donde termina el XML\n";
                                salida += "     " + temporalFINXML + " = stack[(int)1];\n";

                                temporalNiveles = "t"+contadorTemporales;
                                contadorTemporales++;
                                salida += "     //este temporal llevara el contador de niveles en el XML\n";
                                salida += "     " + temporalNiveles + " = 0;\n";

                                temporalValorHEAP = "t"+contadorTemporales;
                                contadorTemporales++;
                                salida += "     //este temporal tendra un dato del HEAP\n";
                                salida += "     " + temporalValorHEAP + " = heap[(int)" + temporalXML +"];\n";
                                
                                temporalValorXHEAP = "t"+contadorTemporales;
                                contadorTemporales++;
                                salida += "     //este temporal tendra un dato del XHEAP\n";
                                salida += "     " + temporalValorXHEAP + " = xheap[(int)" + temporalXHEAP +"];\n";

                                temporalPos = "t"+contadorTemporales;
                                contadorTemporales++;
                                salida += "     //este temporal va a guardar la posicion inicial de un objeto encontrado\n";
                                salida += "     " + temporalPos + " = 0;\n";

                                temporalXSTACK = "t"+contadorTemporales;
                                contadorTemporales++;
                                salida += "     //este temporal tendra la posicion a recorrer el XSTACK\n";
                                salida += "     " + temporalXSTACK + " = 0;\n";

                                temporalContador = "t"+contadorTemporales;
                                contadorTemporales++;
                                salida += "     //en este temporal llevaremos el contador de objetos\n";
                                salida += "     " + temporalContador + " = 0;\n";

                                salida += "\n";
                                salida += "     //INICIO XPATH\n";

                                return salida;
                            }
                    }
                
                }
           
            }
                
        }

        return salida;

    }

}