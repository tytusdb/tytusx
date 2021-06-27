class AnyCurrent implements Expresion{
    private predicatesList: Expresion[];
    linea: number;
    columna: number;

    constructor(predicatesList: Expresion[], linea: number, columna: number) {
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.err);
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
        let ts = ent;
        return PredicateExpresion.filterXpathExpresion(ts,this.predicatesList);
    }
}