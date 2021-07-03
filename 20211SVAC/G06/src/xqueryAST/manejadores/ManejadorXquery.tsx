import { Retorno } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { traduccion } from '../../Traduccion/traduccion';

export class ManejadorXquery {

    static unirSalida(salida: string[]): string {

        let salidaTexto: string = ""
        for (const element of salida) {
            salidaTexto += element
        }
        return salidaTexto;
    }

    static buildXquery(listNodes: Retorno[]): string {

        var content: string[] = []
        //onsole.log(listNodes);
        for (const element of listNodes) {

            if (element.type === tipoPrimitivo.NODO) {
                ManejadorXquery.concatenar(content, this.construirNodos(element.value, ""));
            } else {
                var temp = String(element.value)
                //TRADUCCION3D##########################################################################################
                traduccion.stackCounter++;
                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
                traduccion.setTranslate("\n//Ingresando String\t--------------");

                for (let i = 0; i < temp.length; i++) {
                    traduccion.setTranslate("heap[(int)H] = " + temp.charCodeAt(i) + ";" + "\t\t//Caracter " + temp[i].toString());
                    traduccion.setTranslate("H = H + 1;");
                    if (i + 1 === temp.length) {
                        traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                        traduccion.setTranslate("H = H + 1;");
                    }
                }
                //#######################################################################################################

                //TRADUCCION3D##########################################################################################
                if (traduccion.printString === "") {
                    traduccion.crearPrintString();
                }
                traduccion.setTranslate("\n\n//Imprimiendo solo contenido de nodo\t--------------\n");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + traduccion.stackCounter + "];");

                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
                traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                traduccion.setTranslate("stack[(int)t" + (traduccion.t) + "] = t" + (traduccion.t - 1) + ";");
                traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
                traduccion.setTranslate("printString();");
                traduccion.setTranslate("printf(\"%c\", (char)10);\t\t// Salto de linea\n");
                traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");
                //#######################################################################################################
                content.push(temp + "\n");
            }
        }
        return this.unirSalida(content);
    }

    static construirNodos(entPadre: Entorno, tab: string): string[] {

        var atributos = "";
        var content: string[] = [];

        for (const atri of entPadre.listaSimbolos) { // construyo atributos
            atributos += atri.identificador + " = \"" + atri.valor.replaceAll("\"", "") + "\"  ";
        }

        //construyo Nodos
        if (entPadre.listaEntornos.length === 0 && entPadre.texto === '') {

            if (traduccion.etiquetaApertura === "") {
                traduccion.crearEtiquetaApertura();
            }
            traduccion.setTranslate("\n//Inicia Etiqueta apertura\t--------------\n\n");
            traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + entPadre.SP_ID + "];");
            traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
            traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
            traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 1) + ";");
            traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
            traduccion.setTranslate("crearEtiquetaApertura();");
            traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");

            for (const atri of entPadre.listaSimbolos) { // construyo atributos
                if (traduccion.etiquetaAtributo === "") {
                    traduccion.crearAtributoEtiqueta();
                }
                traduccion.setTranslate("\n\n//Atributo Etiqueta\t\t--------------\n\n");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + atri.SP_ID + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + atri.SP_VAL + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
                traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 2) + ";");
                traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 1) + ";");
                traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
                traduccion.setTranslate("crearAtributoEtiqueta();");
                traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");

            }

            //construyo Nodos
            if (entPadre.listaEntornos.length === 0 && entPadre.texto === '') {
                //TRADUCCION3D##########################################################################################
                traduccion.setTranslate("printf(\"%c\", (char)47);\t\t// /\n");
                traduccion.setTranslate("printf(\"%c\", (char)62);\t\t// >\n");
                traduccion.setTranslate("printf(\"%c\", (char)10);\t\t// Salto de linea\n");
                //#######################################################################################################
            }


            content.push(tab + "<" + entPadre.identificador + " " + atributos + "/>\n");
        }
        else if (entPadre.listaEntornos.length > 0) {

            //TRADUCCION3D##########################################################################################
            if (traduccion.etiquetaApertura === "") {
                traduccion.crearEtiquetaApertura();
            }
            traduccion.setTranslate("\n//Inicia Etiqueta apertura\t--------------\n\n");
            traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + entPadre.SP_ID + "];");
            traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
            traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
            traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 1) + ";");
            traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
            traduccion.setTranslate("crearEtiquetaApertura();");
            traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");
            //##########################################################################################

            //TRADUCCION3D##########################################################################################
            for (const atri of entPadre.listaSimbolos) { // construyo atributos
                if (traduccion.etiquetaAtributo === "") {
                    traduccion.crearAtributoEtiqueta();
                }
                traduccion.setTranslate("\n\n//Atributo Etiqueta\t\t--------------\n\n");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + atri.SP_ID + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + atri.SP_VAL + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
                traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 2) + ";");
                traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 1) + ";");
                traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
                traduccion.setTranslate("crearAtributoEtiqueta();");
                traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");
            }
            //##########################################################################################

            //TRADUCCION3D##########################################################################################
            traduccion.setTranslate("printf(\"%c\", (char)62);\t\t// >\n");
            //#######################################################################################################

            content.push(tab + "<" + entPadre.identificador + " " + atributos + ">\n");
            for (const entActual of entPadre.listaEntornos) {
                ManejadorXquery.concatenar(content, this.construirNodos(entActual, tab + "   "));
            }
            //TRADUCCION3D##########################################################################################
            if (traduccion.etiquetaCierre === "") {
                traduccion.crearEtiquetaCierre();
            }
            traduccion.setTranslate("\n\n//Imprimiendo etiqueta cierre\t--------------\n\n");
            traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + entPadre.SP_ID + "];");
            traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
            traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
            traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 1) + ";");
            traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
            traduccion.setTranslate("crearEtiquetaCierre();");
            traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");
            //#######################################################################################################

            content.push(tab + "</" + entPadre.identificador + ">\n");

        } else {
            //############################################################################################
            if (traduccion.etiquetaApertura === "") {
                traduccion.crearEtiquetaApertura();
            }
            traduccion.setTranslate("\n//Inicia Etiqueta apertura\t--------------\n\n");
            traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + entPadre.SP_ID + "];");
            traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
            traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
            traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 1) + ";");
            traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
            traduccion.setTranslate("crearEtiquetaApertura();");
            traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");
            //##########################################################################################

            for (const atri of entPadre.listaSimbolos) { // construyo atributos
                if (traduccion.etiquetaAtributo === "") {
                    traduccion.crearAtributoEtiqueta();
                }
                traduccion.setTranslate("\n\n//Atributo Etiqueta\t\t--------------\n\n");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + atri.SP_ID + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + atri.SP_VAL + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
                traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 2) + ";");
                traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 1) + ";");
                traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
                traduccion.setTranslate("crearAtributoEtiqueta();");
                traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");
            }

            //TRADUCCION3D##########################################################################################
            traduccion.setTranslate("printf(\"%c\", (char)62);\t\t// >\n");
            //traduccion.setTranslate("printf(\"%c\", (char)10);\t\t// Salto de linea\n");
            //#######################################################################################################

            //TRADUCCION3D##########################################################################################
            if (traduccion.etiquetaTexto === "") {
                traduccion.crearEtiquetaTexto();
            }
            traduccion.setTranslate("\n\n//Imprimiendo nodo Texto	--------------\n\n");
            traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + entPadre.SP_ID + "];");
            traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + entPadre.SP_VAL + "];");
            traduccion.t++;
            //traduccion.t++;
            traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
            traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
            traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 2) + ";");
            traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
            traduccion.setTranslate("stack[(int)t" + traduccion.t + "] = t" + (traduccion.t - 1) + ";");
            traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
            traduccion.setTranslate("crearEtiquetaTexto();");
            traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");
            //#########################################################################################################

            content.push(tab + "<" + entPadre.identificador + " " + atributos + ">" + entPadre.texto + "</" + entPadre.identificador + ">\n");
        }
        return content;
    }

    static concatenar(content: any[], resp: any[]) {

        for (const element of resp) {
            content.push(element);
        }
    }

}