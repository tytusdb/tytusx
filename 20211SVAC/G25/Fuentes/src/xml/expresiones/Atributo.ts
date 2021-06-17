class Atributo implements Expresion {
    id:string;
    value:string;
    line: number;
    column: number;
    entorno:Entorno;

    constructor(id:string, value:string, line:number, column:number) {
        this.id = id;
        this.value = value;
        this.line = line;
        this.column = column;
        this.entorno = new Entorno(null);
    }

    getTipo(e: Entorno):Tipo {
        return Tipo.OBJETO;
    };
    
    getValorImplicito(e: Entorno):any {
        return this.value;
    };

    generarGrafo(g:GraphValue, padre:String): any{
        let nombreHijo:String = "nodo"+g.count;

        g.graph += "    " + nombreHijo + "[label=\"" + this.id + "\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;

        nombreHijo = "nodo"+g.count;
        g.graph += "    " + nombreHijo + "[label=\" = \"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;

        nombreHijo = "nodo"+g.count;
        g.graph += "    " + nombreHijo + "[label=\"" + this.value + "\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;

        return null;
    };

    getNombreHijo():String {
        return "ATRIBUTO";
    };
}