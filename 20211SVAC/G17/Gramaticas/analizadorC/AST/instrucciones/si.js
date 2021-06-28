import { Instruccion } from "../modelos";

export class Si extends Instruccion{
    constructor(condicion, ira){
        super()
        this.condicion = condicion
        this.ira = ira
    }
}

export class Ira extends Instruccion{
    constructor(etiqueta){
        super()
        this.etiqueta = etiqueta
    }
}

export class Etiqueta extends Instruccion{
    constructor(etiqueta){
        super()
        this.etiqueta = etiqueta
    }
}