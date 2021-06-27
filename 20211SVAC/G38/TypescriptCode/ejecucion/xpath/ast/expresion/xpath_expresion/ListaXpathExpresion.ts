class ListaXpathExpresion implements Expresion{
    private expresionesXpath: Expresion[];
    linea: number;
    columna: number;

    constructor(expresionesXpath: Expresion[], linea: number, columna: number) {
        this.expresionesXpath = expresionesXpath;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ts:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        if(this.expresionesXpath.length == 1){
           let tipo = this.expresionesXpath[0].getTipo(ts,ent)
           if(!tipo.esError()) return tipo;
        }

        return new Tipo(TipoDato.xpathValue);
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
        var ts = XpathUtil.crearTablaSimbolos([]);
        this.expresionesXpath.forEach( function (expresion) {
            let valorExpresion = expresion.getValor(tsXquery,ent)
            if(valorExpresion instanceof TablaSimbolos){
                let nuevoResultado:Array<TsRow> = ts.listaSimbolos.concat(valorExpresion.listaSimbolos);
                ts.listaSimbolos = nuevoResultado;
            }else{
               ts = valorExpresion;
            }

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