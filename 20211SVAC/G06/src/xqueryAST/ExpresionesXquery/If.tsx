import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { Simbolo } from "../../xmlAST/Simbolo";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";

export class If implements ExpressionXquery{

    constructor(
    public line:Number,
    public column:Number,
    public condicion: ExpressionXquery,
    public exp : ExpressionXquery,
    public elseif: ExpressionXquery | null){}
    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno, simboloPadre?: Simbolo): Retorno {
        
        const condicion = this.condicion.executeXquery(entAct, RaizXML)
        if (condicion.type !== tipoPrimitivo.BOOL){ 
            throw new Error("Error Semantico: la expresion del if es de tipo: "+condicion.type+" y debe ser tipo boolean, linea: "+this.line+ " column: "+this.column);
        }

        if (condicion.value === true){
            return this.exp.executeXquery(entAct, RaizXML);
        }else {
        
            const elseif = this.elseif?.executeXquery(entAct, RaizXML); 
            if (elseif === undefined){
                return {value : [], type: tipoPrimitivo.VOID, SP: -1}
            }
            return elseif;

        }
        
    }
    GraficarAST(texto: string): string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"IF\"];\n";
        texto = this.condicion.GraficarAST(texto);
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.condicion.line.toString() + "_" + this.condicion.column.toString() + ";\n";
        texto = this.exp.GraficarAST(texto);
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.exp.line.toString() + "_" + this.exp.column.toString() + ";\n";
        if(this.elseif !== null) {
            texto = this.elseif.GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.elseif.line.toString() + "_" + this.elseif.column.toString() + ";\n";
        }
        return texto;
    }

}