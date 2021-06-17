interface Expresion{
    linea: number;
    columna: number;

    getValor(ent: TablaSimbolos): any;
    getTipo(ent: TablaSimbolos): Tipo;
}