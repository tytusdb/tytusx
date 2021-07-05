import { Nodo } from "../Arbol/Nodo";
import { Error } from "../Varios/Error";
import { Simbolo } from "./Simbolo";

export class Tree {
    instrucciones: Array<Nodo>
    errores: Array<Error>
    consola: Array<String>
    Variables: Array<Simbolo>;
    produccion: Array<String>;
    accion: Array<String>;
    salida3d: Array<String>;

    constructor(instrucciones: Array<Nodo>) {
        this.instrucciones = instrucciones;
        this.errores = new Array<Error>();
        this.consola = new Array<String>();
        this.Variables = new Array<Simbolo>();
        this.produccion = new Array<String>();
        this.accion = new Array<String>();
        this.salida3d = new Array<String>();
    }
}