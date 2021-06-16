import { Entorno } from '../../xmlAST/Entorno';
import { Expression, Retorno } from "../../Interfaces/Expresion";
import { tipoPrimitivo } from './Primitivo';
import { Simbolo } from '../../xmlAST/Simbolo';

export enum operacionAritmetica {
    SUMA,  //mas
    RESTA,  //menos
    MULT,   //multiplicacion
    DIV,    //division
    MOD,
}

export class Aritmetico implements Expression{

    constructor (
    public line : Number,
    public column: Number,
    public hijoIzq: Expression,
    public hijoDer: Expression,
    public tipoOperacion: operacionAritmetica,
    public sym: string){}

    public execute(ent: Entorno, simboloPadre?:Simbolo): Retorno {

        let valorIzq = this.hijoIzq.execute(ent, simboloPadre);
        let valorDer = this.hijoDer.execute(ent, simboloPadre);

        if((valorIzq.type === tipoPrimitivo.STRING  || valorIzq.type === tipoPrimitivo.NUMBER )&&(valorDer.type === tipoPrimitivo.STRING || valorDer.type === tipoPrimitivo.NUMBER)&&(this.tipoOperacion === operacionAritmetica.SUMA)) {
            return  { value: (valorIzq.value + valorDer.value), type: tipoPrimitivo.NUMBER };
        }
        else if ((valorIzq.type === tipoPrimitivo.NUMBER) && (valorDer.type === tipoPrimitivo.NUMBER)) {
           
            if(this.tipoOperacion === operacionAritmetica.RESTA){
                return { value: (valorIzq.value - valorDer.value) , type: tipoPrimitivo.NUMBER };
            }else if(this.tipoOperacion === operacionAritmetica.MULT){
                return { value: (valorIzq.value * valorDer.value) , type: tipoPrimitivo.NUMBER };;
            }else if(this.tipoOperacion === operacionAritmetica.DIV){

                if(Number(valorDer.value) >= 0){
                    return { value: (valorIzq.value / valorDer.value) , type: tipoPrimitivo.NUMBER };
                }else {
                    throw new Error("Error Semantico: El valor "+valorDer+", debe ser mayor o igual que cero,  Linea: "+this.line+"Column: "+this.column);
                }

            }else if (this.tipoOperacion === operacionAritmetica.MOD){
                return  { value: (valorIzq.value % valorDer.value) , type: tipoPrimitivo.NUMBER };
            }else {
                throw new Error("Error Semantico: no se reconoce el operador  " + this.sym + ", Linea: "+this.line+"Column: "+this.column);
            }

        }else {
            throw new Error("Error Semantico: incompatibilidad de tipos: tipo varlor 1: "+valorDer.type+", tipo valor2 "+valorDer.type +", Linea: "+this.line+"Column: "+this.column);
        }

    }

    
}