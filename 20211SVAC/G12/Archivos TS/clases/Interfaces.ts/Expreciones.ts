import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";


export interface Expreciones {


    getTipo(controlador: Controlador, ts: TablaSimbolos);

    getValor(controlador: Controlador, ts: TablaSimbolos);

    recorrer(): Nodo;

}