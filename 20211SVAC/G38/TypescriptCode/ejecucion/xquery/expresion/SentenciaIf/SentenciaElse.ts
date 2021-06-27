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
        for(let sentencia of this.sentencias){
            sentencia.ejecutar(ent,xmlData);
        }
    }

}