import { Instruccion } from "../modelos"

export class Bloque extends Instruccion {
    constructor(instrucciones){
        super()
        this.instrucciones = instrucciones
    }
}