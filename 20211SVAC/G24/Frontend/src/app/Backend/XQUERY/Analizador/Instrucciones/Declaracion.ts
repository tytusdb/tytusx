
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import Llamada from "./Llamada";

export default class Declaracion extends Instruccion {

    public identificador: string;
    public Tipo: String;
    constructor(identificador: string, expresion:String, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador;
        this.Tipo = expresion
    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        var auxTipo:Tipo
        if(this.Tipo==="decimal"){
            auxTipo= new Tipo(tipoDato.DECIMAL)
        }else if(this.Tipo==="integer"){
            auxTipo= new Tipo(tipoDato.ENTERO)
        }else if(this.Tipo==="float"){
            auxTipo= new Tipo(tipoDato.DECIMAL)
        }else if(this.Tipo==="char"){
            auxTipo= new Tipo(tipoDato.CARACTER)
        }else if(this.Tipo==="boolean"){
            auxTipo= new Tipo(tipoDato.BOOLEANO)
        }
        var simbolo = new Simbolo(auxTipo, this.identificador, this.fila.toString(), this.columna.toString(), Llamada.prototype.identificador, "");
        tabla.setVariable(simbolo)
        return this.identificador
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}