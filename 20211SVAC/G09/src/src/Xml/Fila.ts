export class Fila {
    nombre:string
    tipo:string
    listaAmbito:Array<string>
    fila:number
    columna:number
    valor:string

    constructor(nombre:string, tipo:string, listaAmbito:Array<string>, fila:number, columna:number, valor:string) {
        this.nombre = nombre
        this.tipo = tipo
        this.listaAmbito = listaAmbito
        this.fila = fila
        this.columna = columna
        this.valor = valor
    }
}