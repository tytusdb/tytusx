import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaz/expresion";
import {Instruccion} from "../Interfaz/instruccion";
import { Predicate } from "./Predicate";

export class Nodo implements Expresion{

    linea:number;
    columna:number;
    nombre: string;
    tipo: TipoNodo
    tipoAxis: TipoAxis | undefined;
    NodeTest: Nodo | undefined;
    predicado: Predicate | undefined;
    fromRoot: boolean; // Var para saber si es '/' (buscar desde la raiz) o es '//' (buscar sin importar donde este)
    constructor(nombre:string,  tipo: TipoNodo, linea:number, columna:number, predicado?:Predicate | undefined, tipoAxis?: TipoAxis, nodeTest?: Nodo){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.nombre = nombre;
        this.predicado = predicado;
        this.fromRoot = true;
        this.tipoAxis = tipoAxis;
        this.NodeTest = nodeTest;
    }

    public get3Dir(){
        
    }

    public ToString(): string{
        if(this.predicado != undefined){
            return this.nombre+" "+this.predicado
        }
        return this.nombre
    }

    public isFromRoot(): boolean {
        return this.fromRoot;
    }
    public setFromRoot(fromRoot:boolean){
        this.fromRoot = fromRoot;
    }

    public getValorInicial(){
        return this.nombre;
    }


    public getValor(){
        if(this.NodeTest != undefined){
            return this.NodeTest.getNombre();
        }
        return this.nombre;
    }

    public getNombre(){        
        return this.nombre;
    }
    public getPredicado(): Predicate | undefined{
        if(this.NodeTest != undefined){
            return this.NodeTest.getPredicado();
        }
        return this.predicado;
    }

    public getTipo(){
        return this.tipo;
    }   

    public isAxis(): boolean{
        if(this.tipoAxis != undefined){
            return true
        }
        return false;
    }

    public getTipoAxis(): TipoAxis | undefined{
        return this.tipoAxis;
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
    NODOERROR,
}

export enum TipoAxis{
    ANCESTOR,
    ANCESTORORSELF,
    ATTRIBUTE,
    CHILD,
    DESCENDANT,
    DESCENDANTORSELF,
    FOLLOWING,
    FOLLOWINGSIBLING,
    PARENT,
    PRECEDING,
    PRECEDINGSIBLING,
    SELF,
    NAMESPACE, //Este ni se implementa pero lo agrego para que no se buggee todo (ya que en la gramatica si esta namespace)   
}