
class OperacionAritmetica implements Instruccion{
    operador1:Instruccion;
    operador2:Instruccion;
    tipoOperacion:String;
    linea:number;
    columna: number;
    
    constructor(operador1: Instruccion,operador2: Instruccion, tipo:String, fila:number, columna:number){
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipo;
        this.linea = fila;            
        this.columna = columna;            
        
    }

    getValorImplicito():any {
        /*if (typeof(this.operador1) == "number" && typeof(this.operador2) == "number") {
            switch(this.tipoOperacion){
                case "+": { return this.operador1.getValorImplicito() + this.operador2.getValorImplicito(); }
                case "-": { return this.operador1.getValorImplicito() + this.operador2.getValorImplicito(); }
                case "*": { return this.operador1.getValorImplicito() + this.operador2.getValorImplicito(); }
                default:{ return this.operador1.getValorImplicito() / this.operador2.getValorImplicito(); }
            }
        } else {
            return ``
        } */
        return null;
    }

    generarGrafo(g:GraphValue, padre:String): any {
        return null;
    }

    getNombreHijo():String {
        return "";
    }
}