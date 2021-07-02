class XpathExpresion extends ExpresionAncestor{
    private expresionesXpath: Expresion[];
    linea: number;
    columna: number;

    constructor(expresionesXpath: Expresion[], linea: number, columna: number) {
        super();
        this.expresionesXpath = expresionesXpath;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ts:TablaSimbolosXquery, ent: TablaSimbolos): Tipo {
        if (this.expresionesXpath.length == 1 && this.expresionesXpath[0] instanceof Variable)
            return this.expresionesXpath[0].getTipo(ts, ent);

        return new Tipo(TipoDato.err);
    }

    getValor(ts:TablaSimbolosXquery,ent: TablaSimbolos): any {
        let entornoActual : TablaSimbolos = ent;
        for(let expresion of this.expresionesXpath){
            if(entornoActual == undefined || entornoActual == null) {
                throw Error("Se devolvio tabla nula");
            }
            entornoActual = expresion.getValor(ts,entornoActual);
        }
        return entornoActual;
    }


    traducir3D(ambito:string, sizeScope:string):string{
        let entornoActual = ambito;
        for(let expression of this.expresionesXpath){
            if(ambito == undefined || ambito == null) {
                throw Error("Ambito es nulo");
            }
            entornoActual = expression.traducir3D(ambito,sizeScope);
        }
        return entornoActual;
    }


}