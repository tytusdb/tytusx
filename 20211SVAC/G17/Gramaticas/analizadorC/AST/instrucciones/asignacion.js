import { Literal } from "../../../analizadorXPath/Expresion/Expresiones";
import { Id } from "../expresiones/expresion";
import { Instruccion } from "../modelos";

export class Asignacion extends Instruccion{
    constructor(id, expresion){
        super()
        this.id = id
        this.expresion = expresion
    }

    optimizar(){
        // optimizar expresion
        var exp = this.expresion.optimizar()
        this.expresion = exp

        // optimizar 
        // regla 8
        // regla 9
        // regla 10
        // regla 11
        if (
            this.expresion instanceof Id &&
            this.id == this.expresion.id
        ){
            this.esFuncional = false
        }

        return this
    }

    tresd(){
        var tExp =this.expresion.tresd()
        return this.esFuncional ? `${this.id}=${tExp};\n`: '\n'
    }
}

export class AsignacionArray extends Instruccion{
    constructor(array, expresion){
        super()
        this.array = array
        this.expresion = expresion
    }

    optimizar(){
        var exp  = this.optimizar()
        this.exppresion = exp

        return this
    }

    tresd(){
        var tarray =this.array.tresd()
        var texpresion = this.expresion.tresd()
        return `${tarray}=${texpresion};\n`
    }
}