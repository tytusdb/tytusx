import { Instruccion } from "../modelos";

export class Asignacion extends Instruccion{
    constructor(id, expresion){
        super()
        this.id = id
        this.expresion = expresion
    }
}

export class AsignacionArray extends Instruccion{
    constructor(array, expresion){
        super()
        this.array = array
        this.expresion = expresion
    }
}