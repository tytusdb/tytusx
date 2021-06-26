import { Expresion } from "../Operaciones/InterfazExpresion";

export default class Logica /*extends Operacion*/ implements Expresion{
    
    public exp1: Expresion;
    public operador: string;
    public exp2: Expresion;
    public linea: any;
    public columna: any;

    public constructor(exp1: Expresion, operador: string, exp2: Expresion, linea: number, columna:number) {
        this.exp1 = exp1;
        this.operador = operador;
        this.exp2 = exp2;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(/*controlador: Controlador, ts: TablaSimbolos*/) : any{
        return ""
    }
    
    getValor(/*Controlador: Controlador, TablaSimbolos: TablaSimbolos*/): any {
        return this.exp1.getValor() + " " + this.operador + " " + this.exp2.getValor();
    }
    

    /*
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }*/
    
}