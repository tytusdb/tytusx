import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { EntornoXQuery } from '../AmbientesXquery/EntornoXQuery';
import { Entorno } from '../../xmlAST/Entorno';
import { Simbolo } from '../../xmlAST/Simbolo';
import { tipoPrimitivo } from './Primitivo';


export enum operacionLogica {
    AND,
    OR
}

export class Logica implements ExpressionXquery{

    constructor (
    public line : Number,
    public column: Number,
    public hijoIzq: ExpressionXquery,
    public hijoDer: ExpressionXquery,
    public tipoOperacion: operacionLogica,
    public sym: string){}

    public executeXquery(entXquery: EntornoXQuery, ent: Entorno, simboloPadre?:Simbolo): Retorno {

        if (this.hijoIzq != null && this.hijoDer != null){

            let valorIzq = this.hijoIzq.executeXquery(entXquery, ent, simboloPadre);
        
            if (valorIzq.type === tipoPrimitivo.BOOL){

                if (valorIzq.value === false && this.tipoOperacion === operacionLogica.AND) {
                    //console.log("pase por el corto circuito del and")
                    return  { value: valorIzq.value, type: tipoPrimitivo.BOOL };
                } else if (valorIzq.value === true && this.tipoOperacion === operacionLogica.OR) {
                    //console.log("pase por el corto circuito del or")
                    return  { value: valorIzq.value, type: tipoPrimitivo.BOOL };
                }
                
                let valorDer = this.hijoDer.executeXquery(entXquery, ent, simboloPadre);

                if (valorDer.type === tipoPrimitivo.BOOL){

                    if (this.tipoOperacion === operacionLogica.AND) {
                        const result = valorIzq.value && valorDer.value;
                        return { value: result, type: tipoPrimitivo.BOOL };
                    }else if (this.tipoOperacion === operacionLogica.OR) {
                        const result = valorIzq.value || valorDer.value;
                        return { value: result, type: tipoPrimitivo.BOOL };
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

        }else {
            throw new Error("ERROR FATAL: no se pudo recuperar la consulta, linea: "+this.line+" column: "+ this.column);
        }

    }

    public GraficarAST(texto:string):string {
        if (this.hijoIzq != null && this.hijoDer != null){
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"" + this.sym.toString() + "\"];\n";
            texto = this.hijoIzq.GraficarAST(texto);
            texto = this.hijoDer.GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "->nodo" + this.hijoIzq.line + "_" + this.hijoIzq.column.toString() + ";\n";
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "->nodo" + this.hijoDer.line + "_" + this.hijoDer.column.toString() + ";\n";
            return texto;
        }else {
            throw new Error("ERROR FATAL: no se pudo recuperar la consulta, linea: "+this.line+" column: "+ this.column);
        }
    }

}