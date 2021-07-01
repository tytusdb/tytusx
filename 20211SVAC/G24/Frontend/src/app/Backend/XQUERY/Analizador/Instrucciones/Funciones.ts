import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";

export default class ForSimple extends Instruccion {
  


    private Identificador: String;
    private Parametros:Instruccion[];
    private Tipo:Tipo;
    private Bloque:Instruccion[];

    constructor(identificador: String, parametros:Instruccion[], tipo:Tipo, bloque: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.Identificador = identificador;
        this.Parametros=parametros;
        this.Tipo=tipo;
        this.Bloque=bloque;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        

    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}