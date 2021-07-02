import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class ForCompuesto extends Instruccion {
  


    private variable: Instruccion;
    private respuesta:Instruccion;
    private sentencia:Instruccion[];
    private thewhere:Instruccion;
    private theorderby:Instruccion;

    constructor(variable: Instruccion, respuesta:Instruccion, linea: number, columna: number,sentencia?: Instruccion[],thewhere?:Instruccion,theorderby?:Instruccion) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.variable = variable;
        this.respuesta=respuesta;
        this.sentencia=sentencia;
        this.thewhere=thewhere;
        this.theorderby=theorderby;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {


    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}