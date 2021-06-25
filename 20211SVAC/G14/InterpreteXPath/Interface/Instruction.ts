import NodoAST from "../AST/NodoAST";

export abstract class Instruccion {

    public columna: Number;
    public salida: String|undefined;

    constructor(columna: Number) {
        this.columna = columna;
    }

    public setSalida(salida: String|undefined) {
        this.salida  = salida;
    }

    public getSalida() {
        return this.salida;
    }

    abstract concatenar(): any;
    abstract ast():NodoAST;
}