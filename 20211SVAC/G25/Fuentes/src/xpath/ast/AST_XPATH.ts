class AST_XPATH implements Instruccion {
    linea:number;
    columna:number;
<<<<<<< HEAD
    public instrucciones: Array<Instruccion>
    
=======
    private instrucciones: Array<Instruccion>
>>>>>>> 065f807b2d2a6d3bcb05e529aa7e8552d138f885

    public list_error: Array<Error>;

    constructor(instrucciones:Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.columna = 0;
        this.linea = 0;
        this.list_error = new Array<Error>();
    }

    getInstrucciones() {
        return this.instrucciones;
    }

    getValorImplicito():any {
        return this.instrucciones;
    }

    generarGrafo(g:GraphValue, padre:String): any {
        let nombreHijo:String = "nodo"+g.count;

        g.graph += "    " + nombreHijo + "[label=\"INICIO\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;

        padre = nombreHijo;

        this.instrucciones.forEach((or:Array<Instruccion>) => {
            or.forEach((o:Instruccion) => {
                /*nombreHijo = "nodo" + g.count;
                g.graph += "    " + nombreHijo + "[label=\""+ o.getNombreHijo() +"\"];\n";
                g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
                g.count++;*/
                nombreHijo = o.generarGrafo(g, nombreHijo);
            });
        });

        return null;
    }

    getNombreHijo():String {
        return "";
    }
    
    setErrores(lista_error: Array<Error>) {          
        this.list_error = lista_error;
    }

    getErrores():any {
        let lista_errores =  this.list_error;         
      
        return lista_errores;
    } 
}