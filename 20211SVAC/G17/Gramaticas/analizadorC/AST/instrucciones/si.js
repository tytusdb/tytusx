import { Instruccion } from "../modelos";

export class Si extends Instruccion{
    constructor(condicion, ira){
        super()
        this.condicion = condicion
        this.ira = ira
        this.iraFalso = false
    }

    optimizar(){

        var cond = this.condicion.optimizar()

        // condición es siempre true
        // condición es siempre false
        // regla 4
        // regla 5
        this.esSaltoConstante = cond.esSiempreTrue | cond.esSiempreFalse
        
        return this   
    }

    optimizar2(){

        var cond = this.condicion.optimizar()

        // condición es siempre true
        // condición es siempre false
        // regla 4
        // regla 5
        this.esSaltoConstante = cond.esSiempreTrue | cond.esSiempreFalse
        
        var retorno = this
        if (cond.esSiempreTrue && this.ira){
            retorno = new Ira(this.ira.etiqueta)
        }else if (cond.esSiempreFalse && this.iraFalso){
            retorno = new Ira(this.iraFalso.etiqueta)
        }

        return retorno
    }

    intercambiarEtiquetas(){
        var cond = this.condicion.obtenerNegativa()
        //var iraAux = this.ira
        this.condicion = cond
        this.ira = this.iraFalso
        this.iraFalso = false
        return this
    }

    tresd(){
        var tcond = this.condicion.tresd()
        var tira = this.ira.tresd()
        var retorno = `if (${tcond}) ${tira}`
        if (this.iraFalso){
            retorno += this.iraFalso.tresd()
        }
        return retorno
    }
}

export class Ira extends Instruccion{
    constructor(etiqueta){
        super()
        this.etiqueta = etiqueta
    }

    optimizar(){
        return this   
    }

    tresd(){
        return `goto ${this.etiqueta}; \n`
    }
}

export class Etiqueta extends Instruccion{
    constructor(etiqueta){
        super()
        this.etiqueta = etiqueta
    }

    optimizar(){
        return this   
    }

    tresd(){

        return `${this.etiqueta}: \n`
    }
}