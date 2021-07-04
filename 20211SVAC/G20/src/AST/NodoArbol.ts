export class NodoArbol {
    public id: number
    public valor: string
    public tipo: string
    public hijos: NodoArbol[]

    constructor(id : number, valor : string, tipo : string) {
        this.id = id
        this.valor = valor
        this.tipo = tipo
        this.hijos = []
    }

    public getid() : number { return this.id }
    public setid(id : number) { this.id = id }
    public getvalor() : string { return this.valor }
    public setvalor(valor : string) { this.valor = valor }
    public gettipo() : string { return this.tipo }
    public settipo(tipo : string) { this.tipo = tipo }
    public gethijos() : NodoArbol[] { return this.hijos }
    public sethijos(hijos : NodoArbol[]) { this.hijos = hijos }
}