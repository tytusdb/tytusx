
class Primitivo implements Instruccion{
    valor:any;
    tipo:TipoPrimitvo;
    linea:number;
    columna: number;
    
    constructor(valor: any, tipo:TipoPrimitivo, fila:number, columna:number){
        this.valor = valor;
        this.tipo = tipo;
        this.linea = fila;
        this.columna = columna;            
        
    }

    getTipo() {
        return this.tipo;
    }

    getValorImplicito():any {
        return this.valor;
    }

    generarGrafo(g:GraphValue, padre:String): any {
        let nombreHijo = "nodo"+g.count;
        g.graph += "  "+nombreHijo +"[label=\""+ this.valor.toString().replace("\"", "").replace("\"", "") +"\"];\n";
        g.graph += "  "+padre +" -> "+ nombreHijo+";\n";
        g.count++;
        return null;
    }

    getNombreHijo():String {
        return "PRIMITIVO";
    }
}