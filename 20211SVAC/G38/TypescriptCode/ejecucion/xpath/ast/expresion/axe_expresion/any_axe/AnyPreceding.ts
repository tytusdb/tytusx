class AnyPreceding implements Expresion{
    private axeType: AxeType;
    private axeOperation: AxeOperation;
    private identifier: string;
    private listaPredicados: Expresion[];
    linea: number;
    columna: number;

    constructor(axeType: AxeType, axeOperation: AxeOperation, identifier: string,
                listaPredicados:Expresion[], linea: number, columna: number) {
        this.axeType = axeType;
        this.axeOperation = axeOperation;
        this.identifier = identifier;
        this.listaPredicados = listaPredicados;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.err);
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
        var ts = new TablaSimbolos(null);
        switch (this.axeType){
            case AxeType.descendantType:
                ts = this.getDescendant(ent);
                break;
            case AxeType.descendantOrSelfType:
                ts = this.getDescendant(ent);
                ts.merge(ent);
                break;
        }
        return PredicateExpresion.filterXpathExpresion(ts,this.listaPredicados);
    }

    private getDescendant(ent:TablaSimbolos){
        var ts = new TablaSimbolos(null);
        switch (this.axeOperation){
            case AxeOperation.identifier:
                ts = ent.findAllObjectsByNombreElemento(this.identifier);
                break;
            case AxeOperation.node:
                ts = ent.findAllNodes();
                break;
            case AxeOperation.times:
                ts = ent.findAllSubObjects();
                break;
            case AxeOperation.text:
                ts = ent.findAllSubTextInTS();
                break;
        }
        return PredicateExpresion.filterXpathExpresion(ts,this.listaPredicados);
    }
}