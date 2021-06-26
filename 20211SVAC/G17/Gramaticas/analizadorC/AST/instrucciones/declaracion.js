const modelos = require("../modelos");

export class DeclaracionVariable extends modelos.Instruccion {
    constructor(tipo, ids){
        super()
        this.tipo = tipo
        this.ids = ids
    }
}

export class DeclaracionArray extends modelos.Instruccion{
    constructor(tipo, id, tamano){
        super()
        this.tipo = tipo
        this.id = id
        this.tamano = tamano
    }
}

export class DeclaracionFuncion extends modelos.Instruccion {
    constructor(tipo, id, params, instrucciones){
        super()
        this.tipo = tipo
        this.id = id
        this.params = params
        this.instrucciones =instrucciones
    }
}