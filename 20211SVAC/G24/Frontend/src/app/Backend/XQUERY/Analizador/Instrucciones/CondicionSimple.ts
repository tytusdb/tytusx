import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class CondicionSimple extends Instruccion {
  
    public variables: String;
    public consulta:Instruccion[];

    constructor(variables: String, consulta:Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.consulta = consulta;
        this.variables=variables;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
    console.log("aqui iria la consulta");
      console.log(tabla);

    }
    public getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    public codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}