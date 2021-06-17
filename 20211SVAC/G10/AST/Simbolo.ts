class Simbolo  {
    private nombre :string;
    private valor: string;
    private tipo: Tipo;
    private padre:number;
    linea: number;
    columna: number;

    constructor(nombre:string,tipo:Tipo, valor:string, linea:number, columna:number,padre:number){        
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor=valor;
        this.nombre=nombre;
        this.padre=padre;
    }

    getTipo(): Tipo {
        return this.tipo;
    }
    getValor():string {
        return this.valor;
    }
    getPadre():number{
        return this.padre;
    }
    getNombre():string{
        return this.nombre;
    }
    
}
