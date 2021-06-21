import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Instruccion } from "src/clases/Interfaces.ts/Instruccion";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";


export default class Detener implements Instruccion{

    constructor(){

    }
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        return this;
    }
    recorrer(): Nodo {
        let padre = new Nodo("BREAK","");
        return padre;
    }

}
