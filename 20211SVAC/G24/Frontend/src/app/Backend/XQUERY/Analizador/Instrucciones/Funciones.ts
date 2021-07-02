
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";


export default class Funcion extends Instruccion {
    private Identificador: String;
    private Parametros: Instruccion[];
    private Tipo: Tipo;
    private Bloque: Instruccion[];

    constructor(identificador: String, parametros: Instruccion[], tipo: Tipo, bloque: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.Identificador = identificador;
        this.Parametros = parametros;
        this.Tipo = tipo;
        this.Bloque = bloque;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {

        if (this.Parametros != null) {
            var entorno = new tablaSimbolos(); /*entorno hijo */
            var simbolo = new Simbolo(new Tipo(tipoDato.FUNCION), this.Identificador, this.fila.toString(), this.columna.toString(),"", this.Bloque);
            entorno.setVariable(simbolo)
            this.Parametros.forEach(element => {
                element.interpretar(arbol, tabla, tablaxml);
            });
        } else {

        }


    }

    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}