class AnyText extends ExpresionAncestor{
    private predicatesList: Expresion[];
    linea: number;
    columna: number;

    constructor(predicatesList: Expresion[], linea: number, columna: number) {
        super();
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.err);
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
        let ts = ent.findAllSubTextInTS();
        return PredicateExpresion.filterXpathExpresion(ts,this.predicatesList);
    }
}