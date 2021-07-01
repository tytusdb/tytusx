import { Retorno } from "../../Interfaces/Expresion";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { Path } from "../../xpathAST/Expresiones/Path";
import { tipoPrimitivo } from "../../xpathAST/Expresiones/Primitivo";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { showXquery } from "../manejadores/showXquery";

export class MultiXpaths implements ExpressionXquery{
    

    constructor(
        public line: number,
        public column: number,
        public paths : Path[]){}

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
       
        var content : Retorno[] = [];
       
        for (const path of this.paths) {
            content.concat(path.execute(RaizXML).value)
        }
        return {value: showXquery.buildXquery(content), type : tipoPrimitivo.STRING}
    }

}