import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaz/expresion";
import {Instruccion} from "../Interfaz/instruccion";
import { Predicate } from "./Predicate";

export class Nodo implements Expresion{

    linea:number;
    columna:number;
    nombre: string;
    tipo: TipoNodo
    predicado: Predicate | undefined;
    fromRoot: boolean; // Var para saber si es '/' (buscar desde la raiz) o es '//' (buscar sin importar donde este)
    constructor(nombre:string,  tipo: TipoNodo, linea:number, columna:number, predicado?:Predicate){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.nombre = nombre;
        this.predicado = predicado;
        this.fromRoot = true;
    }

    public isFromRoot(): boolean {
        return this.fromRoot;
    }
    public setFromRoot(fromRoot:boolean){
        this.fromRoot = fromRoot;
    }

    public getValor(Ent: Entorno){
        return this.nombre;
    }

    public getNombre(){
        return this.nombre;
    }
    public getPredicado(){
        return this.predicado;
    }

    public getTipo(){
        return this.tipo;
    }   

}

export enum TipoNodo {
    IDENTIFIER,
    ATRIBUTO,
    DOT,
    DOTDOT,
    ASTERISCO,
    AXIS,
    FUNCION,
}