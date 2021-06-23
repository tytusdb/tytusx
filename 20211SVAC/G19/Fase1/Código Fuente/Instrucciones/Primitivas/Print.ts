

class Print {
    linea: number;
    columna: number;
    public expresion:any;

    constructor(exp:any, linea:number, columna:number){
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: any, arbol: any) {
        const valor = this.expresion.getValorImplicito(ent, arbol);
        if(valor!==null){
            console.log('>',valor);
        }else{
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }

}