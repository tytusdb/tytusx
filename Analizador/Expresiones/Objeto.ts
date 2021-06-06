//import { Atributo } from "./Atributo";

class Objeto{
    identificador:string;
    identificador_cierre:string;
    texto:string;
    listaAtributos:Array<Atributo>;
    listaObjetos: Array<Objeto>;
    entorno: TablaSimbolos;
    linea: number;
    columna: number;


    constructor(id:string, texto:string, linea:number, columna:number, listaAtributos:Array<Atributo>, listaO:Array<Objeto>, identificador_cierre:string){
        this.identificador = id;
        this.identificador_cierre = identificador_cierre;
        this.texto = texto;
        this.entorno = new TablaSimbolos(null);
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.linea = linea;
        this.columna = columna;
    }


    graph(objeto:Objeto, str:string[], contador:Graficar) : number{

        const NUMID = contador.incrementarContador();    
        str.push(`
        node${NUMID}[label="OBJETO",fillcolor="LightBlue", style ="filled", shape="box"];    
        node${contador.getContador()}[label="${objeto.identificador}",fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${contador.incrementarContador()};
        `);

        let NUMPARAM = contador.incrementarContador();
        NUMPARAM = NUMPARAM - 1;

        let ptr : number;

        if(objeto.listaAtributos != undefined)
        {
            let atributo = new Atributo('','',0,0);            
            for(let i:number = 0; i < objeto.listaAtributos.length; i++){                
                ptr = atributo.graph(objeto.listaAtributos[i], str, contador);
                str.push(` node${NUMID} -> node${ptr};\n `);
            } 
        }
        if(objeto.texto != "")
        {
            str.push(`
            node${contador.getContador()}[label="${objeto.texto}",fillcolor="LightBlue", style ="filled", shape="box"];
            node${NUMID} -> node${contador.incrementarContador()};
            `);
        }
        for(let i:number = 0; i < objeto.listaObjetos.length; i++){
            console.log(objeto.listaObjetos[i]);
            ptr = objeto.graph(objeto.listaObjetos[i], str, contador);
            str.push(` node${NUMID} -> node${ptr};\n `);
        } 

        str.push(`
        node${contador.getContador()}[label="${objeto.identificador_cierre}",fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${contador.incrementarContador()};
        `);
        
        return NUMID;
    }    
} 