class LlamadaFuncion implements  Expresion, NodoXquery{
    identifier: string;
    valoresParametros: Expresion[];
    linea: number;
    columna: number;

    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo {
        return undefined;
    }

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
    }

}