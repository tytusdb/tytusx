import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { Return } from "./Return";
import { traduccion } from '../../Traduccion/traduccion';

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

        console.log(this.idIn);
        console.log(this.idAt);
        console.log(this.select);
        console.log(this.where);
        console.log(this.ret);

        traduccion.setTranslate("\n//FOR\t--------------");
        //TRADUCCION3D##########################################################################################
        traduccion.stackCounter++;
        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
        traduccion.setTranslate("\n//INTRODUCIENDO ID FOR\t--------------");

        for (let i = 0; i < this.idIn.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + this.idIn.charCodeAt(i) + ";" + "\t\t//Caracter " + this.idIn[i].toString());
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === this.idIn.length) {
                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                traduccion.setTranslate("H = H + 1;");
            }
        }
        //#######################################################################################################
        
        var result : string= "";

        var content: Retorno = this.select.executeXquery(entAct, RaizXML);
        if (content.type === tipoPrimitivo.RESP){
  
            var nvoEnt: EntornoXQuery = new EntornoXQuery(entAct, "sentencia for");
            for (const element of content.value) {
                
                nvoEnt.guaradarVar(this.idIn , element, this.line, this.column);
                if (this.validarWhere(nvoEnt, RaizXML)){
                    result += this.ret.executeXquery(nvoEnt, RaizXML).value;
                }
            }
            //TRADUCCION3D##########################################################################################
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
            traduccion.setTranslate("\n//Ingresando String\t--------------");

            for (let i = 0; i < result.length; i++) {
                traduccion.setTranslate("heap[(int)H] = " + result.charCodeAt(i) + ";" + "\t\t//Caracter " + result[i].toString());
                traduccion.setTranslate("H = H + 1;");
                if (i + 1 === result.length) {
                    traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                    traduccion.setTranslate("H = H + 1;");
                }
            }
            //#######################################################################################################


            return {value: result, type : tipoPrimitivo.STRING, SP: traduccion.stackCounter}
            
        }else {
            throw new Error("Error semantico: la variable "+ this.idIn + " no es una variable iterable prveniente de una consulta, linea: " +this.line + "columna: "+ this.column);
        }
    }

    
    private validarWhere(entAct: EntornoXQuery, RaizXML: Entorno) : boolean{
        traduccion.setTranslate("\n//VALIDACIONES WHERE\t--------------");

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
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"" + this.idIn.toString() + "\"];\n";
        texto = this.select.GraficarAST(texto);
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.select.line.toString() + "_" + this.select.column.toString() + ";\n";
        if(this.where !== null) {
            texto = this.where.GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.where.line.toString() + "_" + this.where.column.toString() + ";\n";
        }
        if(this.orderBy !== null) {
            texto = this.orderBy.GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.orderBy.line.toString() + "_" + this.orderBy.column.toString() + ";\n";
            texto += "nodo" + this.orderBy.line.toString() + "_" + this.orderBy.column.toString() + " -> nodoOrden" + this.orderBy.line.toString() + "_" + this.orderBy.column.toString() + "[label=\"" + this.orden.toString() + "\"];\n";
        }
        texto = this.ret.GraficarAST(texto);
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + " -> nodo" + this.ret.line.toString() + "_" + this.ret.column.toString() + ";\n";
        return texto;
    }

}