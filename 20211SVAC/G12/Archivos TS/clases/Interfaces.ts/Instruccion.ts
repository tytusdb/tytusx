import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";



export interface Instruccion {
    
    ejecutar(controlador: Controlador, ts: TablaSimbolos);

    recorrer(): Nodo;
}