import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Condicion extends Instruccion {

    private operando1: Instruccion;
    private operando2: Instruccion;
    private operador: String;
    private operandoUnico: Instruccion;
    constructor(operador: String, linea: number, columna: number, op1: Instruccion, op2?: Instruccion) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.operador = operador;
        if (!op2) this.operandoUnico = op1;
        else {
            this.operando1 = op1;
            this.operando2 = op2;
        }
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        console.log("aqui iria la consulta");
        console.log(tabla);

    }
    public getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    public codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}