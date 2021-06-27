class SentenciaFor implements Expresion, NodoXquery{

    linea: number;
    columna: number;

    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo {
        return undefined;
    }

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
    }

}