import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { Return } from "./Return";

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
        public ret: Return){}
    
    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
        
        var result : string= "";

        var content: Retorno = this.select.executeXquery(entAct, RaizXML);
        if (content.type === tipoPrimitivo.RESP){
  
            var nvoEnt: EntornoXQuery = new EntornoXQuery(entAct, "sentencia for");
            for (const element of content.value) {
                
                nvoEnt.guaradarVar(this.idIn , element);
                if (this.validarWhere(nvoEnt, RaizXML)){
                    result += this.ret.executeXquery(nvoEnt, RaizXML).value;
                }
            }
            return {value: result, type : tipoPrimitivo.STRING, SP: -1}
            
        }else {
            throw new Error("Error semantico: la variable "+ this.idIn + " no es una variable iterable prveniente de una consulta, linea: " +this.line + "columna: "+ this.column);
        }
    }

    private validarWhere(entAct: EntornoXQuery, RaizXML: Entorno) : boolean{

        var result  = this.where?.executeXquery(entAct, RaizXML)
        if (result !== undefined){
            
            if (result.type === tipoPrimitivo.BOOL){
                return result.value; 
            }else {
                throw new Error("Error Semntico: la expresion del where es de tipo : "+result.type.toString()+" y debe ser de tipo boolean, linea: " +this.line + "columna: "+ this.column);
            }
        }
        return true;
    }

    GraficarAST(texto: string): string {
        throw new Error("Method not implemented.");
    }

}