import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";
import { retorno } from "./retorno";


export default class Primitivo implements Expreciones{

    public primitivo : any;
    public linea: number;
    public columan: number;
    public nodo: number;
    lblTrue: string;
    lblFalse: string;

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

    
    public getvalor3d(controlador: Controlador, ts: TablaSimbolos) {
        let valor= this.getValor(controlador,ts);
        const generator = controlador.generador;
        if(typeof valor== 'number'){
            return new retorno(this.primitivo,false,new Tipo("DOBLE"));
        }else if (typeof valor=='string'){
            const temp = generator.newTemporal();
            generator.genAsignacion(temp, 'h');
            for (let i = 0; i < valor.length; i++) {
                generator.genSetHeap('h', valor.charCodeAt(i));
                generator.avanzarHeap();
            }
            generator.genSetHeap('h', '-1');
            generator.avanzarHeap();
        return new retorno(temp, true, new Tipo("STRING"));
        }else if (typeof valor== 'boolean'){
            return tipo.BOOLEANO;
        }
    }

    limpiar() {
     }

    
    recorrer(): Nodo {
        let padre = new Nodo("Primitivo","");
        padre.AddHijo(new Nodo(this.primitivo.toString(),""));
       return padre;
    }
   
}