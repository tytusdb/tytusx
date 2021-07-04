import { Retorno } from "../../Interfaces/ExpressionXquery";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { Path } from "../ExpresionesXpath/Path";
import { ManejadorXquery } from "../manejadores/ManejadorXquery";

export class XqueryPath implements ExpressionXquery{
    
    constructor(
        public line: number,
        public column: number,
        public idVar: string,
        public accesos: Path){}
   
    public executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
        
        var varFind = entAct.getVar(this.idVar);  
        if (varFind != null){

            if (varFind.type === tipoPrimitivo.RESP){

                var result : Retorno[] = [];

                for (const element of varFind.value) {

                    if (element.type === tipoPrimitivo.NODO){
                        ManejadorXquery.concatenar(result, this.accesos.executeXquery(entAct, element.value).value) ;
                    }else {
                        result.push(element);
                    }
                }

                if (result.length > 1){
                    return {value: result, type : tipoPrimitivo.RESP, SP: -1};
                }else if (result.length === 1) {
                    return result[0];
                }else {
                    return {value: [] , type: tipoPrimitivo.VOID, SP: -1};
                }

            }else if (varFind.type === tipoPrimitivo.NODO){
                return this.accesos.executeXquery(entAct, varFind.value)
            }else {
                return varFind;
            }

        }else {
            throw new Error("Error Semantico: No se encuentra el id: "+this.idVar+", Linea: "+this.line +" Columna: "+this.column );
        }
    }
    
    GraficarAST(texto: string): string {
        throw new Error("Method not implemented.");
    }
//return {value: ManejadorXquery.buildXquery(content), type : tipoPrimitivo.STRING}
}