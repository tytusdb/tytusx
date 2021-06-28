import { Tipo } from "./Tipo";

export class Simbolo {
    public indentificador: string;
    public valor: any;
    public tipo: Tipo;
    linea: number;
    columna: number;

    constructor(tipo: Tipo, id : string, linea: number, columna: number, valor : any) {
        this.indentificador = id
        this.tipo = tipo
        this.linea = linea
        this.columna = columna
        this.valor = valor
    }

    public getIndentificador() : string { return this.indentificador }
    public setIndentificador(indentificador: string) { this.indentificador = indentificador }
    public getValor() { return this.valor }
    public setValor(valor: any) { this.valor = valor }
    public getTipo() : Tipo { return this.tipo }
    public setTipo(tipo: Tipo) { this.tipo = tipo }
    public getLinea() { return this.linea }
    public setLinea(linea: number) { this.linea = linea }
    public getColumna() { return this.columna }
    public setColumna(columna: number) { this.columna = columna }
}
