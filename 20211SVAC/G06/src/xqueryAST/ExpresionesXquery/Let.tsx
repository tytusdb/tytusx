import { Retorno } from "../../Interfaces/ExpressionXquery";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { Return } from "./Return";
import { traduccion } from '../../Traduccion/traduccion';

export class Let implements ExpressionXquery{

    constructor (
        public line: Number,
        public column: Number,
        public idVar: string,
        public exp : ExpressionXquery, 
        public ret : Return){
    }
    
    public executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {

        if (!entAct.existeVar(this.idVar)){
            
            var content : Retorno =  this.exp.executeXquery(entAct, RaizXML); 
            entAct.guaradarVar(this.idVar, content);
            
        }else {
            throw new Error("Error Semantico: Se encuentra en uso el id: "+this.idVar+", Linea: "+this.line +" Columna: "+this.column );
        }

        var temp = this.ret.executeXquery(entAct, RaizXML).value;

        //TRADUCCION3D##########################################################################################
        traduccion.stackCounter++;
        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
        traduccion.setTranslate("\n//Ingresando String\t--------------");

        for (let i = 0; i < temp.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + temp.charCodeAt(i) + ";" + "\t\t//Caracter " + temp[i].toString());
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === temp.length) {
                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                traduccion.setTranslate("H = H + 1;");
            }
        }
        //#######################################################################################################

        return {value : temp, type: tipoPrimitivo.STRING, SP: traduccion.stackCounter}
    }

    GraficarAST(texto: string): string {
        throw new Error("Method not implemented.");
    }


}