

 class Primitivo  {
    linea: number;
    columna: number;
    valor: any;

    constructor(valor:any, linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }

    getTipo(ent: any, arbol: any): string {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof(valor) === 'boolean')
        {
            return 'boolean';
        }
        else if (typeof(valor) === 'string')
        {
            return 'string';
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return 'number';
            }
           return 'double';
        }
        else if(valor === null){
            return 'null';
        }
        return 'void';
    }

    getValorImplicito(ent: any, arbol: any) {
        return this.valor;
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }
    
}