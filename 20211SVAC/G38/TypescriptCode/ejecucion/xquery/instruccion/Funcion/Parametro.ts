class Parametro {
    identificador: string;
    tipo: Tipo;
    linea: number;
    columna: number;

    constructor(identificador: string, tipo: Tipo, linea: number, columna: number) {
        this.identificador = identificador;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
}