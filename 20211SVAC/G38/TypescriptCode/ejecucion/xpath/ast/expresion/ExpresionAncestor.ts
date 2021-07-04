class ExpresionAncestor implements Expresion{
    columna: number;
    linea: number;

    constructor() {
        this.columna = null;
        this.linea = null;
    }

    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo {
        return undefined;
    }

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
    }

    traducir3D(ambito:string, sizeScope:string):any{
        throw new Error("Metodo 'traducir' no implementado.")
    }


}