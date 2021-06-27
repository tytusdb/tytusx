class XpathExpresion implements Expresion{
    private expresionesXpath: Expresion[];
    linea: number;
    columna: number;

    constructor(expresionesXpath: Expresion[], linea: number, columna: number) {
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
}