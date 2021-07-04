class Atributo{
    id:string;
    valor:string;
    linea: number;
    columna: number;

    constructor(id:string, valor:string, linea:number, columna:number){
        this.id = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    getId() {
        return this.id;
    }
    getValor() {
        return this.valor;
    }
    getLinea() {
        return this.linea;
    }
    getColumna() {
        return this.columna;
    }
}