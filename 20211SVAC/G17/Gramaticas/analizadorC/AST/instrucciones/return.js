import { Literal } from "../../../analizadorXPath/Expresion/Expresiones";
import { Id } from "../expresiones/expresion";
import { Instruccion } from "../modelos";

export class Return extends Instruccion{
    constructor(id, expresion){
        super()
        this.id = id
        this.expresion = expresion
    }

    optimizar(){
        // optimizar expresion
        var exp = this.expresion.optimizar()
        this.expresion = exp

        this.esFuncional = true

        return this
    }

    tresd(){
        var tExp =this.expresion.tresd()
        return this.esFuncional ? `${this.id}=${tExp};\n`: '\n'
    }
}