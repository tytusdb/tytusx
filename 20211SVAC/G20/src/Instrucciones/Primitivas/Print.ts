import { AST } from "../../AST/AST";
import { Entorno } from "../../AST/Entorno";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";

export class Print implements Instruccion{
    linea: number;
    columna: number;
    public expresion:Expresion;

    constructor(exp:Expresion, linea:number, columna:number){
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        const valor = this.expresion.getValorImplicito(ent, arbol);
        if(valor!==null){
            console.log('>',valor);
        }else{
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }

}