import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Primitivo implements Expreciones{

    public primitivo : any;
    public linea: number;
    public columan: number;
    public nodo: number;

    constructor (primitivo: any,line: number, columna: number,nodo:number){
        
        this.primitivo=primitivo;
        this.linea=line;
        this.columan=columna;
        this.nodo = nodo;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        let valor= this.getValor(controlador,ts);
        if(typeof valor== 'number'){
            return tipo.DOBLE;
        }else if (typeof valor=='string'){
            return tipo.CADENA;
        }else if (typeof valor== 'boolean'){
            return tipo.BOOLEANO;
        }
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        return this.primitivo;
    }
    
    recorrer(): Nodo {
        let padre = new Nodo("Primitivo","");
        padre.AddHijo(new Nodo(this.primitivo.toString(),""));
       return padre;
    }
   
}