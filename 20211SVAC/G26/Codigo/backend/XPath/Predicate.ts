import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaz/expresion";



export class Predicate implements Expresion{

    linea: number;
    columna: number;
    tipo: any;
    expresion: Expresion;

    constructor(expresion: Expresion, linea:number, columna:number){
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(){
        return this.tipo;
    }

    get3Dir(ent: Entorno){
        return this.expresion.get3Dir(ent);
    }

    getValor(ent: Entorno){
        let resultado = this.expresion.getValor(ent);
        this.tipo = this.expresion.getTipo(ent);
        return resultado;
    }

    getValorInicial(ent: Entorno){

    }


}