import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Funcion extends Instruccion {

    public identificador: string;
    public l_corchetes: Instruccion[];
    constructor(identificador: string, expresion:Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador.toLowerCase();
        this.l_corchetes= expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // void main (){ INSTRUCCIONES Y POR ULTIMO AGREGAR CADENA "}" ACA SE HARA LA MAGIA
        throw new Error("Method not implemented.");
    }

}