class Encoding implements Expresion {
    encoding: string;
    line:number;
    column:number;
    
    
    constructor(encoding: string, line:number, column:number) {
        this.encoding = encoding;
        this.line = line;
        this.column = column;
    }

    getTipo(e: Entorno):Tipo {
        return Tipo.ENCODING;
    };

    getValorImplicito(e: Entorno):any {
        return this;
    };

    generarGrafo(g:GraphValue, padre:String): any{
        return null;
    };

    getNombreHijo():String {
        return "ENCODING";
    };

}