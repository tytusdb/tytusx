class Atribute implements Expresion{
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

    getTipo(ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.err);
    }

    getValor(ent: TablaSimbolos): any {
        let ts = new TablaSimbolos(null);
        switch (this.axeOperation){
            case AxeOperation.identifier:
                ts = ent.findAtributesByNombreElemento(this.identifier);
                break;
            case AxeOperation.node:
            case AxeOperation.times:
                ts = ent.findAllAtributesInObjects();
                break;
            case AxeOperation.text:
                break;
        }
        return PredicateExpresion.filterXpathExpresion(ts,this.listaPredicados);
    }
}