interface Expresion{
    linea: number;
    columna: number;

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any;
    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo;
    traducir3D(ambito:string, sizeScope:string):string;
    traducir3DXQuery(sizeScope:string):any;
    traducirRetorno3DXQuery(sizeScope:string, ambito:string ):any;
}