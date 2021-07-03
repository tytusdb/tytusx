import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery"
import { EntornoXQuery } from '../AmbientesXquery/EntornoXQuery';
import { Entorno } from '../../xmlAST/Entorno';
import { Simbolo } from '../../xmlAST/Simbolo';
import { tipoPrimitivo } from './Primitivo';
import { traduccion } from '../../Traduccion/traduccion';


export enum operacionAritmetica {
    SUMA,  //mas
    RESTA,  //menos
    MULT,   //multiplicacion
    DIV,    //division
    MOD,
}

export class Aritmetico implements ExpressionXquery {

    constructor(
        public line: Number,
        public column: Number,
        public hijoIzq: ExpressionXquery,
        public hijoDer: ExpressionXquery,
        public tipoOperacion: operacionAritmetica,
        public sym: string) { }

    public executeXquery(entXquery: EntornoXQuery, ent: Entorno, simboloPadre?: Simbolo): Retorno {

        let valorIzq = this.hijoIzq.executeXquery(entXquery, ent, simboloPadre);
        let valorDer = this.hijoDer.executeXquery(entXquery, ent, simboloPadre);

        if (valorIzq.type === tipoPrimitivo.RESP || valorDer.type === tipoPrimitivo.RESP) {
            throw new Error("Error Semantico: incompatibilidad de tipos: tipo varlor 1: " + valorDer.type + ", tipo valor2 " + valorDer.type + ", Linea: " + this.line + "Column: " + this.column);
        } else if ((valorIzq.type === tipoPrimitivo.STRING || valorDer.type === tipoPrimitivo.STRING) && this.tipoOperacion === operacionAritmetica.SUMA) {
            return { value: (valorIzq.value + valorDer.value), type: tipoPrimitivo.STRING, SP: -1 };
        } else if ((valorIzq.type === tipoPrimitivo.NUMBER) && (valorDer.type === tipoPrimitivo.NUMBER)) {

            if (this.tipoOperacion === operacionAritmetica.SUMA) {
                //TRADUCCION 3D#################################################################################################
                traduccion.setTranslate("\n//SUMA ARITMETICA\t--------------");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + valorIzq.SP + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + valorDer.SP + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = t" + (traduccion.t - 2) + " + t" + (traduccion.t - 1) + ";");
                traduccion.stackCounter++;
                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
                //###############################################################################################################
                return { value: (valorIzq.value + valorDer.value), type: tipoPrimitivo.NUMBER, SP: traduccion.stackCounter };
            } else if (this.tipoOperacion === operacionAritmetica.RESTA) {
                //TRADUCCION 3D#################################################################################################
                traduccion.setTranslate("\n//RESTA ARITMETICA\t--------------");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + valorIzq.SP + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + valorDer.SP + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = t" + (traduccion.t - 2) + " - t" + (traduccion.t - 1) + ";");
                traduccion.stackCounter++;
                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
                //###############################################################################################################
                return { value: (valorIzq.value - valorDer.value), type: tipoPrimitivo.NUMBER, SP: traduccion.stackCounter };
            } else if (this.tipoOperacion === operacionAritmetica.MULT) {
                //TRADUCCION 3D#################################################################################################
                traduccion.setTranslate("\n//MULTIPLICACION ARITMETICA\t--------------");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + valorIzq.SP + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + valorDer.SP + "];");
                traduccion.t++;
                traduccion.setTranslate("t" + traduccion.t + " = t" + (traduccion.t - 2) + " * t" + (traduccion.t - 1) + ";");
                traduccion.stackCounter++;
                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
                //###############################################################################################################
                return { value: (valorIzq.value * valorDer.value), type: tipoPrimitivo.NUMBER, SP: traduccion.stackCounter };;
            } else if (this.tipoOperacion === operacionAritmetica.DIV) {

                if (Number(valorDer.value) >= 0) {
                    //TRADUCCION 3D#################################################################################################
                    traduccion.setTranslate("\n//DIVISION ARITMETICA\t--------------");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + valorIzq.SP + "];");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + valorDer.SP + "];");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = t" + (traduccion.t - 2) + " / t" + (traduccion.t - 1) + ";");
                    traduccion.stackCounter++;
                    traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
                    //###############################################################################################################
                    return { value: (valorIzq.value / valorDer.value), type: tipoPrimitivo.NUMBER, SP: traduccion.stackCounter };
                } else {
                    throw new Error("Error Semantico: El valor " + valorDer + ", debe ser mayor o igual que cero,  Linea: " + this.line + "Column: " + this.column);
                }

            } else if (this.tipoOperacion === operacionAritmetica.MOD) {
                return { value: (valorIzq.value % valorDer.value), type: tipoPrimitivo.NUMBER, SP: traduccion.stackCounter };
            } else {
                throw new Error("Error Semantico: no se reconoce el operador  " + this.sym + ", Linea: " + this.line + "Column: " + this.column);
            }

        } else {
            throw new Error("Error Semantico: incompatibilidad de tipos: tipo varlor 1: " + valorDer.type + ", tipo valor2 " + valorDer.type + ", Linea: " + this.line + "Column: " + this.column);
        }

    }

    public GraficarAST(texto: string): string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"" + this.sym.toString() + "\"];\n";
        texto = this.hijoIzq.GraficarAST(texto);
        texto = this.hijoDer.GraficarAST(texto);
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "->nodo" + this.hijoIzq.line + "_" + this.hijoIzq.column.toString() + ";\n";
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "->nodo" + this.hijoDer.line + "_" + this.hijoDer.column.toString() + ";\n";
        return texto;
    }

}