import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export default class Atributo implements Expreciones{

    public identificador:string;
    public valor:string;
    public linea: number;
    public columna: number;
    public posicion3d:string;
    public posicionId3d:string;
    lblTrue: string;
    lblFalse: string;

    constructor(id:string, valor:string, linea:number, columna:number){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    getvalor3d(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        return "atributo";
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        

    }
    limpiar() {
     }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
} 