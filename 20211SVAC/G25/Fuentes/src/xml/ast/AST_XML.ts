class AST_XML implements Expresion {

    line: number;
    column: number;

    private expresiones: Array<Objeto>;
    private list_grammar: Array<Gramatica>;
    private list_error: Array<Error>;

    constructor(expresiones: Array<Objeto>){
        this.expresiones = expresiones;
        this.list_grammar = new Array<Gramatica>();
        this.list_error = new Array<Error>();
        this.line = 0;
        this.column = 0;
    }

    public getExpresiones():Array<Objeto> {
        return this.expresiones;
    }

    setProducciones(lista_grammar: Array<Gramatica>) {  
        this.list_grammar = lista_grammar;
    }

    setErrores(lista_error: Array<Error>) {  
        this.list_error = lista_error;
    }

    getErrores():any {
        let lista_errores =  this.list_error;  
        return lista_errores;
    } 

    getProducciones():String {
        let count = 1;
        let text = `
        
        `;
        this.list_grammar.forEach((e:Gramatica) => {
            text += `
            <tr>
                <td>${count}</td>
                <td>${e.getProduccion()}</td>
                <td>${e.getRegla()}</td>
            </tr>
            `;
            count++;
        })

        return text;
    }

    getTipo(e: Entorno):Tipo {
        return Tipo.OBJETO;
    };

    getValorImplicito(e: Entorno):any {
        return null;
    };

    generarGrafo(g:GraphValue, padre:String): any{
        let nombreHijo:String = "nodo"+g.count;

        g.graph += "    " + nombreHijo + "[label=\"ESTRUCTURA\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;

        padre = nombreHijo;

        this.expresiones.forEach((o:Objeto) => {
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\""+ o.getNombreHijo() +"\"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            o.generarGrafo(g, nombreHijo);
        });

        
        return null;
    };

    getNombreHijo():String {
        return "";
    };

}