import { Expression } from "@angular/compiler";
import Tipo, { tipoDato } from "src/app/Backend/XQUERY/Analizador/Simbolos/Tipo";
import { Instruccion } from "src/app/Backend/XQUERY/Analizador/Abstracto/Instruccion";
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";

export default class Substring extends Instruccion {
    public expresion1: Instruccion;
    public expresion2: Instruccion;


    constructor(expresion1: Instruccion, expresion2: Instruccion, linea: number, columna: number,) {
        super(new Tipo(tipoDato.ENTERO), linea, columna);
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;


    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {

    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }


}