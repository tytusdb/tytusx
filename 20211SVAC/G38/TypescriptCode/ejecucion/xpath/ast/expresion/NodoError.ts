class NodoError extends ExpresionAncestor{
    linea: number;
    columna: number;

    constructor(linea: number, columna: number) {
        super();
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.err);
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
    }

}