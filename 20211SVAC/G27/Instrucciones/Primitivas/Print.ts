class Print implements Instruccion{
    linea: number;
    columna: number;
    public expresion: Expresion;

    constructor(exp:Expresion, linea:number, columna:number){
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent:Entorno, arbol:AST){
        const valor = this.expresion.getValorImplicito(ent, arbol);
        if (valor !== null)
        {
            console.log('->', valor);
        }
        else
        {
            console.log('>>[ERROR]: se están trantando de imprimir valores nulos.')
        }
    }
}