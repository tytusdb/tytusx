class Funcion implements InstruccionXquery, NodoXquery{
    nombreFuncion: string;
    listaParametros: Parametro[];
    tipo: Tipo;
    listaIntrucciones: InstruccionXquery[];
    linea: number;
    columna: number;

    constructor(nombreFuncion: string, listaParametros: Parametro[], tipo: Tipo,
                listaIntrucciones: InstruccionXquery[], linea: number, columna: number) {
        this.nombreFuncion = nombreFuncion;
        this.listaParametros = listaParametros;
        this.tipo = tipo;
        this.listaIntrucciones = listaIntrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        if(ListaFunciones.existe(this.nombreFuncion)){
            ListaErrores.AgregarErrorXQUERY(
              CrearError.errorSemantico("Ya existe una funcion declarada con el nombre "+this.nombreFuncion,
                                         this.linea, this.columna)
            );
            return;
        }
        ListaFunciones.agregarFuncion(this.nombreFuncion,this);
    }

    traducirXQ(sizeScope: string, otro:any) {
        throw new Error("Method not implemented.");
    }
}