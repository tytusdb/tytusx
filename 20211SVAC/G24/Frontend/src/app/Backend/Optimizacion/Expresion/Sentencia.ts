import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Sentencia extends Instruccion {
    private expresion: Instruccion;
    constructor(expresion: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.expresion= expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // return; o return expresion;
        let cadena=""
        if(this.expresion!=null){
            let temp= this.expresion.interpretar(arbol,tabla);
            cadena+="return "+temp+";"
        }else{
            cadena+="return;"
        }
        return cadena;
    }

}