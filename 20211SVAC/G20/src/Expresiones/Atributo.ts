export class Atributo {
    identificador: string;
    valor: string;
    linea: number;
    columna: number;

    constructor(id: string, valor: string, linea: number, columna: number) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }

    public getID() : string { return this.identificador }
    public setID(identificador : string) : void { this.identificador = identificador }
    public getValor() : string { return this.valor }
    public setValor(valor : string) : void { this.valor = valor }
    public getLinea() : number { return this.linea }
    public setLinea(linea : number) : void { this.linea = linea }
    public getColumna() : number { return this.columna }
    public setColumna(columna : number) : void { this.columna = columna }
}