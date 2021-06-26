import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Unario extends Instruccion {
    private operando: String;
    private expresion: Instruccion;
    constructor(operando:String, expresion2: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.operando=operando
        this.expresion= expresion2
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // operando1 operacion operando2
        throw new Error("Method not implemented.");
    }

}