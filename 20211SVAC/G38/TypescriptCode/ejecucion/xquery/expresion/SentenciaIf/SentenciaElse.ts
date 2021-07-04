class SentenciaElse implements InstruccionXquery, NodoXquery{
    sentencias: InstruccionXquery[];
    linea: number;
    columna: number;

    constructor(sentencias: InstruccionXquery[], linea: number, columna: number) {
        this.sentencias = sentencias;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        let entornoElse = new TablaSimbolosXquery(ent,"entorno else");

        for(let sentencia of this.sentencias){
            sentencia.ejecutar(entornoElse,xmlData);
        }
    }

    traducirXQ(sizeScope: string, otro:any) {
        throw new Error("Method not implemented.");
    }

}