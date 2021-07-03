import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { traduccion } from "../../Traduccion/traduccion";
import { traducirXmlRecursive } from "../../Traduccion/xml3d";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { ManejadorXquery } from "../manejadores/ManejadorXquery";

export class Return implements ExpressionXquery{
    
    constructor(
        public line: Number,
        public column: Number, 
        public L_Exps: ExpressionXquery[]){}
    

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {

        console.log(this.L_Exps);
       
        var content : Retorno[] = [];
        
        for (const Xquery of this.L_Exps) {

            const resultExp = Xquery.executeXquery(entAct, RaizXML)

            if (resultExp.type === tipoPrimitivo.RESP){
                ManejadorXquery.concatenar(content, resultExp.value);
            }else {
                content.push(resultExp);
            }
        }

        var temp = ManejadorXquery.buildXquery(content);

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
        return {value: temp, type : tipoPrimitivo.STRING , SP: traduccion.stackCounter}
    }

    GraficarAST(texto: string): string {
        throw new Error("Method not implemented.");
    }

}