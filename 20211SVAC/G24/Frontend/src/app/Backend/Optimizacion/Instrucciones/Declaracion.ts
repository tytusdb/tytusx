import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import Identificador from "../Expresion/Identificador";
import { Instruccion } from "../Abstracto/Instruccion";
import Termino from "../Expresion/Termino";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Declaracion extends Instruccion {

    public identificador: string;
    public expresion: [] | Termino| Identificador;
    constructor(identificador: string, expresion: [] | Termino|Identificador, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador;
        this.expresion = expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // CONCATENAR EL ; DESPUES DE RECORRER LO DE CORCHETES
        var cadena = ""
        if (this.identificador != null) {
            cadena += this.identificador
        }
        if (this.expresion != null) {
            var stack = /\[/gi;
            // use of String search() Method
            if (this.identificador.search(stack) == -1) {
                if (this.expresion instanceof Termino) {
                    cadena += " "+this.expresion.valor + ";\n"
                }else if(this.expresion instanceof Identificador){
                    var variable = this.expresion.interpretar(arbol,tabla)
                    cadena+= " "+variable.contenido+";\n";
                }
            } else {
                if (this.expresion instanceof Array) {
                    for (var a of this.expresion) {
                        let temporal: Termino = a
                        cadena += temporal.valor + "];\n"
                    }
                }
            }
        }
        return cadena
    }

}