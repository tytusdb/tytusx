import { Retorno } from "../../Interfaces/ExpressionXquery";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { Return } from "./Return";

export class Let implements ExpressionXquery{

    constructor (
        public line: Number,
        public column: Number,
        public idVar: string,
        public exp : ExpressionXquery, 
        public ret : Return | null){
    }
    
    public executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {

        if (!entAct.existeVar(this.idVar)){
            
            var content : Retorno =  this.exp.executeXquery(entAct, RaizXML); 
            entAct.guaradarVar(this.idVar, content, this.line, this.column);
            
        }else {
            throw new Error("Error Semantico: Se encuentra en uso el id: "+this.idVar+", Linea: "+this.line +" Columna: "+this.column );
        }

        if (this.ret !== null){
            return this.ret.executeXquery(entAct, RaizXML);
        }else {
            return {value: [], type: tipoPrimitivo.VOID, SP:-1}
        }
        
    }

    GraficarAST(texto: string): string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"" + this.idVar.toString() + "\"];\n";
        texto = this.exp.GraficarAST(texto);
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> " + "nodo" + this.exp.line.toString() + "_" + this.exp.column.toString() + "\n";
        if(this.ret !== null) {
            texto = this.ret.GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> " + "nodo" + this.ret.line.toString() + "_" + this.ret.column.toString() + "\n";
        }
        return texto;
    }


}