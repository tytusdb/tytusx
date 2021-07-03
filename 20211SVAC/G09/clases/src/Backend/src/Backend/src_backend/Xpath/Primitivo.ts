import { Expresion } from "./Expresion"

export class Primitivo implements Expresion {
    valor:any
    tipo:string

    ejecutar():Primitivo {
        return this
    }

    constructor(valor:any, tipo:string) {
        this.valor = valor
        this.tipo = tipo
    }
}