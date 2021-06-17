export class NodoBusqueda {
    tipo:string
    selector:string
    nodoId:string
    predicado:any
    next:NodoBusqueda
    linea:number
    columna:number
    constructor(tipo:string, selector:string, nodoId:string, predicado:any, next:NodoBusqueda,
        linea:number, columna:number) {
        this.tipo = tipo
        this.selector = selector
        this.nodoId = nodoId
        this.predicado = predicado
        this.next = next
        this.linea = linea
        this.columna = columna
    }
}