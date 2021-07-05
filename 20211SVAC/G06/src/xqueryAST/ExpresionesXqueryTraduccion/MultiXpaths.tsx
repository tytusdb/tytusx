import { Retorno } from "../../Interfaces/ExpressionXquery";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { Path } from "../ExpresionesXpath/Path";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { ManejadorXquery } from "../manejadores/ManejadorXquery";
import { traduccion } from '../../Traduccion/traduccion';

export class MultiXpaths implements ExpressionXquery{
    
    constructor(
        public line: number,
        public column: number,
        public paths : Path[]){}
    

    public executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
       
        var content : Retorno[] = [];
        for (const path of this.paths) {
            ManejadorXquery.concatenar(content, path.executeXquery(entAct, RaizXML).value);
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

        return {value: temp , type : tipoPrimitivo.STRING, SP : traduccion.stackCounter}
    }

    GraficarAST(texto: string): string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"MutliXpaths\"];\n";
        for (const key in this.paths) {
            texto = this.paths[key].GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.paths[key].line.toString() + "_" + this.paths[key].column.toString() + ";\n";
        }
        return texto;
    }
}