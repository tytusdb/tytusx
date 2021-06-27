import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Bit extends Instruccion {

    private expresion1: Instruccion;
    private operando: String;
    private expresion2: Instruccion;
    constructor(expresion1:Instruccion,operando:String, expresion2: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.expresion1 = expresion1
        this.operando=operando
        this.expresion2= expresion2
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // operando1 operacion operando2
        throw new Error("Method not implemented.");
    }

}