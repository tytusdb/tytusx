import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { Path } from "../ExpresionesXpath/Path";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { ManejadorXquery } from "../manejadores/ManejadorXquery";

export class For implements ExpressionXquery{

    constructor(
        public line: Number,
        public column: Number, 
        public idIn: string,
        public idAt: string, 
        public select: ExpressionXquery,
        public where: ExpressionXquery | null,
        public orderBy: ExpressionXquery | null,   
        public orden: string,
        public ret: ExpressionXquery){}
    
    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
        
        var nvoEnt: EntornoXQuery = new EntornoXQuery(entAct);

        var result : Retorno[]= [];
        var content: Retorno = this.select.executeXquery(entAct, RaizXML);

        for (const element of content.value) {
            
            if (this.validarWhere(nvoEnt, RaizXML)){
                nvoEnt.guaradarVar(this.idIn , element);
                ManejadorXquery.concatenar(result, this.ret.executeXquery(nvoEnt, RaizXML).value);
            }
        }
        return {value: ManejadorXquery.buildXquery(result), type : tipoPrimitivo.STRING}
    }

    private validarWhere(entAct: EntornoXQuery, RaizXML: Entorno) : boolean{

        var result  = this.where?.executeXquery(entAct, RaizXML)
        if (result != null){
            
            if (result.type === tipoPrimitivo.BOOL){
                return result.value; 
            }else {
                throw new Error("Error Semntico: la expresion de la sentencia where es de tipo : "+result.type.toString()+" y debe ser de tipo bool");
            }
        }
        return true;
    }

    GraficarAST(texto: string): string {
        throw new Error("Method not implemented.");
    }

}