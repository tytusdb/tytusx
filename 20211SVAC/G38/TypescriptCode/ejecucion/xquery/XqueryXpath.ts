class XqueryXpath implements InstruccionXquery{
    predicate: Expresion;
    columna: number;
    linea: number;


    constructor(predicate: Expresion) {
        this.predicate = predicate;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        return [this.predicate.getValor(ent,xmlData)];
    }

}