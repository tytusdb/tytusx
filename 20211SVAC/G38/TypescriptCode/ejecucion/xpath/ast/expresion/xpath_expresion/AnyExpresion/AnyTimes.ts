class AnyTimes implements Expresion{ //Esta //*
    private predicatesList: Expresion[];
    linea: number;
    columna: number;

    constructor(predicatesList: Expresion[], linea: number, columna: number) {
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.err);
    }

    getValor(ent: TablaSimbolos): any {
        let ts = ent.findAllSubObjects();
        return PredicateExpresion.filterXpathExpresion(ts,this.predicatesList);
    }
}