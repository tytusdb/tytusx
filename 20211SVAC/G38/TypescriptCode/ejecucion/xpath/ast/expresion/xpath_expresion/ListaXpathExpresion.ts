class ListaXpathExpresion implements Expresion{
    private expresionesXpath: Expresion[];
    linea: number;
    columna: number;

    constructor(expresionesXpath: Expresion[], linea: number, columna: number) {
        this.expresionesXpath = expresionesXpath;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.xpathValue);
    }

    getValor(ent: TablaSimbolos): any {
        var ts = XpathUtil.crearTablaSimbolos([]);
        this.expresionesXpath.forEach( function (expresion) {
            let nuevoResultado:Array<TsRow> = ts.listaSimbolos.concat(expresion.getValor(ent).listaSimbolos);
            ts.listaSimbolos = nuevoResultado;

        });
        return ts;
    }

    public validarMerge(listaAntigua:Array<TsRow>, listaNueva:Array<TsRow>): Array<TsRow> {
        var tsAntigua = XpathUtil.crearTablaSimbolos(listaAntigua);
        var tsNueva = XpathUtil.crearTablaSimbolos(listaNueva);
        if(tsAntigua.isEqual(tsAntigua)){
            return tsAntigua.listaSimbolos;
        }else{
            tsAntigua.merge(tsNueva);
            return tsAntigua.listaSimbolos;
        }
    }



}