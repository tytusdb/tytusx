import NodoAST from "./NodoAST";

export abstract class Nodo {
    line:number;
    column:number;

    constructor(line:number, column:number) {
        this.line = line;
        this.column = column;
    }

    abstract obtenerNodos():Array<NodoAST>;
}