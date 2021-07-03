interface Expresion {
    line: number;
    column: number;

    getTipo(e: Entorno):Tipo;
    getValorImplicito(e: Entorno):any;
    generarGrafo(g:GraphValue, padre:String): any;
    getNombreHijo():String;

}