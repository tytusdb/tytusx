import { Retorno } from "../../Interfaces/Expresion";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { Path } from "../../xpathAST/Expresiones/Path";
import { tipoPrimitivo } from "../../xpathAST/Expresiones/Primitivo";
import { showXquery } from "../manejadores/showXquery";

export class XqueryPath implements ExpressionXquery{
    
    constructor(
        public line: number,
        public column: number,
        public idVar: string,
        public accesos: Path){
             
        }

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
        
        var content : Retorno[] = [];
        
        var varFind = entAct.getVar(this.idVar);  
        if (varFind != null){

            for (const element of varFind.value) {

                if (element.type === tipoPrimitivo.NODO){
                    content.concat(this.accesos.execute(element.value).value);
                }else {
                    content.push(element)
                }
            }

            if (this.accesos.tipoPath === 'sub'){
                return {value : content, type: tipoPrimitivo.RESP, SP: -1}
            }else {
                return {value: showXquery.buildXquery(content), type : tipoPrimitivo.STRING, SP: -1}
            }

        }else {
            throw new Error("Error Semantico: No se encuentra el id: "+this.idVar+", Linea: "+this.line +" Columna: "+this.column );
        }
    }
}