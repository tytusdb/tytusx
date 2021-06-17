import { TipoSeleccion } from "./TipoSeleccion"

export class NodoControlError {


    simbolo: string
    tipo: TipoSeleccion
    linea: any
    columna: any
    entorno: string



    constructor(simbolo: string, tipo: TipoSeleccion, linea: any, columna: any, entorno: string) {
        this.simbolo = simbolo
        this.tipo = tipo
        this.linea = linea
        this.columna = columna
        this.entorno = entorno
    //   this.Agregar(this.simbolo,this.tipo,this.linea,this.columna,this.entorno)

    } 
}