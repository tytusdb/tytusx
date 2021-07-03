class AxesPredicado{
    linea:number;
    columna: number;
    valor:string;
    constructor(valor: string, fila:number, columna:number){
        this.valor = valor;
        this.linea = fila;
        this.columna = columna;            
        
        console.log("AxesPredicado   "+ valor);   
    }

    getValorImplicito():any {
        return this.valor;
    }

    generarGrafo(g:GraphValue, padre:String): any {
        return null
    }

    getNombreHijo():String {
        return "";
    }
}