import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Tipo, { tipoDato } from "../Simbolos/Tipo";


export default class Llamada extends Instruccion {

    public identificador: string;
    public parametros: Instruccion[];
    constructor(identificador: string,parametros:Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador;
        this.parametros=parametros;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        return this.identificador+"();"
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}