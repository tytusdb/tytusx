import { Retorno } from "../../Interfaces/Expresion";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { tipoPrimitivo } from "../../xpathAST/Expresiones/Primitivo";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";

export class Return implements ExpressionXquery{
    
    constructor(
        public line: Number,
        public column: Number, 
        public L_Xqueys: ExpressionXquery[]){}

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
        var salida : string = "";
        for (const Xquery of this.L_Xqueys) {
            salida += Xquery.executeXquery(entAct, RaizXML).value 
        }
        return {value : salida, type: tipoPrimitivo.STRING, SP: -1}
    }
}