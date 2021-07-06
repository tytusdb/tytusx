import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class ForToSimple extends Instruccion {

    private variable: Instruccion;
    private respuesta: Instruccion;
    private num1: number;
    private num2: number

    constructor(variable: Instruccion, respuesta: Instruccion, num1: number, num2: number, linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.variable = variable;
        this.respuesta = respuesta;
        this.num1 = num1;
        this.num2 = num2;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        var nu1 = this.num1
        var nu2 = this.num2
        let cadena=""

        for (let index = nu1; index <=nu2; index++) {
            cadena+="$"+index + "\n"
            
        }
        return cadena;


    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}