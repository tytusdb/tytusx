import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Exit extends Instruccion {

    constructor(fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        return "exit;"
    }
}