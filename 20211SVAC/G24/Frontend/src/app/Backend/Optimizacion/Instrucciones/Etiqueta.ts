import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Etiqueta extends Instruccion {

    public identificador: string;
    constructor(identificador: string, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
      return this
    }

}