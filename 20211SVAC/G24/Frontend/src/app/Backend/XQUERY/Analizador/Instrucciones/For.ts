import { Instruccion } from "src/app/Backend/Optimizacion/Abstracto/Instruccion";
import Arbol from "src/app/Backend/Optimizacion/Simbolo/Arbol";
import Tipo, { tipoDato } from "src/app/Backend/Optimizacion/Simbolo/Tipo";
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";

export default class For extends Instruccion {


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
}