import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";

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

    interpretar(arbol: Arbol, tabla: tablaSimbolos) {


    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}