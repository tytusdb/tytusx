enum Tipo {
    STRING,
    INT,
    DOUBLE,
    BOOL,
    VOID,
    STRUCT,
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

    /*FASE 2
    PUNTERO AL HEAP O STACK
    */
}