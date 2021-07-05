import { Entorno } from '../../xmlAST/Entorno';
import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { tipoPrimitivo } from './Primitivo';
import { Simbolo } from '../../xmlAST/Simbolo';
import { EntornoXQuery } from '../AmbientesXquery/EntornoXQuery';
import { traduccion } from '../../Traduccion/traduccion';


export enum operacionRelacional {
    IGUAL,
    DIFERENCIACION,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL
}
////fechaPublicacion[@año>/biblioteca[1]/libro[3]/fechaPublicacion[1]/@año]     

export class Relacional implements ExpressionXquery {

    constructor(
        public line: Number,
        public column: Number,
        public hijoIzq: ExpressionXquery,
        public hijoDer: ExpressionXquery,
        public tipoOperacion: operacionRelacional,
        public sym: string) { }

    public executeXquery(entXquery: EntornoXQuery, ent: Entorno, simboloPadre?: Simbolo): Retorno {

        let valorIzq = this.hijoIzq.executeXquery(entXquery, ent, simboloPadre);
        let valorDer = this.hijoDer.executeXquery(entXquery, ent, simboloPadre);

        if (valorIzq.type === tipoPrimitivo.RESP && valorDer.type === tipoPrimitivo.RESP) {

            for (const valIzq of valorIzq.value) {
                for (const valDer of valorDer.value) {

                    if (valIzq.type === tipoPrimitivo.NODO && valDer.type === tipoPrimitivo.NODO) {

                        if (this.validar(valIzq.value.identificador, valDer.value.identificador)) {
                            //TRADUCCION 3D#################################################################################################
                            traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
                            traduccion.stackCounter++;
                            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 1;");
                            //###############################################################################################################
                            return { value: true, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter }
                        }
                    } else if (valIzq.type === tipoPrimitivo.NODO) {

                        if (valIzq.value.listaEntornos.length === 0 && valIzq.value.texto !== '') {

                            if (this.validar(valIzq.value.texto, valDer.value)) {
                                //TRADUCCION 3D#################################################################################################
                                traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
                                traduccion.stackCounter++;
                                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 1;");
                                //###############################################################################################################
                                return { value: true, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter }
                            }
                        }
                    }
                    else if (valDer.type === tipoPrimitivo.NODO) {

                        if (valDer.value.listaEntornos.length === 0 && valDer.value.texto !== '') {

                            if (this.validar(valDer.value.texto, valIzq.value)) {
                                //TRADUCCION 3D#################################################################################################
                                traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
                                traduccion.stackCounter++;
                                traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 1;");
                                //###############################################################################################################
                                return { value: true, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter }
                            }
                        }

                    } else {

                        if (this.validar(valIzq.value, valDer.value)) {
                            //TRADUCCION 3D#################################################################################################
                            traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
                            traduccion.stackCounter++;
                            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 1;");
                            //###############################################################################################################
                            return { value: true, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter }
                        }
                    }
                }
            }
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 1;");
            //###############################################################################################################
            return { value: false, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter };

        } else if (valorIzq.type === tipoPrimitivo.RESP) {

            for (const valIzq of valorIzq.value) {
                if (valIzq.type === tipoPrimitivo.NODO) {

                    if (valIzq.value.listaEntornos.length === 0 && valIzq.value.texto !== '') {

                        if (this.validar(valIzq.value.texto, valorDer.value)) {
                            //TRADUCCION 3D#################################################################################################
                            traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
                            traduccion.stackCounter++;
                            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 1;");
                            //###############################################################################################################
                            return { value: true, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter }
                        }
                    }
                } else {

                    if (this.validar(valIzq.value, valorDer.value)) {
                        //TRADUCCION 3D#################################################################################################
                        traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
                        traduccion.stackCounter++;
                        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 1;");
                        //###############################################################################################################
                        return { value: true, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter }
                    }
                }
            }
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 0;");
            //###############################################################################################################
            return { value: false, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter };

        } else if (valorDer.type === tipoPrimitivo.RESP) {

            for (const valDer of valorDer.value) {
                if (valDer.type === tipoPrimitivo.NODO) {

                    if (valDer.value.listaEntornos.length === 0 && valDer.value.texto !== '') {

                        if (this.validar(valDer.value.texto, valorIzq.value)) {
                            //TRADUCCION 3D#################################################################################################
                            traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
                            traduccion.stackCounter++;
                            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 1;");
                            //###############################################################################################################
                            return { value: true, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter }
                        }
                    }
                } else {

                    if (this.validar(valorIzq.value, valDer.value)) {
                        //TRADUCCION 3D#################################################################################################
                        traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
                        traduccion.stackCounter++;
                        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 1;");
                        //###############################################################################################################
                        return { value: true, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter }
                    }
                }
            }
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = 0;");
            //###############################################################################################################
            return { value: false, type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter };

        } else {
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//Ingresando primitivo bool\t--------------");
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + (this.validar(valorIzq.value, valorDer.value) ? "1" : "0") + ";");
            //###############################################################################################################
            return { value: this.validar(valorIzq.value, valorDer.value), type: tipoPrimitivo.BOOL, SP: traduccion.stackCounter }
        }

    }

    private validar(valorIzq: any, valorDer: any): boolean {

        console.log("TYPES");
        console.log(typeof (valorIzq));
        console.log(typeof (valorDer));

        if (this.tipoOperacion === operacionRelacional.IGUAL) {
            const result = valorIzq == valorDer;
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//OPERACION RELACIONAL IGUAL\t--------------");
            traduccion.t++;
            if (typeof (valorIzq) === "string" && typeof (valorDer) === "string") {
                valorIzq = valorIzq.replaceAll("\"", "");
                valorDer = valorDer.replaceAll("\"", "");
                traduccion.setTranslate("t" + traduccion.t + " = \"" + valorIzq + "\" == \"" + valorDer + "\";");
            } else {
                traduccion.setTranslate("t" + traduccion.t + " = " + valorIzq + " == " + valorDer + ";");
            }
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
            //###############################################################################################################
            return result
        } else if (this.tipoOperacion === operacionRelacional.DIFERENCIACION) {
            const result = valorIzq != valorDer;
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//OPERACION RELACIONAL DIFERENTE\t--------------");
            traduccion.t++;
            if (typeof (valorIzq) === "string" && typeof (valorDer) === "string") {
                valorIzq = valorIzq.replaceAll("\"", "");
                valorDer = valorDer.replaceAll("\"", "");
                traduccion.setTranslate("t" + traduccion.t + " = \"" + valorIzq + "\" != \"" + valorDer + "\";");
            } else {
                traduccion.setTranslate("t" + traduccion.t + " = " + valorIzq + " != " + valorDer + ";");
            }
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
            //###############################################################################################################
            return result
        } else if (this.tipoOperacion === operacionRelacional.MENOR) {
            const result = valorIzq < valorDer;
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//OPERACION RELACIONAL MENOR\t--------------");
            traduccion.t++;
            if (typeof (valorIzq) === "string" && typeof (valorDer) === "string") {
                valorIzq = valorIzq.replaceAll("\"", "");
                valorDer = valorDer.replaceAll("\"", "");
                traduccion.setTranslate("t" + traduccion.t + " = \"" + valorIzq + "\" < \"" + valorDer + "\";");
            } else {
                traduccion.setTranslate("t" + traduccion.t + " = " + valorIzq + " < " + valorDer + ";");
            }
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
            //###############################################################################################################
            return result;
        } else if (this.tipoOperacion === operacionRelacional.MENORIGUAL) {
            const result = valorIzq <= valorDer;
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//OPERACION RELACIONAL MENOR IGUAL\t--------------");
            traduccion.t++;
            if (typeof (valorIzq) === "string" && typeof (valorDer) === "string") {
                valorIzq = valorIzq.replaceAll("\"", "");
                valorDer = valorDer.replaceAll("\"", "");
                traduccion.setTranslate("t" + traduccion.t + " = \"" + valorIzq + "\" <= \"" + valorDer + "\";");
            } else {
                traduccion.setTranslate("t" + traduccion.t + " = " + valorIzq + " <= " + valorDer + ";");
            }
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
            //###############################################################################################################
            return result;
        } else if (this.tipoOperacion === operacionRelacional.MAYOR) {
            const result = valorIzq > valorDer;
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//OPERACION RELACIONAL MAYOR\t--------------");
            traduccion.t++;
            if (typeof (valorIzq) === "string" && typeof (valorDer) === "string") {
                valorIzq = valorIzq.replaceAll("\"", "");
                valorDer = valorDer.replaceAll("\"", "");
                traduccion.setTranslate("t" + traduccion.t + " = \"" + valorIzq + "\" > \"" + valorDer + "\";");
            } else {
                traduccion.setTranslate("t" + traduccion.t + " = " + valorIzq + " > " + valorDer + ";");
            }
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
            //###############################################################################################################
            return result
        } else if (this.tipoOperacion === operacionRelacional.MAYORIGUAL) {
            const result = valorIzq >= valorDer;
            //TRADUCCION 3D#################################################################################################
            traduccion.setTranslate("\n//OPERACION RELACIONAL MAYOR IGUAL\t--------------");
            traduccion.t++;
            if (typeof (valorIzq) === "string" && typeof (valorDer) === "string") {
                valorIzq = valorIzq.replaceAll("\"", "");
                valorDer = valorDer.replaceAll("\"", "");
                traduccion.setTranslate("t" + traduccion.t + " = \"" + valorIzq + "\" >= \"" + valorDer + "\";");
            } else {
                traduccion.setTranslate("t" + traduccion.t + " = " + valorIzq + " >= " + valorDer + ";");
            }
            traduccion.stackCounter++;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = t" + traduccion.t + ";");
            //###############################################################################################################
            return result;
        }
        else {
            throw new Error("Error Semantico: no se reconoce el operador  " + this.sym + ", Linea: " + this.line + "Column: " + this.column);
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