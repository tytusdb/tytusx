class InstruccionIf implements InstruccionXquery, NodoXquery{
    sentenciasIfs: SentenciaIf[];
    sentenciaElse: SentenciaElse;
    linea: number;
    columna: number;


    constructor( linea: number, columna: number) {
        this.sentenciasIfs = [];
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        for(let sentenciaIf of this.sentenciasIfs){
            if(sentenciaIf.ejecutar(ent,xmlData))
                return;
        }
        if(this.sentenciaElse != null && this.sentenciaElse != undefined)
            this.sentenciaElse.ejecutar(ent,xmlData);
    }

    public agregarElse(sentenciaElse: SentenciaElse ){
        this.sentenciaElse = sentenciaElse;
    }

    public agregarElseIf(sentenciaIf: SentenciaIf ){
        this.sentenciasIfs.push(sentenciaIf);
    }

    public agregarPrimerIf(sentenciaIf: SentenciaIf ){
        this.sentenciasIfs.unshift(sentenciaIf);
    }

    traducirXQ(sizeScope: string, otro:any) {
        throw new Error("Method not implemented.");
    }


}