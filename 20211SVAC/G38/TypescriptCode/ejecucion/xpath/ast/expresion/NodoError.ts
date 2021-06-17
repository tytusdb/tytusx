class NodoError implements Expresion{
    linea: number;
    columna: number;

    constructor(linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.err);
    }

    getValor(ent: TablaSimbolos): any {
    }

}