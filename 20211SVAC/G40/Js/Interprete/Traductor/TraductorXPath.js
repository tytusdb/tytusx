
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

                                salida += "\n";
                                var EtiquetaInicio = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaInicio2 = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaComparacion = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaFinales = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaIniciaAtributo = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaIniciaTexto = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaIniciaHijo = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaIteracion = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaExiste = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaNoExiste = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaSalir = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaImprimir = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaOpciones = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaCaracterVacio = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaMayorQue = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaIgual = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaEspacio = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaMenorQue = "L"+contadorEtiquetas;
                                contadorEtiquetas++;
                                var EtiquetaSeguirImpresion = "L"+contadorEtiquetas;
                                contadorEtiquetas++;

                                salida += "     //Etiqueta inicial del algoritmo\n";
                                salida += "     " + EtiquetaInicio + ":\n";
                                salida += "     //validamos que venga un slash\n";
                                salida += "     if (" + temporalValorXHEAP + " == " + "47) goto " + EtiquetaInicio2 + ";\n";
                                salida += "     //Si no viene el slash, nos salimos. (ya se valido antes, asi que esta de mas xd)\n";
                                salida += "     goto " + EtiquetaNoExiste + ";\n";
                                salida += "     //Etiqueta para validar que venga un -1 al inicio del XML (es decir que tenga minimo un objeto)\n";
                                salida += "     " + EtiquetaInicio2 + ":\n";
                                salida += "     //validamos que venga un -1 en el heap\n";
                                salida += "     if (" + temporalValorHEAP + " == " + "-1) goto " + EtiquetaIteracion + ";\n";
                                salida += "     //Si no viene el slash, nos salimos.\n";
                                salida += "     goto " + EtiquetaNoExiste + ";\n";
                                salida += "     //Etiqueta para comparar el ID del la consulta y del XML\n";                   
                                salida += "     " + EtiquetaComparacion + ":\n";
                                salida += "     //Compararamos caracter por caracter\n";
                                salida += "     if (" + temporalValorXHEAP + " == " + temporalValorHEAP  +") goto " + EtiquetaIteracion + ";\n";
                                salida += "     //si no son iguales puede que ya sea el final de la cadena\n";
                                salida += "     goto " + EtiquetaFinales + ";\n";
                                salida += "     //Etiqueta para validar si ya se termino la cadena\n";
                                salida += "     " + EtiquetaFinales + ":\n";
                                salida += "     //puede ser el final de la instruccion xpath\n";
                                salida += "     //sin embargo si entramos a estamos opcion\n";
                                salida += "     //debemos confirmar que en el HEAP ya no hay mas caracteres de la etiqueta\n";
                                salida += "     //validamos que venga un -12 (osea el final de la instruccion xpath)\n";
                                salida += "     if (" + temporalValorXHEAP + " == " +"-12) goto " + EtiquetaIniciaAtributo + ";\n";
                                salida += "     //si tampoco es esta opcion, salimos del for\n";
                                salida += "     goto " + EtiquetaNoExiste + ";\n";
                                salida += "     //Etiqueta para validar si iniciara un atributo\n";
                                salida += "     " + EtiquetaIniciaAtributo + ":\n";
                                salida += "     //validamos que venga un -2 (osea el inicio de un atributo)\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-2) goto " + EtiquetaExiste + ";\n";
                                salida += "     //si no es -2 puede que sea el inicio de un texto\n";
                                salida += "     goto " + EtiquetaIniciaTexto + ";\n";
                                salida += "     //Etiqueta para validar si iniciara un texto\n";
                                salida += "     " + EtiquetaIniciaTexto + ":\n";
                                salida += "     //validamos que venga un -4 (osea el inicio de un texto)\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-4) goto " + EtiquetaExiste + ";\n";
                                salida += "     //si no es -4 puede que sea el inicio de un hijo\n";
                                salida += "     goto " + EtiquetaIniciaHijo + ";\n";
                                salida += "     //Etiqueta para validar si iniciara un hijo\n";
                                salida += "     " + EtiquetaIniciaHijo + ":\n";
                                salida += "     //validamos que venga un -7 (osea el inicio de un hijo)\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-7) goto " + EtiquetaExiste + ";\n";
                                salida += "     //si tampoco es esta opcion, salimos del for\n";
                                salida += "     goto " + EtiquetaNoExiste + ";\n";
                                salida += "     //Etiqueta para preparar nueva iteracion\n";
                                salida += "     " + EtiquetaIteracion + ":\n";
                                salida += "     " + temporalXML + " = " + temporalXML + " + 1;\n";
                                salida += "     " + temporalValorHEAP + " = " + "heap[(int)" + temporalXML + "];\n";
                                salida += "     " + temporalXHEAP + " = " + temporalXHEAP + " + 1;\n";
                                salida += "     " + temporalValorXHEAP + " = " + "xheap[(int)" + temporalXHEAP + "];\n";
                                salida += "     //saltamos a la etiqueta para comparar\n";
                                salida += "     goto " + EtiquetaComparacion + ";\n";
                                salida += "     //Etiqueta para preparar e imprimir resultado\n";
                                salida += "     " + EtiquetaExiste + ":\n";
                                ///////////////////// IMPRIMIENDO XML ///////////////////
                                salida += `     printf("%c", (char)10);\n`;
                                salida += "     //ponemos el temporalXML en cero para recorrer el XML\n";
                                salida += "     " + temporalXML + " = 0;\n";
                                salida += "     //obtenemos el dato del heap en la posicion del temporalXML\n";
                                salida += "     " + temporalValorHEAP + " = heap[(int)" + temporalXML +"];\n";
                                salida += "     //Etiqueta para imprimir el XML\n";
                                salida += "     " + EtiquetaImprimir + ":\n";
                                salida += "     //validamos que no sea el final del XML en el HEAP\n";
                                salida += "     if (" + temporalXML + " < " + temporalFINXML  +") goto " + EtiquetaOpciones + ";\n";
                                salida += "     //si no es menor, saltamos a etiqueta de salida\n";
                                salida += "     goto " + EtiquetaSalir + ";\n";
                                salida += "     //Etiqueta para las distintas opciones de impresion\n";
                                salida += "     " + EtiquetaOpciones + ":\n";
                                salida += "     //validamos si viene un nuevo objeto, es decir un -1\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-1) goto " + EtiquetaMenorQue + ";\n";
                                salida += "     //validamos si viene un nuevo atributo, es decir un -2\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-2) goto " + EtiquetaEspacio + ";\n";
                                salida += "     //validamos si viene un nuevo valor, es decir un -3\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-3) goto " + EtiquetaIgual + ";\n";
                                salida += "     //validamos si viene un nuevo texto, es decir un -4\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-4) goto " + EtiquetaMayorQue + ";\n";
                                salida += "     //validamos si viene un nuevo hijo, es decir un -7\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-7) goto " + EtiquetaMayorQue + ";\n";
                                salida += "     //validamos si termina un objeto, es decir un -6\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-6) goto " + EtiquetaCaracterVacio + ";\n";
                                salida += "     //validamos si termina un nivel, es decir un -8\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-8) goto " + EtiquetaCaracterVacio + ";\n";
                                salida += "     //validamos si empieza un hermano, es decir un -9\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-9) goto " + EtiquetaCaracterVacio + ";\n";
                                salida += "     //validamos si termina un texto, es decir un -5\n";
                                salida += "     if (" + temporalValorHEAP + " == " +"-5) goto " + EtiquetaCaracterVacio + ";\n";
                                salida += "     //si no es ninguno de los casos anteriores pintamos el ascii\n";
                                salida += `     printf("%c", (char)`+ temporalValorHEAP + ");\n";
                                salida += "     //saltamos a etiqueta para seguir imprimiendo\n";
                                salida += "     goto " + EtiquetaSeguirImpresion + ";\n";
                                salida += "     //Etiqueta para no imprimir nada (no hay caracter, pero se sigue imprimiendo)\n";
                                salida += "     " + EtiquetaCaracterVacio + ":\n";
                                salida += "     //saltamos a etiqueta para seguir imprimiendo\n";
                                salida += "     goto " + EtiquetaSeguirImpresion + ";\n";
                                salida += "     //Etiqueta para imprimir un signo mayor que\n";
                                salida += "     " + EtiquetaMayorQue + ":\n";
                                salida += "     //imprimimos un signo mayor que\n";
                                salida += `     printf("%c", (char)62);\n`;
                                salida += "     //saltamos a etiqueta para seguir imprimiendo\n";
                                salida += "     goto " + EtiquetaSeguirImpresion + ";\n";
                                salida += "     //Etiqueta para imprimir un signo igual\n";
                                salida += "     " + EtiquetaIgual + ":\n";
                                salida += "     //imprimimos un signo igual\n";
                                salida += `     printf("%c", (char)61);\n`;
                                salida += "     //saltamos a etiqueta para seguir imprimiendo\n";
                                salida += "     goto " + EtiquetaSeguirImpresion + ";\n";
                                salida += "     //Etiqueta para imprimir un espacio\n";
                                salida += "     " + EtiquetaEspacio + ":\n";
                                salida += "     //imprimimos un espacio\n";
                                salida += `     printf("%c", (char)32);\n`;
                                salida += "     //saltamos a etiqueta para seguir imprimiendo\n";
                                salida += "     goto " + EtiquetaSeguirImpresion + ";\n";
                                salida += "     //Etiqueta para imprimir un signo menor que\n";
                                salida += "     " + EtiquetaMenorQue + ":\n";
                                salida += "     //imprimimos un signo menor que\n";
                                salida += `     printf("%c", (char)60);\n`;
                                salida += "     //saltamos a etiqueta para seguir imprimiendo\n";
                                salida += "     goto " + EtiquetaSeguirImpresion + ";\n";
                                salida += "     //Etiqueta para seguir imprimiendo\n";
                                salida += "     " + EtiquetaSeguirImpresion + ":\n";
                                salida += "     //Aumentamos temporalXML en 1\n";
                                salida += "     " + temporalXML + " = " + temporalXML + " + 1;\n";
                                salida += "     //Aumentamos temporalValorHEAP obtiene el valor del HEAP en la posicion de temporalXML\n";
                                salida += "     " + temporalValorHEAP + " = heap[(int)" + temporalXML + "];\n";
                                salida += "     //saltamos a etiqueta para imprimir\n";
                                salida += "     goto " + EtiquetaImprimir + ";\n";
                                /////////////////////////////////////////////////////////////////
                                salida += "     //Etiqueta para reportar que no hay resultado a la consutla\n";
                                salida += "     " + EtiquetaNoExiste + ":\n";
                                salida += `     printf("%c", (char)10);\n`;
                                salida += `     printf("%c", (char)78);\n`;
                                salida += `     printf("%c", (char)111);\n`;
                                salida += `     printf("%c", (char)32);\n`;
                                salida += `     printf("%c", (char)115);\n`;
                                salida += `     printf("%c", (char)101);\n`;
                                salida += `     printf("%c", (char)32);\n`;
                                salida += `     printf("%c", (char)101);\n`;
                                salida += `     printf("%c", (char)110);\n`;
                                salida += `     printf("%c", (char)99);\n`;
                                salida += `     printf("%c", (char)111);\n`;
                                salida += `     printf("%c", (char)110);\n`;
                                salida += `     printf("%c", (char)116);\n`;
                                salida += `     printf("%c", (char)114);\n`;
                                salida += `     printf("%c", (char)97);\n`;
                                salida += `     printf("%c", (char)114);\n`;
                                salida += `     printf("%c", (char)111);\n`;
                                salida += `     printf("%c", (char)110);\n`;
                                salida += `     printf("%c", (char)32);\n`;
                                salida += `     printf("%c", (char)114);\n`;
                                salida += `     printf("%c", (char)101);\n`;
                                salida += `     printf("%c", (char)115);\n`;
                                salida += `     printf("%c", (char)117);\n`;
                                salida += `     printf("%c", (char)108);\n`;
                                salida += `     printf("%c", (char)116);\n`;
                                salida += `     printf("%c", (char)97);\n`;
                                salida += `     printf("%c", (char)100);\n`;
                                salida += `     printf("%c", (char)111);\n`;
                                salida += `     printf("%c", (char)115);\n`;
                                salida += `     printf("%c", (char)32);\n`;
                                salida += `     printf("%c", (char)58);\n`;
                                salida += `     printf("%c", (char)40);\n`;
                                salida += "     //Etiqueta para salir\n";
                                salida += "     " + EtiquetaSalir + ":\n";
                                return salida;
                            }
                    }
                
                }
           
            }
                
        }

        return salida;

    }

}