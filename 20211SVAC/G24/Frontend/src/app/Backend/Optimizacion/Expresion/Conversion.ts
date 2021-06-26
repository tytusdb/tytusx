import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Conversion extends Instruccion {
    private tipo: String;
    private expresion: Instruccion;
    constructor(operando:String, expresion2: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.tipo=operando
        this.expresion= expresion2
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // operando1 operacion operando2
        throw new Error("Method not implemented.");
    }

}