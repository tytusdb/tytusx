import { Retorno } from "../../Interfaces/ExpressionXquery";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";

export class Let implements ExpressionXquery{

    constructor (
        public line: Number,
        public column: Number,
        public idVar: string,
        public path : ExpressionXquery){
    }
    
    public executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {

        if (!entAct.existeVar(this.idVar)){
            
            var content : Retorno = content = this.path.executeXquery(entAct, RaizXML); 
            entAct.guaradarVar(this.idVar, content);
            
        }else {
            throw new Error("Error Semantico: Se encuentra en uso el id: "+this.idVar+", Linea: "+this.line +" Columna: "+this.column );
        }
        return {value : "", type: tipoPrimitivo.STRING}
    }

    GraficarAST(texto: string): string {
        throw new Error("Method not implemented.");
    }


}