import { Expression, Retorno } from "../../Interfaces/Expresion";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { tipoPrimitivo } from "../../xpathAST/Expresiones/Primitivo";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { Path } from "../ExpresionesXpath/Path";
import { XqueryPath } from "./XqueryPath";

export class Let implements ExpressionXquery{

    constructor (
        public line: Number,
        public column: Number,
        public idVar,
        public path : Path | XqueryPath){
    }

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {

        var content : Retorno = {value:[], type: tipoPrimitivo.RESP} 

        if (entAct.existeLocalVar(this.idVar)){

            if (this.path instanceof Path){
                content = this.path.execute(RaizXML); 
            }else {
                content = this.path.executeXquery(entAct, RaizXML);
            }

            entAct.guaradarVar(this.idVar, content)

        }else {
            throw new Error("Error Semantico: Se encuentra en uso el id: "+this.idVar+", Linea: "+this.line +" Columna: "+this.column );
        }
        return {value : "", type: tipoPrimitivo.STRING}
    }

}