import { Entorno } from '../../xmlAST/Entorno';
import { Expression, Retorno } from "../../Interfaces/Expresion";
import { tipoPrimitivo } from './Primitivo';
import { Simbolo } from '../../xmlAST/Simbolo';
import { traduccion } from '../../Traduccion/traduccion';

export enum operacionLogica {
    AND,
    OR
}

export class Logica implements Expression {

    constructor(
        public line: Number,
        public column: Number,
        public hijoIzq: Expression,
        public hijoDer: Expression,
        public tipoOperacion: operacionLogica,
        public sym: string) { }

    public execute(ent: Entorno, simboloPadre?: Simbolo): Retorno {

        let valorIzq = this.hijoIzq.execute(ent, simboloPadre);

        if (valorIzq.type === tipoPrimitivo.BOOL) {

            if (valorIzq.value === false && this.tipoOperacion === operacionLogica.AND) {
                //TRADUCCION 3D#################################################################################################
                traduccion.setTranslate("\n//INGRESANDO VALOR LOGICO\t--------------");
                traduccion.stackCounter++;
                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 0;");
                //###############################################################################################################
                //console.log("pase por el corto circuito del and")
                return { value: valorIzq.value, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter };
            } else if (valorIzq.value === true && this.tipoOperacion === operacionLogica.OR) {
                //TRADUCCION 3D#################################################################################################
                traduccion.setTranslate("\n//INGRESANDO VALOR LOGICO\t--------------");
                traduccion.stackCounter++;
                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 1;");
                //###############################################################################################################
                //console.log("pase por el corto circuito del or")
                return { value: valorIzq.value, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter };
            }

            let valorDer = this.hijoDer.execute(ent, simboloPadre);

            if (valorDer.type === tipoPrimitivo.BOOL) {

                if (this.tipoOperacion === operacionLogica.AND) {
                    const result = valorIzq.value && valorDer.value;
                    //TRADUCCION 3D#################################################################################################
                    traduccion.setTranslate("\n//OPREACION LOGICA AND\t--------------");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + (valorIzq.value ? "1" : "0") + "];");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + (valorDer.value ? "1" : "0") + "];");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = t" + (traduccion.t - 2) + " && t" + (traduccion.t - 1) + ";");
                    traduccion.stackCounter++;
                    traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
                    //###############################################################################################################
                    return { value: result, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter };
                } else if (this.tipoOperacion === operacionLogica.OR) {
                    const result = valorIzq.value || valorDer.value;
                    //TRADUCCION 3D#################################################################################################
                    traduccion.setTranslate("\n//OPREACION LOGICA AND\t--------------");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + (valorIzq.value ? "1" : "0") + "];");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + (valorDer.value ? "1" : "0") + "];");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = t" + (traduccion.t - 2) + " && t" + (traduccion.t - 1) + ";");
                    traduccion.stackCounter++;
                    traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
                    //###############################################################################################################
                    return { value: result, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter };
                } else {
                    throw new Error("Error Semantico: no se reconoce el operador  " + this.sym + ", Linea: " + this.line + "Column: " + this.column);;
                }
            }
            else {
                throw new Error("Error Semantico: incompatibilidad de tipos: tipo varlor 2: " + valorDer.type + "Linea: " + this.line + "Column: " + this.column);
            }

        }
        else {
            throw new Error("Error Semantico: incompatibilidad de tipos: tipo varlor 1: " + valorIzq.type + "Linea: " + this.line + "Column: " + this.column);
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