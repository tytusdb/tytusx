export class simbolTabla{
    public nombre: string
    public tipo: string
    public ambito: string
    public fila: number
    public columna: number
    public stack: number
    public valor: string
    constructor(nombre,tipo,ambito,fila,columna,stack,valor){
        this.nombre = nombre
        this.tipo = tipo
        this.ambito = ambito
        this.fila = fila
        this.columna = columna
        this.stack = stack
        this.valor = valor
    }
}