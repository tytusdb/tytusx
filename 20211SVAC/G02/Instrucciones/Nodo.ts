class Nodo implements Instruccion{
    linea: number;
    columna: number;
    salidaConsola: string;
    public ListaPredicados: Expresion[];

    constructor(listapredicados: Expresion[],linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.salidaConsola = "";
        this.ListaPredicados=listapredicados;
    }
    ejecutar(ent: Entorno, arbol: AST){
        this.salidaConsola = "";
        var mensaje = "";

        let valor;

        this.ListaPredicados.forEach(element => {
             valor = element.getValorImplicito(ent, arbol);
        });

        
        if(valor!==null){
            mensaje = '>',valor;
            console.log(mensaje);
            this.salidaConsola
        }else{
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }
}