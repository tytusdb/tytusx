import { Expression } from "@angular/compiler";
import Tipo, { tipoDato } from "src/app/Backend/XQUERY/Analizador/Simbolos/Tipo";
import { Instruccion } from "src/app/Backend/XQUERY/Analizador/Abstracto/Instruccion";
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";

export default class Upper extends Instruccion {
    public expresion:Instruccion;

    constructor(expresion: Instruccion,linea: number, columna: number,) {
        super(new Tipo(tipoDato.ENTERO), linea, columna);
        this.expresion = expresion;

    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        if (this.expresion instanceof Instruccion) {
            console.log("entre")
            var hola = this.expresion.interpretar(arbol, tabla, tablaxml);
            var resp = hola.toString();
            var uper=resp.toUpperCase();
            return uper;
        }
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    

 }