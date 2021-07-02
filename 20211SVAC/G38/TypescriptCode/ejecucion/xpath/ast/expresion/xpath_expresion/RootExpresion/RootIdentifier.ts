class RootIdentifier extends ExpresionAncestor{
    private identifier:string;
    private predicatesList: Expresion[];
    linea: number;
    columna: number;

    constructor(identifier: string, predicatesList: Expresion[], linea: number, columna: number) {
        super();
        this.identifier = identifier;
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.err);
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
        let ts = ent.findObjectsByNombreElemento(this.identifier);
        return PredicateExpresion.filterXpathExpresion(ts,this.predicatesList);

    }

    public static findObjectsByNombre(){
        CodeUtil.print("/**************************************");
        CodeUtil.print("findObjectsByNombre(ListObject ambito, string identificador):ListObject");
        CodeUtil.print("ambito->stack[P]");
        CodeUtil.print("identificador->stack[P+1]");
        CodeUtil.print("return->stack[P]");
        CodeUtil.print("**************************************/");
        CodeUtil.print("void findObjectsByNombre()");
        CodeUtil.print("{");
        CodeUtil.printComment("Creamos la lista que vamos a retornar.");
        let sizeScope = 2;
        let lInicio = CodeUtil.generarEtiqueta();
        let lSiguienteObjeto = CodeUtil.generarEtiqueta();
        let lFin = CodeUtil.generarEtiqueta();
        let tmpListaObjetos = CodeUtil.generarTemporal();
        CodeUtil.printWithComment("SP = SP + "+sizeScope+";","Cambiamos ambito")
        CodeUtil.print("crearLista();")
        CodeUtil.printWithComment(tmpListaObjetos + " = Stack[SP]; ","Recuperamos el apuntador a la lista")
        CodeUtil.printWithComment("SP = SP - "+sizeScope+";","Recuperamos ambito")
        CodeUtil.printComment("Comenzamos a realizar la busqueda dentro del ambito por el nombre")
        CodeUtil.printWithComment(lInicio + ":","Etiqueta Inicio")
        CodeUtil.printComment("Recperamos los parametros")
        let tmpPosParametro1 = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpPosParametro1 + " = SP + 0 ;","Posicion del parametro de la lista");

        let tmpPosParametro2 = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpPosParametro2 + " = SP + 1 ;","Posicion del parametro del objeto");

        let tmpParametro1 = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpParametro1+" = Stack[(int)"+tmpPosParametro1+"];",
            "Se obtiene la referencia de la lista");

        let tmpParametro2 = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpParametro2+ " = Stack[(int)"+tmpPosParametro2+"];",
            "Se obtiene la referencia del objeto");

        CodeUtil.printComment("Validamos el Objeto de la lista")
        let tmpPosObjeto = CodeUtil.generarTemporal();

        CodeUtil.printWithComment(tmpPosObjeto + " = Heap[(int)"+tmpParametro1+"];",
            "Obtenemos el Objeto atravez de la lista ");

        CodeUtil.printWithComment("if ( "+tmpPosObjeto+" == -1 ) goto "+lFin+" ;",
            "La lista esta vacia");

        let tmpPosTipoObjeto = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpPosTipoObjeto + " = " + tmpPosObjeto + " + " + TsRow.POS_OBJECT + " ;",
            "Posicion del Tipo del objeto");

        let tmpTipoObjeto = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpTipoObjeto + " = Heap[(int)"+tmpPosTipoObjeto+"];",
            "Obtneemos el tipo del objeto");

        CodeUtil.printWithComment("if ( "+tmpTipoObjeto+" != "+TipoDato3D.objeto+" ) goto "+lSiguienteObjeto+" ;",
            "Si no es objeto buscamos en el siguiente objeto");

        let tmpPosEtiquetaObjeto = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpPosEtiquetaObjeto + " = " + tmpPosObjeto + " + " + TsRow.POS_LABEL_CONT_ATTRIBUTE + " ;",
            "Posicion de la etiqueta del objeto");

        let tmpEtiquetaObjeto = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpEtiquetaObjeto + " = Heap[(int)"+tmpPosEtiquetaObjeto+"];",
            "Se obtiene la etiqueta del objeto");


        CodeUtil.printComment("Comparamos las cadenas")
        let posParametro2comparar = CodeUtil.generarTemporal();
        let tmpReturn = CodeUtil.generarTemporal();
        CodeUtil.print(posParametro2comparar  + " = SP + 1 ;")
        CodeUtil.printWithComment("SP = SP + "+sizeScope + " ;","Se cambia  ambito")
        CodeUtil.print("Stack[SP] = "+tmpEtiquetaObjeto+" ; " );
        CodeUtil.print("Stack[(int)"+posParametro2comparar+"] = "+tmpParametro2+" ;");
        CodeUtil.print("equalString();")
        CodeUtil.print(tmpReturn + " = Stack[SP]; ")
        CodeUtil.printWithComment("SP = SP - "+sizeScope + " ;","Se recupera ambito")
        CodeUtil.printWithComment("if ( return != 1 ) then goto siguiente:","Si no es igual continiamos con la referencia")


        CodeUtil.print(lSiguienteObjeto+":");
        CodeUtil.printComment("Buscamos en la refrencia del siguiente objeto");

        let tmpPosSiguienteObjeto = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpPosSiguienteObjeto+" = "+tmpPosObjeto+" + 1 ;",
            "Posicion de la referencia en la liasta");
        CodeUtil.printWithComment("if ( "+tmpPosSiguienteObjeto+" == -1 ) goto "+lFin+" ; ",
            "Saltamos al fin si no hay otro objeto");
        CodeUtil.printWithComment("Stack[(int)"+tmpPosParametro1+"]="+tmpPosSiguienteObjeto+";",
            "Ponemos el la posicion del primer parametro la siguiente referencia");
        CodeUtil.print("goto "+lInicio+"; ")
        CodeUtil.printWithComment(lFin+":","Etiqueta Fin");
        CodeUtil.printComment("Retornamos la lista");
        CodeUtil.printWithComment("Stack[SP] = "+tmpListaObjetos+" ; ","Dejamos en la pos del return la lista");
        CodeUtil.print("return ;");
        CodeUtil.print("}");
        CodeUtil.print("");

        /*
        CodeUtil.printWithComment("SP = SP + "+sizeScope + " ;","Se cambia  ambito")
        CodeUtil.print("Stack[SP] = "+tmpEtiquetaObjeto+" ; " );
        CodeUtil.print("printString();")
        CodeUtil.printWithComment("SP = SP - "+sizeScope + " ;","Se recupera ambito")

        CodeUtil.printWithComment("SP = SP + "+sizeScope + " ;","Se cambia  ambito")
        CodeUtil.print("Stack[SP] = "+tmpParametro2+" ; " );
        CodeUtil.print("printString();")
        CodeUtil.printWithComment("SP = SP - "+sizeScope + " ;","Se recupera ambito")
        */

    }


    traducir3D(ambito:string, sizeScope:string):string{
        CodeUtil.printComment("Traduccion de RootIdentifier :"+this.identifier);
        let posCadena = CodeUtil.guardarTexto(this.identifier);
        CodeUtil.printComment("Buscamos en la lista por nombre")

        CodeUtil.printWithComment("SP = SP + "+sizeScope + " ;", "Cambiamos ambito")
        //Calculamos las posiciones
        let tmpPosPar1=CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosPar1+"= SP + 0 ;")
        let tmpPosPar2=CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosPar2+"= SP + 1 ;")
        let tmpPosPar3=CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosPar3+"= SP + 2 ;")
        let tmpPosPar4=CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosPar4+"= SP + 3 ;")
        //Pasamos los parametros
        CodeUtil.print("Stack[(int)"+tmpPosPar1+"] = "+ambito+" ;");
        CodeUtil.print("Stack[(int)"+tmpPosPar2+"] = "+TipoDato3D.objeto+" ;");
        CodeUtil.print("Stack[(int)"+tmpPosPar3+"] = "+posCadena+" ;");
        CodeUtil.print("Stack[(int)"+tmpPosPar4+"] = "+CodeUtil.VAL_INDEX_DEFAULT+" ;");
        CodeUtil.print("buscarByPadreTipoValorIndex();")
        let tmpPosReturn = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpPosReturn + " = Stack[SP] ;","Se recupera el return")
        CodeUtil.printWithComment("SP = SP - "+sizeScope + " ;", "Recuperamos ambito")
        //return tmpPosReturn;
        CodeUtil.printComment("Fin de RootIdentifier :"+this.identifier);
        return tmpPosReturn;
    }
}