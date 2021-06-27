interface InstruccionXquery{
    linea: number;
    columna: number;

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any;
}