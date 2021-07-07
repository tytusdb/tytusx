import { Expression } from "@angular/compiler";
import Tipo, { tipoDato } from "src/app/Backend/XQUERY/Analizador/Simbolos/Tipo";
import { Instruccion } from "src/app/Backend/XQUERY/Analizador/Abstracto/Instruccion";
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Nativo from "../Expresiones/Nativo";
import { chown } from "fs";

export default class Number extends Instruccion {
    public expresion: Instruccion;

    constructor(expresion: Instruccion, linea: number, columna: number,) {
        super(new Tipo(tipoDato.ENTERO), linea, columna);
        this.expresion = expresion;

    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        if (this.expresion instanceof Instruccion) {
            console.log("entre")
            var hola = this.expresion.interpretar(arbol, tabla, tablaxml);
            var resp = hola.toString();

            var c1 = arbol.getContadort()
            arbol.codigo3d.push("//***Print Number****")
            arbol.codigo3d.push("$t" + c1 + "=hp;"); // guardara el inicio de la cadena
            arbol.codigo3d.push("$t2=" + resp + ";");
            arbol.codigo3d.push("NumberToString();");
            arbol.codigo3d.push("$t0=hp;");
            arbol.codigo3d.push("$t1=-1;");
            arbol.codigo3d.push("guardarString();");
            arbol.codigo3d.push("$t0= $t" + c1 + ";");
            arbol.codigo3d.push(`imprimirString();`);
            arbol.codigo3d.push(`printf("%c",10);`);
            return resp;
        }


    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }


}