//import { Atributo } from "./Atributo";

class Objeto{
    identificador:string;
    texto:string;
    listaAtributos:Array<Atributo>;
    listaObjetos: Array<Objeto>;
    entorno: TablaSimbolos;
    tipo:Tipo;
    linea: number;
    columna: number;


    constructor(id:string, texto:string, linea:number, columna:number, listaAtributos:Array<Atributo>, listaO:Array<Objeto>){
        this.identificador = id;
        this.texto = texto;
        this.entorno = new TablaSimbolos(null);
        this.tipo=Tipo.OBJETO;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.linea = linea;
        this.columna = columna;
    }


    graph(objeto:Objeto, str:string[], contador:number) : number{

        const NUMID = contador++;    
            str.push(`
            node${NUMID}[label="DoWhile",fillcolor="LightBlue", style ="filled", shape="box"];    
            node${contador}[label="Body",fillcolor="LightBlue", style ="filled", shape="box"];
            node${NUMID} -> node${contador++};
            `);

        for(let i:number = 0; i < objeto.listaObjetos.length; i++){

        }
        
        
        
        return 0;
    }
} 