import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class AsignacionEstructura extends Instruccion {

    private Temporales: Instruccion;
    private ListaCorchetes: Instruccion;
    private Expresion: Instruccion;
    constructor(termino:Instruccion,l_corchetes:Instruccion, expresion: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Temporales = termino
        this.ListaCorchetes=l_corchetes
        this.Expresion= expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // si es Temporal y si es expresion las instrucciones, ListaCorchetes tipo Instruccion
        throw new Error("Method not implemented.");
    }

}