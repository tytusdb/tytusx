class Atributo{
    identificador:string;
    valor:string;
    linea: number;
    columna: number;
    tipo:Tipo;
    constructor(id:string, valor:string, linea:number, columna:number){
        this.identificador = id;
        this.valor = valor;
        this.tipo=Tipo.ATRIBUTO;
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

    
    agregarTDS(entorno:TablaSimbolos, atributo:Atributo,entornoactual:string, tetiqueta:boolean){
        return Simbolo(atributo.identificador, atributo.valor, atributo.tipo, entornoactual, tetiqueta);
    }

    graficarTDS(str:[],atibuto:Atributo, entornoactual:string){
        let cadena = "<tr>\n<th scope=\"row\">" + contador_tds + "</th>\n" +
          "<td scope=\"row\">" + atibuto.identificador + "</td>\n" +
          "<td>" + atibuto.valor + "</td>\n" +
          "<td>" + "Atributo" + "</td>\n" +
          "<td>" + entornoactual+ "</td>\n" +
          "<td>" + atibuto.linea + "</td>\n" +
          "<td>" + atibuto.columna + "</td>\n" +
          "</tr>\n";
            str.push(cadena);
            contador_tds++;
    }
}