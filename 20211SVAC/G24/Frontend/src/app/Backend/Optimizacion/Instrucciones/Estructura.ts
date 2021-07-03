import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Estructura extends Instruccion {

    private Temporales: Instruccion;
    private l_corhetes: Instruccion;
    constructor(termino:Instruccion, l_corchetes: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Temporales = termino
        this.l_corhetes= l_corchetes
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // si es termino y si es expresion las instrucciones
        throw new Error("Method not implemented.");
    }

}