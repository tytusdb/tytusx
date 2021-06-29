import { NodoAbs } from "./NodoAbs";

export class Funciones implements NodoAbs {
    constructor(fn:string) {
        
    }

    execute() {
        console.log("es un indice normal")
    }
}