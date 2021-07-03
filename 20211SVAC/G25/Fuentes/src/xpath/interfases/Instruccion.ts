interface Instruccion{
    linea:number;
    columna: number;
    getValorImplicito():any;
    generarGrafo(g:GraphValue, padre:String): any;
    getNombreHijo():String;
}