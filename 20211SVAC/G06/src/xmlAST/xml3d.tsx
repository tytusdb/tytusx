import { Entorno } from "../xmlAST/Entorno";
import { traduccion } from '../Traduccion/traduccion';

export function traducirXml(ast) {
    traducirXmlRecursive(ast[0]);
    printText(ast[0]);
}

export function traducirXmlRecursive(raiz: Entorno) {
    traduccion.setTranslate("//Posicion en stack\t--------------");
    raiz.SP_ID = traduccion.stackCounter;
    traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
    traduccion.setTranslate("");
    traduccion.setTranslate("//Identificador de etiqueta: " + raiz.identificador.toString() + "\t--------------");
    for (let i = 0; i < raiz.identificador.length; i++) {
        traduccion.setTranslate("heap[(int)H] = " + raiz.identificador.charCodeAt(i) + ";" + "\t\t//Caracter " + raiz.identificador[i].toString());
        traduccion.setTranslate("H = H + 1;");
        if (i + 1 === raiz.identificador.length) {
            traduccion.setTranslate("heap[(int)H] = -1;"  + "\t\t//FIN DE CADENA");
            traduccion.setTranslate("H = H + 1;");
        }
    }
    if (raiz.texto.length!==0) {
        traduccion.stackCounter++;
        raiz.SP_VAL = traduccion.stackCounter;
        traduccion.setTranslate("\n");
        traduccion.setTranslate("//Posicion en stack\t--------------");
        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
        traduccion.setTranslate("");
        traduccion.setTranslate("//Texto de nodo: " + raiz.identificador.toString() + "\t--------------");
        for (let i = 0; i < raiz.texto.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + raiz.texto.charCodeAt(i) + ";" + "\t\t//Caracter " + raiz.texto[i].toString());
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === raiz.texto.length) {
                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                traduccion.setTranslate("H = H + 1;");
            }
        }
    }
    for (const simbolo of raiz.listaSimbolos) {
        traduccion.setTranslate("");
        traduccion.stackCounter++;
        simbolo.SP_ID = traduccion.stackCounter;
        traduccion.setTranslate("//Posicion en stack\t--------------");
        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
        traduccion.setTranslate("");
        traduccion.setTranslate("//Simbolo " + simbolo.identificador.toString() + " de etiqueta: " + raiz.identificador.toString() + "\t--------------")
        for (let i = 0; i < simbolo.identificador.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + simbolo.identificador.charCodeAt(i) + ";"  + "\t\t//Caracter " + simbolo.identificador[i].toString());
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === simbolo.identificador.length) {
                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                traduccion.setTranslate("H = H + 1;");
            }
        }
        simbolo.valor=simbolo.valor.replaceAll("\"","");
        simbolo.valor=simbolo.valor.replaceAll("'","");
        traduccion.stackCounter++;
        simbolo.SP_VAL = traduccion.stackCounter;
        traduccion.setTranslate("//Posicion en stack\t--------------");
        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
        traduccion.setTranslate("");
        traduccion.setTranslate("//Valor de " + simbolo.identificador + "\t--------------");
        for (let i = 0; i < simbolo.valor.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + simbolo.valor.charCodeAt(i) + ";" + "\t\t//Caracter " + simbolo.valor[i].toString());
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === simbolo.valor.length) {
                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                traduccion.setTranslate("H = H + 1;");
            }
        }
    }
    traduccion.setTranslate("\n");
    for (const key in raiz.listaEntornos) {
        traduccion.stackCounter++;
        traducirXmlRecursive(raiz.listaEntornos[key]);
    }
}

export function createPrintText() {
    traduccion.setTranslate("void printString() {");
    traduccion.setTranslate("t"+traduccion.t+" = S+1; ");
    traduccion.t++;
    traduccion.setTranslate("t"+traduccion.t+" = stack[(int)t"+(traduccion.t-1).toString()+"];");
    traduccion.t++;
    traduccion.setTranslate("L"+traduccion.etiquetaCounter+":"); //L0
    traduccion.etiquetaCounter++;
    traduccion.setTranslate("t"+traduccion.t+" = heap[(int)t"+(traduccion.t-1)+"];");
    traduccion.setTranslate("if(t"+traduccion.t+" == -1) goto L"+traduccion.etiquetaCounter+";"); //L1
    traduccion.setTranslate("printf(\"%c\", (char)t"+traduccion.t+");");
    traduccion.setTranslate("t"+(traduccion.t-1)+" = t"+(traduccion.t-1)+"+1;");
    traduccion.setTranslate("goto L"+(traduccion.etiquetaCounter-1)+";");
    traduccion.setTranslate("L"+traduccion.etiquetaCounter+":");
    traduccion.setTranslate("return;");
    traduccion.setTranslate("}");
    traduccion.printString = true;
}

export function printText(raiz: Entorno) {
    if (traduccion.printString===false) {createPrintText();}
    if (raiz.texto!=="") {
        traduccion.setTranslate("t"+traduccion.t+" = stack[(int)"+raiz.SP_VAL+"];");
        traduccion.t++;
        traduccion.setTranslate("t"+traduccion.t+" = S + "+traduccion.stackCounter+";");
        traduccion.setTranslate("t"+traduccion.t+" = t"+traduccion.t+" + 1;");
        traduccion.setTranslate("stack[(int)t"+traduccion.t+"] = t"+(traduccion.t-1)+";");
        traduccion.t++;
        traduccion.setTranslate("S = S + "+traduccion.stackCounter+";");
        traduccion.setTranslate("printString();");
        traduccion.setTranslate("t"+traduccion.t +" = stack[(int)S];");
        traduccion.t++;
        traduccion.setTranslate("S = S - "+traduccion.stackCounter+";");
        traduccion.setTranslate("printf(\"%c\", (char)10);");
    }
    for (const r of raiz.listaEntornos) {
        printText(r);
    }
}