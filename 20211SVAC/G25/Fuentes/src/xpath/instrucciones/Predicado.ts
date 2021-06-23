class Predicado implements Instruccion{

    id:string;
    expresion:Expresion;
    linea:number;
    columna: number;

    constructor(id: string, expresion:Expresion, fila:number, columna:number){
        this.id = id;
        this.expresion = expresion;
        this.linea = fila;
        this.columna = columna;            
    }

    getValorImplicito():any {
        return null;
    }

    generarGrafo(g:GraphValue, padre:String): any {
        let nombreHijo:String = "nodo"+g.count;
        let hijoEnMedio; 
        g.graph += "    " + nombreHijo + "[label=\" [ \"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;

        nombreHijo = "nodo"+g.count;
        g.graph += "    " + nombreHijo + "[label=\" " + this.expresion + " \"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        hijoEnMedio = nombreHijo;

        nombreHijo = "nodo"+g.count;
        g.graph += "    " + nombreHijo + "[label=\" ] \"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        return hijoEnMedio;
    }

    getNombreHijo():String {
        return "";
    }
}