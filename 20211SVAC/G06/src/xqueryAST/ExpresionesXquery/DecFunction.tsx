import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { Simbolo } from "../../xmlAST/Simbolo";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { Let } from "./Let";

export class DecFunction implements ExpressionXquery{


    constructor(
        public line: Number, 
        public column: Number,
        public idFunc: string,
        public decsParams : Let[],
        public tipo: tipoPrimitivo,
        public L_xQuerys : ExpressionXquery[]){}


    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno, simboloPadre?: Simbolo): Retorno {
        
        if (entAct.nombreEntXquery === "global"){

            if (!entAct.existeFunc(this.idFunc)){
                entAct.guaradarFunc(this.idFunc, this);
            }else {
                throw new Error("Error semantico: la id: "+ this.idFunc + " de la funcion ya existe, linea: " +this.line + " columna: "+ this.column);
            }
        }else {
            throw new Error("Error semantico: no de puede declarar la funcion "+ this.idFunc + ", solo se pueden declar fuinciones en un ambiente global, linea: " +this.line + " columna: "+ this.column);
        }
        return {value: [], type : tipoPrimitivo.VOID, SP: -1}
    }
    GraficarAST(texto: string): string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"Funcion: " + this.idFunc.toString() + "\"];\n";
        for (const key in this.decsParams) {
            texto = this.decsParams[key].GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.decsParams[key].line.toString() + "_" + this.decsParams[key].column.toString() + ";\n"
        }
        for (const key in this.L_xQuerys) {
            texto = this.L_xQuerys[key].GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.L_xQuerys[key].line.toString() + "_" + this.L_xQuerys[key].column.toString() + ";\n"
        }
        return texto;
    }

}