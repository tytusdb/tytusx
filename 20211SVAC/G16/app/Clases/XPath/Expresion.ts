import { NodoAbs } from "./NodoAbs";

export class Expresion implements NodoAbs {
    constructor(opizq:any, opder:any, operador:string) {
        
    }

    execute() {
        console.log("es una expresion")
    }
}