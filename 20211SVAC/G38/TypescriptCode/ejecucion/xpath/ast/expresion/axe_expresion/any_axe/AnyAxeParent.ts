class AnyAxeParent implements Expresion{
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

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any { // ancestro :: enum
        let ts = new TablaSimbolos(null);
        switch (this.axeOperation){
            case AxeOperation.identifier:
                ts = ent.getElementsParentsByNombreElemento(this.identifier);
                break;
            case AxeOperation.node:
            case AxeOperation.times:
                ts = ent.getElementsParents();
                break;
            case AxeOperation.text:
                ListaErrores.AgregarErrorXPATH(CrearError.errorSemantico("No se puede pedir un nodo texto para el axe parent",this.linea,this.columna));
                break;
        }
        return PredicateExpresion.filterXpathExpresion(ts,this.listaPredicados);
    }
}