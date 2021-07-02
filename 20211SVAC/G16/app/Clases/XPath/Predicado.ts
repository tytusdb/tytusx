import { Expresion } from "./Expresion";
import { NodoAbs } from "./NodoAbs";

export class Predicado implements NodoAbs {
    constructor(TablaSimbolo:any, exp:Array<Expresion>) {
        
    }

    execute() {
        console.log("es un indice normal")
    }

}