class Funcion implements InstruccionXquery, NodoXquery{
    nombreFuncion: string;
    listaParametros: Parametro[];
    tipo: Tipo;
    listaIntrucciones: NodoXquery[];
    linea: number;
    columna: number;


    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {

    }
}