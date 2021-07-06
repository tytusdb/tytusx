import { Expression } from "@angular/compiler";
import Tipo, { tipoDato } from "src/app/Backend/XQUERY/Analizador/Simbolos/Tipo";
import { Instruccion } from "src/app/Backend/XQUERY/Analizador/Abstracto/Instruccion";
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";

export default class Substring extends Instruccion {
    public expresion1: Instruccion;
    public numero: Instruccion;


    constructor(expresion1: Instruccion, numero: Instruccion, linea: number, columna: number,) {
        super(new Tipo(tipoDato.ENTERO), linea, columna);
        this.expresion1 = expresion1;
        this.numero = numero;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        if (this.expresion1 instanceof Instruccion) {
            console.log("entre")
            var cadena = this.expresion1.interpretar(arbol, tabla, tablaxml);
            var numerito = this.numero.interpretar(arbol, tabla, tablaxml);
            var resp = cadena.toString();
            var abr: any
            console.log("cadena")
            console.log(resp)

            console.log("numerito")
            console.log(numerito)

            var holita = resp.substring(numerito)
            console.log(holita)
            return holita
        }
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }


}