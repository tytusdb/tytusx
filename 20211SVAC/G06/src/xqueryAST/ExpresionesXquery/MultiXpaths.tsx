import { Retorno } from "../../Interfaces/ExpressionXquery";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { Path } from "../ExpresionesXpath/Path";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { ManejadorXquery } from "../manejadores/ManejadorXquery";

export class MultiXpaths implements ExpressionXquery{
    
    constructor(
        public line: number,
        public column: number,
        public paths : Path[]){}
    

    public executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
       
        var result : Retorno[] = [];
        for (const path of this.paths) {
            ManejadorXquery.concatenar(result, path.executeXquery(entAct, RaizXML).value);
        }

        if (result.length > 1){
            return {value: result, type : tipoPrimitivo.RESP, SP: -1};
        }else if (result.length === 1) {
            return result[0];
        }else {
            return {value: [] , type: tipoPrimitivo.RESP, SP: -1};
        }
    }

    GraficarAST(texto: string): string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"MutliXpaths\"];\n";
        for (const key in this.paths) {
            texto = this.paths[key].GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.paths[key].line.toString() + "_" + this.paths[key].column.toString() + ";\n";
        }
        return texto;
    }
}