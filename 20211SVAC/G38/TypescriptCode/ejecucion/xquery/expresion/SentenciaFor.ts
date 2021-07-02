class SentenciaFor extends ExpresionAncestor implements NodoXquery{

    linea: number;
    columna: number;

    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo {
        return undefined;
    }

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
    }

}