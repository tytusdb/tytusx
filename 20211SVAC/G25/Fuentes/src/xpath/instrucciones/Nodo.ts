class Nodo implements Instruccion{
    
    node:string;
    valor:string;
    tipo: TipoX;
    axes: Axes;
    predicado:Predicado;
    wildcard: Wildcard;
    linea:number;
    columna: number;
    
    constructor(node: string,valor: string, axes:Axes, predicado:Predicado, wildcard:Wildcard, tipo:TipoX, fila:number, columna:number){
        this.valor = valor;
        this.node = node;
        this.axes = axes;
        this.predicado = predicado;
        this.wildcard = wildcard;
        this.tipo = tipo;
        this.linea = fila;
        this.columna = columna;            
    }

    getNode() {
        return this.node;
    }

    getPredicado() {
        return this.predicado;
    }

    getValorImplicito():any {
        return this.valor;
    }

    generarGrafo(g:GraphValue, padre:String): any {
        let nombreHijo:String = "nodo"+g.count;

        g.graph += "    " + nombreHijo + "[label=\"" + this.node + "\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;

        padre = nombreHijo;

        if (typeof(this.predicado) == "object") {
            nombreHijo = this.predicado.generarGrafo(g, padre);
        } else {
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\" " + this.predicado + " \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
        }
        return nombreHijo;
    }

    getNombreHijo():String {
        return "";
    }
}