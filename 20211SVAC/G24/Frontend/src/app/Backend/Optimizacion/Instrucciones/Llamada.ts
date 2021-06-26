import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Llamada extends Instruccion {
    public identificador: string;
    constructor(identificador: string, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador.toLowerCase();
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        return this
    }

}