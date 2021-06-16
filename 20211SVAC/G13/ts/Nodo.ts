/** Nodo para grafo/arbol CST */
import { FilaGrammar } from './FilaGrammar';

export class Nodo{

    node_id: number;
    node_name: string;
    node_content: string;    
    node_production?: FilaGrammar;
    node_list: Array<Nodo>;

    /**
     * Constructor de Nodo para estructura del CST
     * @param node_id numero de nodo
     * @param name nombre del nodo
     * @param content contenido del nodo
     * @param list lista de nodos hijos 
     */
    constructor(id:number,name: string,list?: Array<Nodo>, content?:string){
        this.node_id = id;
        this.node_name = name;
        this.node_content = (content!=undefined)?content:'';
        this.node_list = (list!=undefined)?list:[];
    }

    /**
     * Agrega un nodo a lista de nodos
     * @param nodo void
     */
    addNodo(nodo: Nodo){
        if(nodo!=undefined){
            this.node_list.push(nodo);
        }
    }

    /**
     * Devuleve cadena con las propiedades del nodo
     * @returns string
     */
    toString():string{
        let cadena = 'Nodo:'+this.node_name+' Contenido:'+this.node_content;
        return cadena;
    }

    /**
     * Setea el objeto de produccion para un nodo
     * @param produ void
     */
    setProdu(produ: FilaGrammar){
        this.node_production = produ;
    }

    /**
     * Metodo que obtiene arreglo con objetos de produccion de gramatica y de nodos sus hijos
     * @returns FilaGrammar[]
     */
    getGrammar():FilaGrammar[]{

        let resultado = new Array<FilaGrammar>();
        if(this.node_production != undefined){

            resultado.push(this.node_production);
            let size = this.node_list.length;
            for(let i = 0; i<size ;i++){
                if(this.node_list[i]!= undefined){
                    resultado = resultado.concat(this.node_list[i].getGrammar());
                }
            }
            
        }
        return resultado;
    }

}