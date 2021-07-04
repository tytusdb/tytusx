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

    traducir3DXQuery(sizeScope:string):any{
        throw new Error("Metodo 'traducir' no implementado.")
    }

    traducirRetorno3DXQuery(sizeScope:string, ambito:string ):any{
        throw new Error("Metodo 'traducir' no implementado.")
    }

    public crearListaC3D(sizeScope: string):string {
        let tmpListaXpathXpressions = CodeUtil.generarTemporal();
        CodeUtil.printWithComment("SP = SP + " + sizeScope + " ;", "Se cambia ambito")
        CodeUtil.print("crearLista();");
        CodeUtil.print(tmpListaXpathXpressions + " = Stack[SP];")
        CodeUtil.printWithComment("SP = SP - " + sizeScope + " ;", "Se recupera ambito")
        return tmpListaXpathXpressions;
    }


    protected crearLista3D(sizeScope: string) {
        CodeUtil.printComment("Creamos una nueva lista para concatenar las respuesetas de XpathExpressions del return")
        let tmpListaXpathXpressions = CodeUtil.generarTemporal();
        CodeUtil.printWithComment("SP = SP + " + sizeScope + " ;", "Se cambia ambito")
        CodeUtil.print("crearLista();");
        CodeUtil.print(tmpListaXpathXpressions + " = Stack[SP];")
        CodeUtil.printWithComment("SP = SP - " + sizeScope + " ;", "Se recupera ambito")
        return tmpListaXpathXpressions;
    }

    protected concatenarLista3D(sizeScope: string, tmpListaXpathXpressions: string, nuevaLista: string) {
        CodeUtil.printWithComment("SP = SP + " + sizeScope + " ;", "Se cambia ambito")
        let tmpPosParametro1 = CodeUtil.generarTemporal();
        let tmpPosParametro2 = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosParametro1 + " = SP + 0 ; ");
        CodeUtil.print(tmpPosParametro2 + " = SP + 1 ; ");
        CodeUtil.print("Stack[(int)" + tmpPosParametro1 + "] = " + tmpListaXpathXpressions + " ;")
        CodeUtil.print("Stack[(int)" + tmpPosParametro2 + "] = " + nuevaLista + " ;")
        CodeUtil.printWithComment("concatenarListas();", "Concatenamos las listas Xpath")
        CodeUtil.print(tmpListaXpathXpressions + " = Stack[SP]; ")
        CodeUtil.printWithComment("SP = SP - " + sizeScope + " ;", "Se recupera ambito")
    }


    protected imprimirLista3D(sizeScope: string, tmpListaXpathXpressions: string) {
        CodeUtil.printComment("Imprimimos lista resultante")
        CodeUtil.print("SP = SP + " + sizeScope + " ; ")
        //CodeUtil.guardarTemporales(tmpPosLista,tmpLista);
        CodeUtil.printWithComment("Stack[SP] = " + tmpListaXpathXpressions + "; ", "Imprimimos la lista");
        CodeUtil.print("imprimirListaObjetos();")
        //CodeUtil.recuperarTemporales(tmpPosLista,tmpLista);
        CodeUtil.print("SP = SP - " + sizeScope + " ; ")
    }


}