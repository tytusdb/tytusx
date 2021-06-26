class Busqueda implements Instruccion{
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
    ejecutar(ent: Entorno, arbol: AST){
        
    }
}