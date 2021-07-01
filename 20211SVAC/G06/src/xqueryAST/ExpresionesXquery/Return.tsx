import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { Path } from "../ExpresionesXpath/Path";
import { ManejadorXquery } from "../manejadores/ManejadorXquery";

export class Return implements ExpressionXquery{
    
    constructor(
        public line: Number,
        public column: Number, 
        public L_Xqueys: ExpressionXquery[]){}
    

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
       
        var content : Retorno[] = [];
        
        for (const Xquery of this.L_Xqueys) {
            ManejadorXquery.concatenar(content, Xquery.executeXquery(entAct, RaizXML).value);
        }
        return {value: ManejadorXquery.buildXquery(content), type : tipoPrimitivo.STRING}
    }

    GraficarAST(texto: string): string {
        throw new Error("Method not implemented.");
    }

}