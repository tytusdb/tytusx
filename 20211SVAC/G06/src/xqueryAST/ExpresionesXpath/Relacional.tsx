import { Entorno } from '../../xmlAST/Entorno';
import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { tipoPrimitivo } from './Primitivo';
import { Simbolo } from '../../xmlAST/Simbolo';
import { EntornoXQuery } from '../AmbientesXquery/EntornoXQuery';


export enum operacionRelacional {
    IGUAL,
    DIFERENCIACION,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL
}
////fechaPublicacion[@año>/biblioteca[1]/libro[3]/fechaPublicacion[1]/@año]     

export class Relacional implements ExpressionXquery{

    constructor (
    public line : Number,
    public column: Number,
    public hijoIzq: ExpressionXquery,
    public hijoDer: ExpressionXquery,
    public tipoOperacion: operacionRelacional,
    public sym: string){}

    public executeXquery(entXquery: EntornoXQuery, ent: Entorno, simboloPadre?:Simbolo): Retorno {

        let valorIzq = this.hijoIzq.executeXquery(entXquery, ent, simboloPadre);
        let valorDer = this.hijoDer.executeXquery(entXquery, ent, simboloPadre);

        if (valorIzq.type === tipoPrimitivo.RESP && valorDer.type === tipoPrimitivo.RESP) {

            for (const valIzq of valorIzq.value ) {
                for (const valDer of valorDer.value) {
                    
                    if (valIzq.type === tipoPrimitivo.NODO && valDer.type === tipoPrimitivo.NODO){

                        if (this.validar(valIzq.value.identificador, valDer.value.identificador)){
                            return {value: true, type: tipoPrimitivo.BOOL}
                        }
                    }else if (valIzq.type === tipoPrimitivo.NODO){
                        
                        if (valIzq.value.listaEntornos.length === 0 && valIzq.value.texto !== ''){
                            
                            if (this.validar(valIzq.value.texto, valDer.value)){
                                return {value: true, type: tipoPrimitivo.BOOL}    
                            }
                        }
                    }
                    else if ( valDer.type === tipoPrimitivo.NODO){

                        if (valDer.value.listaEntornos.length === 0 && valDer.value.texto !== ''){
                            
                            if (this.validar(valDer.value.texto, valIzq.value)){
                                return {value: true, type: tipoPrimitivo.BOOL}    
                            }
                        }

                    } else {

                        if (this.validar(valIzq.value, valDer.value)){
                            return {value: true, type: tipoPrimitivo.BOOL}
                        }
                    }
                }
            }
            return {value: false , type : tipoPrimitivo.BOOL}; 
            
        }else if (valorIzq.type === tipoPrimitivo.RESP){

            for (const valIzq of valorIzq.value) {
                if (valIzq.type === tipoPrimitivo.NODO){
                        
                    if (valIzq.value.listaEntornos.length === 0 && valIzq.value.texto !== ''){
                        
                        if (this.validar(valIzq.value.texto, valorDer.value)){
                            return {value: true, type: tipoPrimitivo.BOOL}    
                        }
                    }
                }else {
                   
                    if (this.validar(valIzq.value, valorDer.value)){
                        return {value: true, type: tipoPrimitivo.BOOL}
                    }
                }
            }
            return {value: false , type : tipoPrimitivo.BOOL};

        }else if (valorDer.type === tipoPrimitivo.RESP){

            for (const valDer of valorDer.value) {
                if ( valDer.type === tipoPrimitivo.NODO){

                    if (valDer.value.listaEntornos.length === 0 && valDer.value.texto !== ''){
                        
                        if (this.validar(valDer.value.texto, valorIzq.value)){
                            return {value: true, type: tipoPrimitivo.BOOL}    
                        }
                    }
                }else {
                    
                    if (this.validar(valorIzq.value, valDer.value)){
                        return {value: true, type: tipoPrimitivo.BOOL}
                    }
                }
            }
            return {value: false , type : tipoPrimitivo.BOOL};
            
        } else {
            return { value: this.validar(valorIzq.value, valorDer.value), type: tipoPrimitivo.BOOL}
        }

    }

    private validar(valorIzq : String, valorDer: String): boolean{
        
        if (this.tipoOperacion === operacionRelacional.IGUAL) {
            const result = valorIzq == valorDer;
            return result
        } else if (this.tipoOperacion === operacionRelacional.DIFERENCIACION) {
            const result = valorIzq != valorDer;
            return result
        }else if (this.tipoOperacion === operacionRelacional.MENOR) { 
            const result = valorIzq < valorDer;
            return result;
        } else if (this.tipoOperacion === operacionRelacional.MENORIGUAL) {
            const result = valorIzq <= valorDer;
            return result;
        } else if (this.tipoOperacion === operacionRelacional.MAYOR) {
            const result = valorIzq > valorDer;
            return result
        } else if (this.tipoOperacion === operacionRelacional.MAYORIGUAL) {
            const result = valorIzq >= valorDer;
            return result;
        }
        else {
            throw new Error("Error Semantico: no se reconoce el operador  " + this.sym + ", Linea: "+this.line+"Column: "+this.column);
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