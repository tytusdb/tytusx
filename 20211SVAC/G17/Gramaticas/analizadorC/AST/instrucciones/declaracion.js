const modelos = require("../modelos");

export class DeclaracionVariable extends modelos.Instruccion {
    constructor(tipo, ids){
        super()
        this.tipo = tipo
        this.ids = ids
    }

    optimizar(){
        return this   
    }

    tresd(){
        var retorno = `${this.tipo} `
        
        for (let index = 0; index < this.ids.length; index++) {
            if (index == 0){
                retorno += this.ids[index]
            }else{
                retorno += `,${this.ids[index]}`
            }
        }

        return retorno + ';\n'
    }
}

export class DeclaracionArray extends modelos.Instruccion{
    constructor(tipo, id, tamano){
        super()
        this.tipo = tipo
        this.id = id
        this.tamano = tamano
    }

    optimizar(){
        return this   
    }

    tresd(){
        return `${this.tipo} ${this.id}[${this.tamano}];\n`
    }
}

export class DeclaracionFuncion extends modelos.Instruccion {
    constructor(tipo, id, params, bloque){
        super()
        this.tipo = tipo
        this.id = id
        this.params = params
        this.bloque =bloque
    }

    optimizar(){
        this.bloque = this.bloque.optimizar()
        return this   
    }

    tresd(){
        var retorno = `${this.tipo} ${this.id}(){\n`
        var tbloque = this.bloque.tresd()
        retorno += tbloque
        retorno += `}\n`
        return retorno
    }
}