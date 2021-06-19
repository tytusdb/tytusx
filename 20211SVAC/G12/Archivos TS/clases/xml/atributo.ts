import { ContentObserver } from "@angular/cdk/observers";
import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export default class Atributo implements Expreciones{

    public identificador:string;
    public valor:string;
    public linea: number;
    public columna: number;

    constructor(id:string, valor:string, linea:number, columna:number){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        return "atributo";
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        

    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
} 