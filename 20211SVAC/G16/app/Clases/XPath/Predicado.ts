import { Expresion } from "./Expresion";
import { NodoAbs } from "./NodoAbs";

export class Predicado implements NodoAbs {
    expresion:any
    constructor(exp:any) {
       this.expresion=exp
    }

    execute(padre) {
        let x = this.expresion.execute(padre)
        return x
    }

}