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
                for(let sentencia of this.sentencias){
                    sentencia.ejecutar(ent,xmlData);
                }
                return true;
            }
        }
        return false;
    }



}