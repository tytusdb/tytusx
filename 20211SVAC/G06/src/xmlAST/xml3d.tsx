import { Entorno } from "../xmlAST/Entorno";
import { traduccion } from '../Traduccion/traduccion';

export function traducirXml(ast) {
    //var TablaSimbolos = [];
    var contador = 0;
    traducirXmlRecursive(ast[0], contador);
    //console.log(TablaSimbolos);
}

export function traducirXmlRecursive(raiz: Entorno, cont: number) {
    traduccion.setTranslate("t" + traduccion.t.toString() + " = " + cont.toString() + ";");

    traduccion.setTranslate("stack[(int)" + "t" + (traduccion.t).toString() + "] = " + "H;");
    raiz.SP = cont;
    traduccion.t++;

    for (let i = 0; i < raiz.identificador.length; i++) {
        traduccion.setTranslate("heap[(int)H] = " + raiz.identificador.charCodeAt(i) + ";");
        traduccion.setTranslate("H = H + 1;");
        if (i + 1 === raiz.identificador.length) {
            traduccion.setTranslate("heap[(int)H] = -1;");
            traduccion.setTranslate("H = H + 1;");
        }
    }


    if (raiz.texto.length!==0) {
        traduccion.setTranslate("\n");
        traduccion.setTranslate("/*Introduciendo texto de nodo " + raiz.identificador + "*/ ");
        /*cont++;
        raiz.SP_TEXTO = cont;
        traduccion.setTranslate("t" + traduccion.t.toString() + " = " + cont.toString() + ";");
        traduccion.setTranslate("stack[(int)" + "t" + (traduccion.t).toString() + "] = " + "H;");
        traduccion.t++;*/
        for (let i = 0; i < raiz.texto.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + raiz.texto.charCodeAt(i) + ";");
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === raiz.texto.length) {
                traduccion.setTranslate("heap[(int)H] = -1;");
                traduccion.setTranslate("H = H + 1;");
            }
        }
    }

    traduccion.setTranslate("\n");
    for (const simbolo of raiz.listaSimbolos) {
        cont++;
        simbolo.SP = cont;
        traduccion.setTranslate("t" + traduccion.t.toString() + " = " + cont.toString() + ";");
        traduccion.setTranslate("stack[(int)" + "t" + (traduccion.t).toString() + "] = " + "H;");
        traduccion.t++;
        for (let i = 0; i < simbolo.identificador.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + simbolo.identificador.charCodeAt(i) + ";");
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === simbolo.identificador.length) {
                traduccion.setTranslate("heap[(int)H] = -1;");
                traduccion.setTranslate("H = H + 1;");
            }
        }
        /*traduccion.setTranslate("\n");
        cont++;
        simbolo.SP_VAL = cont;
        traduccion.setTranslate("t" + traduccion.t.toString() + " = " + cont.toString() + ";");
        traduccion.setTranslate("stack[(int)" + "t" + (traduccion.t).toString() + "] = " + "H;");
        traduccion.t++;*/
        for (let i = 0; i < simbolo.valor.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + simbolo.valor.charCodeAt(i) + ";");
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === simbolo.valor.length) {
                traduccion.setTranslate("heap[(int)H] = -1;");
                traduccion.setTranslate("H = H + 1;");
            }
        }
    }
    
    for (const key in raiz.listaEntornos) {
        traducirXmlRecursive(raiz.listaEntornos[key], cont + 1);
    }
}