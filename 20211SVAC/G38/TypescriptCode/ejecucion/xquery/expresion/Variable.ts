class Variable extends ExpresionAncestor{
    variable: string;
    linea: number;
    columna: number;

    constructor(variable: string, linea: number, columna: number) {
        super();
        this.variable = variable;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo {
        let simbolo = ent.obtenerSimbolo(this.variable);
        let tipo = new Tipo(TipoDato.err);
        if(simbolo != null)
            tipo = simbolo.tipo;
        return tipo;
    }

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        let simbolo = ent.obtenerSimbolo(this.variable);
        let valor = null;
        if(simbolo != null){
            if(simbolo.tipo.esXpath())
                valor = simbolo.valorXpath;
            else
                valor = simbolo.valorPrimitvo;
        }
        return valor;
    }



}