import { Expresion } from '../Operaciones/InterfazExpresion';

export default class Aritmetica implements Expresion {

    public exp1: Expresion;
    public operador: string;
    public exp2: Expresion;
    public linea: any;
    public columna: any;

    public constructor(exp1, operador, exp2, linea, columna) {
        this.exp1 = exp1;
        this.operador = operador;
        this.exp2 = exp2;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo() : any{
        let valor = this.getValor();

        if(typeof valor === 'number'){   
            return "numero";
        }else if(typeof valor === 'string'){
            return "string";
        }
    }

    getValor():any { 
        let valor_exp1 = this.exp1.getValor();
        let valor_exp2 = this.exp2.getValor();


        switch (this.operador) {
            case "+":
                if(typeof valor_exp1 === 'number'){
                    if(typeof valor_exp2 === 'number'){
                        return valor_exp1 + valor_exp2;
                    }
                }
                break;
            case "-":
                if(typeof valor_exp1 == 'number'){
                    if (typeof valor_exp2 == "number"){
                        return valor_exp1 - valor_exp2;
                    }
                }
                break;
            case "*":
                if(typeof valor_exp1 === 'number'){
                    if(typeof valor_exp2 === 'number'){
                        return valor_exp1 * valor_exp2;
                    }
                }
                break;
            case "/":
                    if(typeof valor_exp1 === 'number'){
                        if(typeof valor_exp2 === 'number'){
                            if (valor_exp2 != 0){
                                return valor_exp1 / valor_exp2;
                            }
                        }
                    }
                    break;  
            case "%":
                if(typeof valor_exp1 === 'number'){
                    if(typeof valor_exp2 === 'number'){
                        if (valor_exp2 != 0){
                            return valor_exp1 % valor_exp2;
                        }
                    }
                }
                break;  
            default:
                return "";
                break;
        }
    }
}