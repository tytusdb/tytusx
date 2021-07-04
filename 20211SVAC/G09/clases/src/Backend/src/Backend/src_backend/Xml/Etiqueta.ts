import { Tabla } from "./Tabla";

export interface Etiqueta {
    padre: Etiqueta
    linea: number
    columna: number
    getName():string
    getAmbito():Array<string>
    getErroresSemanticos():string
    getAsTable():Tabla
    imprimir():string
    getCstDotA(idPadre:number):string
    getCstDotD(idPadre:number):string
}