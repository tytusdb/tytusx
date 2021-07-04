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
        public tipo: tipoPrimitivo,
        public decsParams : Let[],
        public xquery : ExpressionXquery){}


    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno, simboloPadre?: Simbolo): Retorno {
        
        if (entAct.nombreEntXquery === "global"){

            if (!entAct.existeFunc(this.idFunc)){
                entAct.guaradarFunc(this.idFunc, this);
            }else {
                throw new Error("Error semantico: la id: "+ this.idFunc + " de la funcion ya existe, linea: " +this.line + "columna: "+ this.column);
            }
        }else {
            throw new Error("Error semantico: no de puede declarar la funcion "+ this.idFunc + ", solo se pueden declar fuinciones en un ambiente global, linea: " +this.line + "columna: "+ this.column);
        }
        return {value: "", type : tipoPrimitivo.STRING, SP: -1}
    }
    GraficarAST(texto: string): string {
        throw new Error("Method not implemented.");
    }

}