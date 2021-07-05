import { Entorno } from '../../xmlAST/Entorno';
import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { Simbolo } from '../../xmlAST/Simbolo';
import { EntornoXQuery } from '../AmbientesXquery/EntornoXQuery';
import { traduccion } from '../../Traduccion/traduccion';

export enum tipoPrimitivo {
    NUMBER,
    STRING,
    BOOL,
    NODO,
    RESP,
    VOID,
    error
}

export class Primitivo implements ExpressionXquery{
    
    constructor (
    public line : Number, 
    public column : Number, 
    public valor : any, 
    public tipoPrimitivo? : tipoPrimitivo) {}
    
    
    public executeXquery(entXquery: EntornoXQuery, ent: Entorno, simboloPadre?:Simbolo) : Retorno {
        
        if (this.tipoPrimitivo === tipoPrimitivo.NUMBER) {
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//Ingresando primitivo numero\t--------------");
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + Number(this.valor) + ";");
            //###############################################################################################################
            return { value: Number(this.valor), type: tipoPrimitivo.NUMBER, SP: traduccion.stackCounter };
        }else if (this.tipoPrimitivo === tipoPrimitivo.STRING) {
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//Ingresando primitivo Cadena\t--------------\n");
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");

            for (let i = 0; i < String(this.valor).length; i++) {
                traduccion.setTranslate("heap[(int)H] = " + String(this.valor).charCodeAt(i) + ";" + "\t\t//Caracter " + String(this.valor)[i].toString());
                traduccion.setTranslate("H = H + 1;");
                if (i + 1 === String(this.valor).length) {
                    traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                    traduccion.setTranslate("H = H + 1;");
                }
            }
            //###############################################################################################################
            return { value: String(this.valor), type: tipoPrimitivo.STRING, SP: traduccion.stackCounter };
        }else if (this.valor === "position"){

            if (simboloPadre !== undefined){
                //TRADUCCION 3D#################################################################################################
                traduccion.setTranslate("\n//Ingresando primitivo posicion\t--------------");
                traduccion.stackCounter++;
                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + Number(simboloPadre.pos) + ";");
                //###############################################################################################################
                return {value: simboloPadre.pos, type: tipoPrimitivo.NUMBER, SP: traduccion.stackCounter}
            }else {
                //TRADUCCION 3D#################################################################################################
                traduccion.setTranslate("\n//Ingresando primitivo posicion\t--------------");
                traduccion.stackCounter++;
                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + Number(ent.pos) + ";");
                //###############################################################################################################
                return {value: ent.pos, type: tipoPrimitivo.NUMBER, SP: traduccion.stackCounter}
            }

        }else if (this.valor === "last"){

            if (simboloPadre !== undefined){
                //TRADUCCION 3D#################################################################################################
                traduccion.setTranslate("\n//Ingresando primitivo last\t--------------");
                traduccion.stackCounter++;
                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + Number(simboloPadre.last) + ";");
                //###############################################################################################################
                return {value: simboloPadre.last, type: tipoPrimitivo.NUMBER, SP: traduccion.stackCounter}
            }else {
                //TRADUCCION 3D#################################################################################################
                traduccion.setTranslate("\n//Ingresando primitivo last\t--------------");
                traduccion.stackCounter++;
                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + Number(ent.last) + ";");
                //###############################################################################################################
                return {value: ent.last, type: tipoPrimitivo.NUMBER, SP: traduccion.stackCounter}
            }
            
        }else {
            throw new Error("Error Semantico: no se reconoce el valor, Linea: "+this.line+"Column: "+this.column);
        }
    }

    public GraficarAST(texto:string):string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"" + this.valor.toString() + "\"];\n";
        return texto;
    }
}