import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { ManejadorXquery } from "../manejadores/ManejadorXquery";

export class Return implements ExpressionXquery{
    
    constructor(
        public line: Number,
        public column: Number, 
        public L_Exps: ExpressionXquery[]){}
    

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
       
        if (this.L_Exps.length > 1) {

            var result : Retorno[] = [];

            for (const Xquery of this.L_Exps) {

                const resultXquery = Xquery.executeXquery(entAct, RaizXML);
                if (resultXquery.type === tipoPrimitivo.RESP){
                    ManejadorXquery.concatenar(result, resultXquery.value);
                }else if (resultXquery.type !== tipoPrimitivo.VOID ) {
                    result.push(resultXquery);
                }
            }
            
            if (result.length > 1){
                return {value: result, type : tipoPrimitivo.RESP, SP: -1};
            }else if (result.length === 1) {
                return result[0];
            }else {
                return {value: [] , type: tipoPrimitivo.VOID, SP: -1};
            }

        } else if (this.L_Exps.length === 1) {
            return this.L_Exps[0].executeXquery(entAct, RaizXML);
        }else {
            return {value: [], type: tipoPrimitivo.VOID, SP: -1}
        }
    }

    GraficarAST(texto: string): string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"Return\"];\n";
        for (const key in this.L_Exps) {
            texto = this.L_Exps[key].GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.L_Exps[key].line.toString() + "_" + this.L_Exps[key].column.toString() + "\n";
        }
        return texto;
    }

}