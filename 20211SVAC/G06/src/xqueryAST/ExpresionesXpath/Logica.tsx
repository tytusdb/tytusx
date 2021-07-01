import { Entorno } from '../../xmlAST/Entorno';
import { Expression, Retorno } from "../../Interfaces/Expresion";
import { tipoPrimitivo } from './Primitivo';
import { Simbolo } from '../../xmlAST/Simbolo';

export enum operacionLogica {
    AND,
    OR
}

export class Logica implements Expression{
    

    constructor (
    public line : Number,
    public column: Number,
    public hijoIzq: Expression,
    public hijoDer: Expression,
    public tipoOperacion: operacionLogica,
    public sym: string){}

    public execute(ent : Entorno, simboloPadre?:Simbolo): Retorno {

        let valorIzq = this.hijoIzq.execute(ent, simboloPadre);
        
        if (valorIzq.type === tipoPrimitivo.BOOL){

            if (valorIzq.value === false && this.tipoOperacion === operacionLogica.AND) {
                //console.log("pase por el corto circuito del and")
                return  { value: valorIzq.value, type: tipoPrimitivo.BOOL, SP: -1 };
            } else if (valorIzq.value === true && this.tipoOperacion === operacionLogica.OR) {
                //console.log("pase por el corto circuito del or")
                return  { value: valorIzq.value, type: tipoPrimitivo.BOOL, SP: -1 };
            }
            
            let valorDer = this.hijoDer.execute(ent, simboloPadre);

            if (valorDer.type === tipoPrimitivo.BOOL){

                if (this.tipoOperacion === operacionLogica.AND) {
                    const result = valorIzq.value && valorDer.value;
                    return { value: result, type: tipoPrimitivo.BOOL, SP: -1 };
                }else if (this.tipoOperacion === operacionLogica.OR) {
                    const result = valorIzq.value || valorDer.value;
                    return { value: result, type: tipoPrimitivo.BOOL, SP: -1 };
                }else {
                    throw new Error("Error Semantico: no se reconoce el operador  " + this.sym + ", Linea: "+this.line+"Column: "+this.column);;
                }
            }
            else {
                throw new Error("Error Semantico: incompatibilidad de tipos: tipo varlor 2: "+valorDer.type + "Linea: "+this.line+"Column: "+this.column);
            }

        }
        else {
            throw new Error("Error Semantico: incompatibilidad de tipos: tipo varlor 1: "+valorIzq.type + "Linea: "+this.line+"Column: "+this.column);
        }


    }

    public GraficarAST(texto:string):string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"" + this.sym.toString() + "\"];\n";
        texto = this.hijoIzq.GraficarAST(texto);
        texto = this.hijoDer.GraficarAST(texto);
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "->nodo" + this.hijoIzq.line + "_" + this.hijoIzq.column.toString() + ";\n";
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "->nodo" + this.hijoDer.line + "_" + this.hijoDer.column.toString() + ";\n";
        return texto;
    }

}