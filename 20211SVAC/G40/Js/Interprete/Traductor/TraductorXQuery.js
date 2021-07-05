class TraductorXQuery{

    constructor(){
    }

    traducir(instrucciones){

        var salida = "     //INICIO TRADUCCION XQUERY\n";
      
        for(var i = 0; i <instrucciones.length; i++){

            if(instrucciones[i].getTipo() == TipoXInstruccion.XFOR){

                if(instrucciones[i].getEtiqueta1() == instrucciones[i].getEtiqueta1()){

                    if(instrucciones[i].Min() <= instrucciones[i].Max()){

                        if(instrucciones[i].ID1() == instrucciones[i].ID2()){

                            salida += "\n\n";          
                            
                            salida += "     //imprimimos un salto de linea \n";
                            salida += `     printf("%c", (char)10);\n`;                       
                            var temporalContador = "t"+contadorTemporales;
                            contadorTemporales++;

                            var temporalNumero= "t"+contadorTemporales;
                            contadorTemporales++;

                            var EtiquetaInicio = "L"+contadorEtiquetas;
                            contadorEtiquetas++;
                            var EtiquetaIterar = "L"+contadorEtiquetas;
                            contadorEtiquetas++;
                            var EtiquetaSalir = "L"+contadorEtiquetas;
                            contadorEtiquetas++;

                            salida += "     //este temporal sera el contador para el ciclo for\n";
                            salida += "     " + temporalContador + " = " + instrucciones[i].Min() + " - 1;\n";
                            salida += "     //Etiqueta para validar si el contador sigue siendo menor al maximo\n";
                            salida += "     " + EtiquetaInicio + ":\n";
                            salida += "     //comparamos que el temporal sea menor al maximo\n";
                            salida += "     if (" + temporalContador + " < " + instrucciones[i].Max() + ") goto " + EtiquetaIterar + ";\n";
                            salida += "     //si el contador no es menor al limite maximo salimos\n";
                            salida += "     goto " + EtiquetaSalir + ";\n";
                            salida += "     //Etiqueta para imprimir resultado y seguir iterando\n";
                            salida += "     " + EtiquetaIterar + ":\n";
                            salida += "     //imprimimos un signo <\n";
                            salida += `     printf("%c", (char)60);\n`;

                            for(var x = 0; x<instrucciones[i].getEtiqueta1().length; x++){
                                salida += "     //imprimimos la " + instrucciones[i].getEtiqueta1()[x] + "\n";
                                salida += `     printf("%c", (char)` + instrucciones[i].getEtiqueta1().codePointAt(x) + ");\n";
                            }

                            salida += "     //imprimimos un signo >\n";
                            salida += `     printf("%c", (char)62);\n`;
                            salida += "     //temporalNumero tiene el valor de contador + 1\n";
                            salida += "     " + temporalNumero + " = " + temporalContador + "+ 1;\n";    
                            salida += "     //imprimimos el valor del temporal numero \n";                     
                            salida += `     printf("%d", (int)` + temporalNumero + ");\n"
                            salida += "     //imprimimos un signo <\n";
                            salida += `     printf("%c", (char)60);\n`;
                            salida += "     //imprimimos un signo /\n";
                            salida += `     printf("%c", (char)47);\n`;

                            for(var x = 0; x<instrucciones[i].getEtiqueta1().length; x++){
                                salida += "     //imprimimos la " + instrucciones[i].getEtiqueta1()[x] + "\n";
                                salida += `     printf("%c", (char)` + instrucciones[i].getEtiqueta1().codePointAt(x) + ");\n";
                            }

                            salida += "     //imprimimos un signo >\n";
                            salida += `     printf("%c", (char)62);\n`;
                            salida += "     //imprimimos un salto de linea \n";
                            salida += `     printf("%c", (char)10);\n`;
                            salida += "     //aumentamos en 1 el contador\n";
                            salida += "     " + temporalContador + " = " + temporalContador + " + 1;\n";
                            salida += "     //saltamos a la etiqueta de inicio\n";
                            salida += "     goto " + EtiquetaInicio + ";\n";
                            salida += "     //Etiqueta para salir del ciclo for\n";
                            salida += "     " + EtiquetaSalir + ":\n";
                        }
                    }
                }
            } else if(instrucciones[i].getTipo() == TipoXInstruccion.XFORSIMPLE){

                    if(instrucciones[i].Min() <= instrucciones[i].Max()){

                        if(instrucciones[i].ID1() == instrucciones[i].ID2()){


                            salida += "\n\n";          
                            
                            salida += "     //imprimimos un salto de linea \n";
                            salida += `     printf("%c", (char)10);\n`;
                            
                            var temporalContador = "t"+contadorTemporales;
                            contadorTemporales++;

                            var temporalNumero= "t"+contadorTemporales;
                            contadorTemporales++;

                            var EtiquetaInicio = "L"+contadorEtiquetas;
                            contadorEtiquetas++;
                            var EtiquetaIterar = "L"+contadorEtiquetas;
                            contadorEtiquetas++;
                            var EtiquetaSalir = "L"+contadorEtiquetas;
                            contadorEtiquetas++;

                            salida += "     //este temporal sera el contador para el ciclo for\n";
                            salida += "     " + temporalContador + " = " + instrucciones[i].Min() + " - 1;\n";
                            salida += "     //Etiqueta para validar si el contador sigue siendo menor al maximo\n";
                            salida += "     " + EtiquetaInicio + ":\n";
                            salida += "     //comparamos que el temporal sea menor al maximo\n";
                            salida += "     if (" + temporalContador + " < " + instrucciones[i].Max() + ") goto " + EtiquetaIterar + ";\n";
                            salida += "     //si el contador no es menor al limite maximo salimos\n";
                            salida += "     goto " + EtiquetaSalir + ";\n";
                            salida += "     //Etiqueta para imprimir resultado y seguir iterando\n";
                            salida += "     " + EtiquetaIterar + ":\n";                        
                            salida += "     //temporalNumero tiene el valor de contador + 1\n";
                            salida += "     " + temporalNumero + " = " + temporalContador + "+ 1;\n";    
                            salida += "     //imprimimos el valor del temporal numero \n";                     
                            salida += `     printf("%d", (int)` + temporalNumero + ");\n"                  
                            salida += "     //imprimimos un salto de linea \n";
                            salida += `     printf("%c", (char)10);\n`;
                            salida += "     //aumentamos en 1 el contador\n";
                            salida += "     " + temporalContador + " = " + temporalContador + " + 1;\n";
                            salida += "     //saltamos a la etiqueta de inicio\n";
                            salida += "     goto " + EtiquetaInicio + ";\n";
                            salida += "     //Etiqueta para salir del ciclo for\n";
                            salida += "     " + EtiquetaSalir + ":\n";
                        }
                    }
                
            } else if(instrucciones[i].getTipo() == TipoXInstruccion.XLOWER){

                salida += "\n\n";                        
                var temporalCaracter = "t"+contadorTemporales;
                contadorTemporales++;

                salida += "     //imprimimos un salto de linea \n";
                salida += `     printf("%c", (char)10);\n`;

                for(var x = 0; x<instrucciones[i].getCadena().length; x++){
                    salida += `     //convertimos la letra ${instrucciones[i].getCadena()[x]}\n`;
                    salida += `     ${temporalCaracter} = tolower('${instrucciones[i].getCadena()[x]}');\n`; 
                    salida += `     //imprimimos la letra ${instrucciones[i].getCadena()[x].toLowerCase()}\n`;
                    salida += `     printf("%c", (char) ${temporalCaracter});\n`
                }
                salida += "     //imprimimos un salto de linea \n";
                salida += `     printf("%c", (char)10);\n`;

            } else if(instrucciones[i].getTipo() == TipoXInstruccion.XUPPER){

                salida += "\n\n";                        
                var temporalCaracter = "t"+contadorTemporales;
                contadorTemporales++;

                salida += "     //imprimimos un salto de linea \n";
                salida += `     printf("%c", (char)10);\n`;

                for(var x = 0; x<instrucciones[i].getCadena().length; x++){
                    salida += `     //convertimos la letra ${instrucciones[i].getCadena()[x]}\n`;
                    salida += `     ${temporalCaracter} = toupper('${instrucciones[i].getCadena()[x]}');\n`; 
                    salida += `     //imprimimos la letra ${instrucciones[i].getCadena()[x].toLowerCase()}\n`;
                    salida += `     printf("%c", (char) ${temporalCaracter});\n`
                }
                salida += "     //imprimimos un salto de linea \n";
                salida += `     printf("%c", (char)10);\n`;

            } else if(instrucciones[i].getTipo() == TipoXInstruccion.XDECLARARFUNCION){

                funcionesC3D += "\n\n";

                var funcionAux = instrucciones[i].getXFuncion();
                var variables = [];

                funcionesC3D += "void " + funcionAux.getID() + "(){\n\n"

                funcionesC3D += `       //jalando los parametros de la pila\n`;

                for(var x = 0; x<funcionAux.getParametros().length; x++){

                   variables.push("t"+contadorTemporales)

                    funcionesC3D += `       //temporal para el parametro numero ${x+1}\n`;
                    funcionesC3D += `       ${"t"+contadorTemporales} = 0;\n`;
                    contadorTemporales++;
                }


                //agregando instrucciones

                funcionesC3D += "}\n\n";

            }
            
        }
        return salida;
    }

}