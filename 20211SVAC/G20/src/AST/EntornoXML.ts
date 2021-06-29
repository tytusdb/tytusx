import { Simbolo } from "./Simbolo"

export class EntornoXML {
    public tabla: Simbolo[]
    public anterior: EntornoXML
    public id: number

    constructor(anterior: EntornoXML, id: number) {
        this.tabla = []
        this.anterior = anterior
        this.id = id
    }

    public geTabla() : Simbolo[] { return this.tabla }
    public agregar(simbolo: Simbolo) : void { this.tabla.push(simbolo) }
    public getAnterior() : EntornoXML { return this.anterior }
    public setAnterior(anterior: EntornoXML) : void { this.anterior = anterior }
    public getId() : number { return this.id }
    public setId(id : number) : void { this.id = this.id == 0 ? id : this.id }
}