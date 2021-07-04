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
       
        var content : Retorno[] = [];
        for (const path of this.paths) {
            ManejadorXquery.concatenar(content, path.executeXquery(entAct, RaizXML).value);
        }
        return {value: ManejadorXquery.buildXquery(content), type : tipoPrimitivo.STRING, SP: -1}
    }

    GraficarAST(texto: string): string {
        throw new Error("Method not implemented.");
    }
}