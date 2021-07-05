import { Retorno } from "../../Interfaces/ExpressionXquery";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { Return } from "./Return";
import { traduccion } from '../../Traduccion/traduccion';

export class Let implements ExpressionXquery {

    constructor(
        public line: Number,
        public column: Number,
        public idVar: string,
        public exp: ExpressionXquery,
        public ret: Return) {
    }

    public executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
        
        //console.log(this.idVar);
        //console.log(this.exp);
        //onsole.log(this.ret);

        //TRADUCCION3D##########################################################################################
        traduccion.setTranslate("\n//LET\t--------------");
        //######################################################################################################
        //TRADUCCION3D##########################################################################################
        traduccion.stackCounter++;
        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
        traduccion.setTranslate("\n//INTRODUCIENDO EL ID DE LA VARIABLE\t--------------");

        for (let i = 0; i < this.idVar.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + this.idVar.charCodeAt(i) + ";" + "\t\t//Caracter " + this.idVar[i].toString());
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === this.idVar.length) {
                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                traduccion.setTranslate("H = H + 1;");
            }
        }
        //#######################################################################################################
        console.log(this.exp);
        for (const key in this.exp) {
            if (key === "L_Accesos") {
                for (const iterator of this.exp[key]) {
                    if (iterator.id) {
                        //TRADUCCION3D##########################################################################################
                        traduccion.stackCounter++;
                        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
                        traduccion.setTranslate("\n//INTRODUCIENDO PATH LET\t--------------");

                        for (let i = 0; i < iterator.id.length; i++) {
                            traduccion.setTranslate("heap[(int)H] = " + iterator.id.charCodeAt(i) + ";" + "\t\t//Caracter " + iterator.id[i].toString());
                            traduccion.setTranslate("H = H + 1;");
                            if (i + 1 === iterator.id.length) {
                                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                                traduccion.setTranslate("H = H + 1;");
                            }
                        }
                        //#######################################################################################################
                    }
                }
            }
        }

        if (!entAct.existeVar(this.idVar)) {

            var content: Retorno = this.exp.executeXquery(entAct, RaizXML);
            entAct.guaradarVar(this.idVar, content);

        } else {
            throw new Error("Error Semantico: Se encuentra en uso el id: " + this.idVar + ", Linea: " + this.line + " Columna: " + this.column);
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

        return { value: temp, type: tipoPrimitivo.STRING, SP: traduccion.stackCounter }
    }

    GraficarAST(texto: string): string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"" + this.idVar.toString() + "\"];\n";
        texto = this.exp.GraficarAST(texto);
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> " + "nodo" + this.exp.line.toString() + "_" + this.exp.column.toString() + "\n";
        texto = this.ret.GraficarAST(texto);
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> " + "nodo" + this.ret.line.toString() + "_" + this.ret.column.toString() + "\n";
        return texto;
    }


}