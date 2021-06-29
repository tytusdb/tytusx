import { NodoAbs } from "./NodoAbs";

export class Axes implements NodoAbs {
    constructor(eje:string, func:Array<any>) {
    }

    execute() {
        console.log("es un indice normal")
    }

    
}