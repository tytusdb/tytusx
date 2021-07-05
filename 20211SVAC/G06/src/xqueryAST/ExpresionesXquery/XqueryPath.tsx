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
                        ManejadorXquery.concatenar(result, this.accesos.executeXquery(entAct, element.value).value);
                    }else {
                        
                        if (this.accesos.L_Accesos.length === 0){
                            result.push(element);
                        }else {
                            throw new Error("Error Semantico: la variable no es de tipo Nodo para ejecutar el path: "+this.idVar+", Linea: "+this.line +" Columna: "+this.column );
                        }
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
                
                if(this.accesos.L_Accesos.length === 0){
                    return varFind;
                }else {
                    throw new Error("Error Semantico: la variable no es de tipo Nodo para ejecutar el path: "+this.idVar+", Linea: "+this.line +" Columna: "+this.column );
                }
            }

        }else {
            throw new Error("Error Semantico: No se encuentra el id: "+this.idVar+", Linea: "+this.line +" Columna: "+this.column );
        }
    }
    
    GraficarAST(texto: string): string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"" + this.idVar.toString() + "\"];\n";
        for (const key in this.accesos.L_Accesos) {
            texto = this.accesos.L_Accesos[key].GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.accesos.L_Accesos[key].line.toString() + "_" + this.accesos.L_Accesos[key].column.toString() + "\n";
        }
        return texto;
    }
//return {value: ManejadorXquery.buildXquery(content), type : tipoPrimitivo.STRING}
}