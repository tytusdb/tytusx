import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Asignacion extends Instruccion {

    private Temporales: Instruccion;
    private Expresion: Instruccion;
    constructor(termino:Instruccion, expresion: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Temporales = termino
        this.Expresion= expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // si es termino y si es expresion las instrucciones
        throw new Error("Method not implemented.");
    }

}