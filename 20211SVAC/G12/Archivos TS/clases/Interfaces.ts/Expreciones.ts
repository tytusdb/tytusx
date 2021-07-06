import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";


export interface Expreciones {

    lblTrue: string;
    lblFalse: string;
    
    getTipo(controlador: Controlador, ts: TablaSimbolos);

    getValor(controlador: Controlador, ts: TablaSimbolos);

    getvalor3d(controlador: Controlador, ts : TablaSimbolos);
 
    limpiar();
    
    recorrer(): Nodo;

}