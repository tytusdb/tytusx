enum Tipo {
    STRING,
    INT,
    DOUBLE,
    BOOL,
    VOID,
    OBJETO,
    ATRIBUTO,
    NULL,
    ARRAY
}
class NodoTablaSimbolo
{
    /*
    Clase para nodo de la tabla de simbolos
    */
    indentificador: string;
    valor: any;
    tipo: Tipo;
    linea: number;
    columna: number;

    constructor(indentificador:string, valor:any, tipo:Tipo, linea:number, columna:number)
    {
        this.indentificador = indentificador;
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolos, arbol: AST): Tipo {
        return this.tipo;
    }
    getValorImplicito(ent: TablaSimbolos, arbol: AST) {
        return this.valor;
    }

    /*FASE 2
    PUNTERO AL HEAP O STACK
    */
}