class Primitive extends ExpresionAncestor{
    private valor: any;
    private tipo: Tipo;
    linea: number;
    columna: number;


    constructor(valor: any, tipo: Tipo, linea: number, columna: number) {
        super();
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        return this.tipo;
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
        return this.valor;
    }

    traducir3D(ambito:string, sizeScope:string):string{
        let temporal = CodeUtil.generarTemporal();
        if(this.tipo.esNumero()){
            CodeUtil.printWithComment(temporal + " = "+this.valor + " ;" ,"Guardamos en un temporal el valor");
        }else{
            CodeUtil.printWithComment(temporal + " = -1 ;" ,"Valores no represntativos como indices, no implementado");
        }
        return temporal;
    }


}