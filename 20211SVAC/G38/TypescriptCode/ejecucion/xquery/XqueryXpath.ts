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

    traducirXQ(sizeScope: string, otro:any) {
        throw new Error("Method not implemented.");
    }

}