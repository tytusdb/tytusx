class XpathExpresion implements Expresion{
    private expresionesXpath: Expresion[];
    linea: number;
    columna: number;

    constructor(expresionesXpath: Expresion[], linea: number, columna: number) {
        this.expresionesXpath = expresionesXpath;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.err);
    }

    getValor(ent: TablaSimbolos): any {
        let entornoActual : TablaSimbolos = ent;
        entornoActual.esGlobal = true;
        for(let expresion of this.expresionesXpath){
            if(entornoActual == undefined || entornoActual == null) {
                throw Error("Se devolvio tabal nula");
            }
            entornoActual = expresion.getValor(entornoActual);
            if (!(expresion instanceof RootCurrent || expresion instanceof RootParent))
                entornoActual.esGlobal = false;
        }
        return entornoActual;
    }

}