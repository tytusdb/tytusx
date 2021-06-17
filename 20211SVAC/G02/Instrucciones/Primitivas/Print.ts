class Print implements Instruccion{
    linea: number;
    columna: number;
    salidaConsola: string;
    public expresion:Expresion;

    constructor(exp:Expresion, linea:number, columna:number){
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salidaConsola = "";
    }

    ejecutar(ent: Entorno, arbol: AST) {
        this.salidaConsola = "";
        var mensaje = "";
        const valor = this.expresion.getValorImplicito(ent, arbol);
        if(valor!==null){
            mensaje = '>',valor;
            console.log(mensaje);
            this.salidaConsola
        }else{
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }

}