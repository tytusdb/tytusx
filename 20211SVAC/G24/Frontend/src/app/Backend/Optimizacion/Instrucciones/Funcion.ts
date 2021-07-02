import Simbolo from "../../XML/Analizador/Simbolos/Simbolo";
import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Funcion extends Instruccion {

    public identificador: string;
    public instrucciones: Instruccion[];
    constructor(identificador: string, expresion: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador;
        this.instrucciones = expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // void main (){ INSTRUCCIONES Y POR ULTIMO AGREGAR CADENA "}" ACA SE HARA LA MAGIA
        let cadena = ""
        cadena += this.identificador + "\n"
        let simbolo;
        if (this.instrucciones != null) {
            for (var ins of this.instrucciones) {
                var r = ins.interpretar(arbol, tabla);
                if (r != "") {
                    if (r instanceof String) {
                        cadena += r + "\n"
                    } else {
                        cadena += r + "\n"
                    }
                }
            }
        }
        return cadena + "}\n"
    }

}