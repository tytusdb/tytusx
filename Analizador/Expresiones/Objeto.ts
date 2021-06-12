//import { Atributo } from "./Atributo";

class Objeto{
    identificador:string;
    identificador_cierre:string;
    texto:string;
    listaAtributos:Array<Atributo>;
    listaObjetos: Array<Objeto>;
    tipoEtiqueta: boolean;// true doble - false  simple 
   // entorno: TablaSimbolos;
    tipo:Tipo;
    linea: number;
    columna: number;


    constructor(id:string, texto:string, linea:number, columna:number, listaAtributos:Array<Atributo>, listaO:Array<Objeto>, identificador_cierre:string, tipoE:boolean){
        this.identificador = id;
        this.identificador_cierre = identificador_cierre;
        this.texto = texto;
      //  this.entorno = new TablaSimbolos(null);
        this.tipo=Tipo.OBJETO;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.linea = linea;
        this.columna = columna;
        this.tipoEtiqueta = tipoE;
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

    agregarTDS(entorno:TablaSimbolos, objeto:Objeto){
        
        const ts:TablaSimbolos = new TablaSimbolos([],entorno,this.identificador);
        tds_xml_persistente.push(ts);
        if(objeto.listaAtributos != undefined)
        {
            let atributo = new Atributo('','',0,0);            
            for(let i:number = 0; i < objeto.listaAtributos.length; i++){                
                 atributo.agregarTDS(ts, objeto.listaAtributos[i], objeto.identificador, this.tipoEtiqueta);                
            } 
        }

        if(objeto.texto != ""){       
                ts.setSimbolo(objeto.identificador, objeto.texto, objeto.tipo, objeto.identificador, this.tipoEtiqueta);                
        }
                        
        for(let i:number = 0; i < objeto.listaObjetos.length; i++){
            objeto.agregarTDS(ts, objeto.listaObjetos[i]);
        }
    }

    graficarTDS(str:[],objeto:Objeto){
        if(objeto.listaAtributos != undefined)
        {
            let atributo = new Atributo('','',0,0);            
            for(let i:number = 0; i < objeto.listaAtributos.length; i++){                
                 atributo.graficarTDS(str, objeto.listaAtributos[i], objeto.identificador);                
            } 
        }
        if(objeto.texto != ""){
            let cadena = "<tr>\n<th scope=\"row\">" + contador_tds + "</th>\n" +
          "<td scope=\"row\">" + objeto.identificador + "</td>\n" +
          "<td>" + objeto.texto + "</td>\n" +
          "<td>" + "Objeto" + "</td>\n" +
          "<td>" + objeto.identificador+ "</td>\n" +
          "<td>" + objeto.linea + "</td>\n" +
          "<td>" + objeto.columna + "</td>\n" +
          "</tr>\n";
            str.push(cadena);
            contador_tds++;
        }
        for(let i:number = 0; i < objeto.listaObjetos.length; i++){
            objeto.graficarTDS(str,objeto.listaObjetos[i]);            
        }
    }

    verificarEtiquetas(objeto:Objeto)
    {
        if(objeto.tipoEtiqueta)
        {
            //es una etiqueta doble
            if(objeto.identificador != objeto.identificador_cierre)
            {
                //Error Semantico etiquedas diferentes
            }
        }
        else
        {
            //Etiqueta Unica
        }
        for(let i:number = 0; i < objeto.listaObjetos.length; i++){
            objeto.verificarEtiquetas(objeto.listaObjetos[i]);
        } 
    }
} 

