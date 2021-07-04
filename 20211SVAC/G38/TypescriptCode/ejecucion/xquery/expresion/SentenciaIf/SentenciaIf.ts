class SentenciaIf implements InstruccionXquery, NodoXquery{
    condicion: Expresion;
    sentencias: InstruccionXquery[];
    linea: number;
    columna: number;


    constructor(condicion: Expresion, sentencias: InstruccionXquery[], linea: number, columna: number) {
        this.condicion = condicion;
        this.sentencias = sentencias;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        let tipo = this.condicion.getTipo(ent,xmlData);
        if(tipo != null && tipo != undefined && tipo.esBoolean()){
            let valor = this.condicion.getValor(ent,xmlData);
            if(valor){
                let entornoIf = new TablaSimbolosXquery(ent,"entorno if");
                for(let sentencia of this.sentencias){
                    sentencia.ejecutar(entornoIf,xmlData);
                }
                return true;
            }
        }
        return false;
    }

    traducirXQ(sizeScope: string, otro:any) {
        throw new Error("Method not implemented.");
    }



}