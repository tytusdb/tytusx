import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";

export enum Operador {
    SUMA,
    RESTA,
    MULTI,
    DIV,
    POT,
    MODULO,
    MENORQUE,
    MAYORQUE,
    AND,
    NOT,
    UNARIO,
    IGUALIGUAL,
    MAYORIGUAL,
    DIFERENTE,
    MENORIGUAL,
    OR
}

export default class Operaciones implements Expreciones {

    public exp1 : Expreciones;
    public exp2 : Expreciones;
    public expU : boolean;
    public operador : Operador;
    public linea: number;
    public columna: number;
    public op:string;



    constructor (exp1 : Expreciones,operador : string ,exp2 : Expreciones,linea: number,columna: number,expU : boolean){
        this.exp1=exp1;
        this.exp2=exp2;
        this.columna=columna;
        this.linea=linea;
        this.expU=expU;
        this.op=operador;
        this.operador=this.getOperador(operador);
    }

    getOperador(op : string): Operador{
        if(op == '+'){
            return Operador.SUMA;
        }else if(op == '-'){
            return Operador.RESTA;
        }else if(op == '<'){
            return Operador.MENORQUE;
        }else if(op == '*'){
            return Operador.MULTI;
        }else if(op == '/'){
            return Operador.DIV;
        }else if(op == '>'){
            return Operador.MAYORQUE;
        }else if(op == '&&'){
            return Operador.AND;
        }else if(op == '!'){
            return Operador.NOT;
        }else if(op == 'UNARIO'){
            return Operador.UNARIO;
        }else if(op == '=='){
            return Operador.IGUALIGUAL;
        }else if(op == '>='){
            return Operador.MAYORIGUAL;
        }else if(op == '^'){
            return Operador.POT;
        }else if(op== '%'){
            return Operador.MODULO;
        }else if (op=='!='){
            return Operador.DIFERENTE;
        }else if( op == '<='){
            return Operador.MENORIGUAL;
        }else if ( op == '||'){
            return Operador.OR;
        }
    }


    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
}