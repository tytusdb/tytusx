import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Declaracion extends Instruccion {

    public identificador: string;
    public l_corchetes: [];
    constructor(identificador: string, expresion:[], fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador.toLowerCase();
        this.l_corchetes= expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // CONCATENAR EL ; DESPUES DE RECORRER LO DE CORCHETES
        throw new Error("Method not implemented.");
    }

}