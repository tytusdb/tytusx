class Wildcard implements Instruccion{
    linea:number;
    columna: number;
    valor:string;
    constructor(valor: string, fila:number, columna:number){
        this.valor = valor;
        this.linea = fila;
        this.columna = columna;            
        
        console.log("wildcard   "+ valor);   
    }

    getValorImplicito():any {
        return null;
    }

    generarGrafo(g:GraphValue, padre:String): any {
        return this.valor;
    }

    getNombreHijo():String {
        return "";
    }
}