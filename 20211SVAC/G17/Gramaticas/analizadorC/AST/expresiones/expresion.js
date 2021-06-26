import { Expresion, Instruccion } from "../modelos";

export class Literal extends Expresion{
    constructor(tipo, valor){
        super()
        this.tipo = tipo
        this.valor = valor
    }
}

export class Id extends Expresion{
    constructor(id){
        super()
        this.id = id
    }
}

export class Casteo extends Expresion{
    constructor(tipo, expresion){
        super()
        this.tipo = tipo
        this.expresion = expresion
    }
}

export class Arreglo extends Expresion{
    constructor(id, posicion){
        super()
        this.id = id
        this.posicion = posicion
    }
}

export class Comparacion extends Expresion{
    constructor(izq, op, der){
        super()
        this.izq = izq
        this.op = op
        this.der = der
    }
}
