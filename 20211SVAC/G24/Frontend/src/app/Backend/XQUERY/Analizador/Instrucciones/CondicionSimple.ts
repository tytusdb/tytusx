import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import BarrasNodo from "src/app/Backend/XPATH/Analizador/Instrucciones/BarrasNodo";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class CondicionSimple extends Instruccion {
  
    public variables: String;
    public consulta:Instruccion[];
    public recursivo:Instruccion;
    constructor(variables: String, consulta:Instruccion[], linea: number, columna: number, recursivo:Instruccion) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.consulta = consulta;
        this.variables=variables;
        this.recursivo= recursivo;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        if(this.consulta!=null){
        return {variables: this.variables, consulta: this.consulta}
        }else{
            if(this.recursivo!=null){
                return {variables: this.variables, recursivo: this.recursivo}
            }
        }

    }
    public getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    public codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}