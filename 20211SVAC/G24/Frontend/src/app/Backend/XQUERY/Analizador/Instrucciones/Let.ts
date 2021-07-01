import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";

export default class Let extends Instruccion {

    private variable: String;
    private expresion: Instruccion|String;
    private retorno: Instruccion;

    constructor(variable: String, expreison:Instruccion|String,retorno:Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.variable = variable;
        this.expresion = expreison;
        this.retorno = retorno;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }

}