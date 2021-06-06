class Atributo{
    identificador:string;
    valor:string;
    linea: number;
    columna: number;
    constructor(id:string, valor:string, linea:number, columna:number){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }


    graph(atributo:Atributo, str:string[], contador:Graficar) : number{
        const NUMID = contador.incrementarContador(); 
        //console.log(atributo);
        str.push(`
        node${NUMID}[label="ATRIBUTO",fillcolor="LightBlue", style ="filled", shape="box"];    
        node${contador.getContador()}[label="${atributo.identificador}",fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${contador.incrementarContador()};
        node${contador.getContador()}[label="${atributo.valor}",fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${contador.incrementarContador()};
        `);
        return NUMID;
    }

    
}