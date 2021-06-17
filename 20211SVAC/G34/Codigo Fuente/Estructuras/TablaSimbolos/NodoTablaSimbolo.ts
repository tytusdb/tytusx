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
    entorno:string;
    linea: number;
    columna: number;

    constructor(indentificador:string, valor:any, tipo:Tipo, entorno:string, linea:number, columna:number)
    {
        this.indentificador = indentificador;
        this.valor = valor;
        this.tipo = tipo;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
    }

    setEntorno(entorno:string){
        this.entorno = entorno;
    }

    setValor(valor:any){
        this.valor = valor;
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