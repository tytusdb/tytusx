import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export default class returnXquery implements Instruccion {
    public id:string;
    public expreciones;

    constructor(id,expreciones?){
        this.id=id;
        this.expreciones=expreciones;
    }
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}