class ListaXpathExpresion extends ExpresionAncestor{
    private expresionesXpath: Expresion[];
    linea: number;
    columna: number;

    constructor(expresionesXpath: Expresion[], linea: number, columna: number) {
        super();
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


    traducir3D(ambito:string, sizeScope:string):string{

        CodeUtil.printComment("Obtenemos la lista de la carga xml")
        let tmpPosLista = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosLista + " = SP + 1 ;");
        let tmpLista = CodeUtil.generarTemporal();
        CodeUtil.print(tmpLista + " = Stack[(int)"+tmpPosLista+"];");

        //CodeUtil.guardarTemporales(tmpPosLista,tmpLista);

        CodeUtil.printComment("Creamos una nueva lista para concatenar las respuesetas de XpathExpressions")
        let tmpListaXpathXpressions = CodeUtil.generarTemporal();
        CodeUtil.printWithComment("SP = SP + "+sizeScope+" ;","Se cambia ambito")
        CodeUtil.print("crearLista();");
        CodeUtil.print(tmpListaXpathXpressions+" = Stack[SP];")
        CodeUtil.printWithComment("SP = SP - "+sizeScope+" ;","Se recupera ambito")

        let nuevaLista = "";
        this.expresionesXpath.forEach( function (expression) {
            nuevaLista = expression.traducir3D(tmpLista,sizeScope);

            CodeUtil.printWithComment("SP = SP + "+sizeScope+" ;","Se cambia ambito")
            let tmpPosParametro1 = CodeUtil.generarTemporal();
            let tmpPosParametro2 = CodeUtil.generarTemporal();
            CodeUtil.print(tmpPosParametro1 + " = SP + 0 ; ");
            CodeUtil.print(tmpPosParametro2 + " = SP + 1 ; ");
            CodeUtil.print("Stack[(int)"+tmpPosParametro1+"] = "+tmpListaXpathXpressions+" ;")
            CodeUtil.print("Stack[(int)"+tmpPosParametro2+"] = "+nuevaLista+" ;")
            CodeUtil.printWithComment("concatenarListas();","Concatenamos las listas Xpath")
            CodeUtil.print(tmpListaXpathXpressions+" = Stack[SP]; ")
            CodeUtil.printWithComment("SP = SP - "+sizeScope+" ;","Se recupera ambito")

        });


        //Imprimimos la lista
        CodeUtil.printComment("Imprimimos lista resultante")
        CodeUtil.print("SP = SP + "+sizeScope+" ; ")
        //CodeUtil.guardarTemporales(tmpPosLista,tmpLista);
        CodeUtil.printWithComment("Stack[SP] = "+tmpListaXpathXpressions+"; ","Imprimimos la lista");
        CodeUtil.print("imprimirListaObjetos();")
        //CodeUtil.recuperarTemporales(tmpPosLista,tmpLista);
        CodeUtil.print("SP = SP - "+sizeScope+" ; ")
        return "";
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



    traducir3DXQuery(sizeScope:string):any{


        CodeUtil.printComment("Creamos una nueva lista para concatenar las respuesetas de XpathExpressions")
        let tmpListaXpathXpressions = CodeUtil.generarTemporal();
        CodeUtil.printWithComment("SP = SP + "+sizeScope+" ;","Se cambia ambito")
        CodeUtil.print("crearLista();");
        CodeUtil.print(tmpListaXpathXpressions+" = Stack[SP];")
        CodeUtil.printWithComment("SP = SP - "+sizeScope+" ;","Se recupera ambito")

        let nuevaLista = "";
        this.expresionesXpath.forEach( function (expression) {
            nuevaLista = expression.traducir3D(null,sizeScope);

            CodeUtil.printWithComment("SP = SP + "+sizeScope+" ;","Se cambia ambito")
            let tmpPosParametro1 = CodeUtil.generarTemporal();
            let tmpPosParametro2 = CodeUtil.generarTemporal();
            CodeUtil.print(tmpPosParametro1 + " = SP + 0 ; ");
            CodeUtil.print(tmpPosParametro2 + " = SP + 1 ; ");
            CodeUtil.print("Stack[(int)"+tmpPosParametro1+"] = "+tmpListaXpathXpressions+" ;")
            CodeUtil.print("Stack[(int)"+tmpPosParametro2+"] = "+nuevaLista+" ;")
            CodeUtil.printWithComment("concatenarListas();","Concatenamos las listas Xpath")
            CodeUtil.print(tmpListaXpathXpressions+" = Stack[SP]; ")
            CodeUtil.printWithComment("SP = SP - "+sizeScope+" ;","Se recupera ambito")

        });

        return tmpListaXpathXpressions;
    }

    traducirRetorno3DXQuery(sizeScope:string, ambito:string):any{
        let tmpListaXpathXpressions = this.crearLista3D(sizeScope);

        let nuevaLista = "";
        for(let expression of this.expresionesXpath){

            nuevaLista = expression.traducirRetorno3DXQuery(ambito,sizeScope);
            this.concatenarLista3D(sizeScope, tmpListaXpathXpressions, nuevaLista);
        }

        this.imprimirLista3D(sizeScope, tmpListaXpathXpressions);

    }

}