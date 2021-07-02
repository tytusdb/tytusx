interface Expresion{
    linea: number;
    columna: number;

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any;
    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo;
    traducir3D(ambito:string, sizeScope:string):string;
}