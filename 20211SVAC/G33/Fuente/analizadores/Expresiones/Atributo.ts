export class Atributo{

    identificador:string;
    parametro: string;
    linea: number;
    columna: number;

    constructor(identificador:string, parametro: string, linea:number, columna:number) {
        this.identificador = identificador;
        this.parametro = parametro;
        this.linea = linea;
        this.columna = columna;
    }
}