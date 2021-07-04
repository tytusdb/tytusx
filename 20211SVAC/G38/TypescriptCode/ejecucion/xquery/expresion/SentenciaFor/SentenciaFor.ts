class SentenciaFor implements InstruccionXquery, NodoXquery{
    identifier: string;
    senteciaXpath: Expresion;
    filtro: InstruccionXquery;
    ordenamiento: Expresion;
    retorno: InstruccionXquery;
    linea: number;
    columna: number;


    constructor(identifier: string, senteciaXpath: Expresion, filtro: InstruccionXquery, ordenamiento: Expresion,
                retorno: InstruccionXquery, linea: number, columna: number
               )
    {
        this.identifier = identifier;
        this.senteciaXpath = senteciaXpath;
        this.filtro = filtro;
        this.ordenamiento = ordenamiento;
        this.retorno = retorno;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        let entornoFor = new TablaSimbolosXquery(ent,"entorno for");
        let valorXpath = this.senteciaXpath.getValor(ent,xmlData);

        if(!(valorXpath instanceof TablaSimbolos)){
            ListaErrores.AgregarErrorXQUERY(
                CrearError.errorSemantico("La consulta xpath en el for no devolvio un resultado de tipo xpath",
                    this.linea, this.columna)
            );
            return;
        }

        if(!this.isXqueryExpresionValid(valorXpath)) {
            return;
        }

        let simbolo = new Simbolo(this.identifier,new Tipo(TipoDato.xpathValue),null,valorXpath);
        entornoFor.agregarSimbolo(simbolo);

        if(this.filtro != null){
            valorXpath = this.filtro.ejecutar(entornoFor,xmlData);
            if(!this.isXqueryExpresionValid(valorXpath)) {
                return;
            }
            simbolo.valorXpath = valorXpath;
            entornoFor.modificarSimbolo(simbolo);
        }

        this.retorno.ejecutar(entornoFor,valorXpath);

        return;
    }

    private isXqueryExpresionValid(valorXpath : TablaSimbolos){
        if(valorXpath==null || valorXpath.esVacia()) {
            ListaErrores.AgregarErrorXQUERY(
                CrearError.errorSemantico("La consulta xpath en el for no devolvio ningun resultado",
                    this.linea, this.columna)
            );
            return false;
        }
        return true;
    }

}











