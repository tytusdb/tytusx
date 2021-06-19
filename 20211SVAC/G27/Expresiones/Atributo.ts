class Atributo{
    identificador:string;
    valor:string;
    linea:number;
    columna:number;
    tipo: string;

    constructor(id:string, valor:string, linea:number, columna:number){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.tipo = 'Atributo';
    }
}