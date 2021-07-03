class Expresion implements Instruccion{
    linea:number;
    columna: number;
    public valor:string;
    
    constructor(valor: string, fila:number, columna:number){
        this.valor = valor;
        this.linea = fila;
        this.columna = columna;            
        
    }

    getValorImplicito():any {
        return this.valor;
    }

    generarGrafo(g:GraphValue, padre:String): any {
        return null;
    }

    getNombreHijo():String {
        return "";
    }
}