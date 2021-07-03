export class Error {
    public no : number
    public fila : number
    public columna : number
    public tipo : string
    public descripcion : string
    public gramatica : string

    constructor (no : number, fila : number, columna : number, tipo : string, descripcion : string, gramatica : string) {
        this.no = no
        this.fila = fila
        this.columna = columna
        this.tipo = tipo
        this.descripcion = descripcion
        this.gramatica = gramatica
    }

    public getNo() : number { return this.no }
    public setNo(no : number) { this.no = no }
    public getFila() : number { return this.fila }
    public setFila(fila : number) { this.fila = fila }
    public getColumna() : number { return this.columna }
    public setColumna(columna : number) { this.columna = columna }
    public getTipo() : string { return this.tipo }
    public setTipo(tipo : string) { this.tipo = tipo }
    public getDescripcion() : string { return this.descripcion }
    public setDescripcion(descripcion : string) { this.descripcion = descripcion }
    public getGramatica() : string { return this.gramatica }
    public setGramatica(gramatica : string) { this.gramatica = gramatica }
}