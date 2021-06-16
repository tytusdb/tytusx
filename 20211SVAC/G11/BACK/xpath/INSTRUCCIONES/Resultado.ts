  
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Expresion } from "../INTERFACES/Expresion";
import { Instruccion } from "../INTERFACES/Instruccion";

export class Resultado implements Instruccion{
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
        //const valor = this.expresion.getTipo(ent, arbol);
        //console.log(this.expresion);
        if(valor!==null){
            console.log('>',valor);
        }else{
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }

    
}