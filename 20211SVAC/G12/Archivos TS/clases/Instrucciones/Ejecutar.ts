import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Llamada from "./Llamada";


export default class Ejecutar implements Instruccion{


    public llamada : Llamada;
    public linea;
    public column;
    
    constructor(llamada, linea, col) {
        this.llamada = llamada;
        this.linea = linea;
        this.column = col;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        this.llamada.ejecutar(controlador,ts);
    }

    recorrer(): Nodo {
        let padre = new Nodo("exec",""); 
        padre.AddHijo(new Nodo(this.llamada.identificador,""));
        padre.AddHijo(new Nodo("(",""));

        for(let x=0; x<this.llamada.parametros.length;x++){
            let hijo = new Nodo("Exp","");
            hijo.AddHijo(this.llamada.parametros[x].recorrer());
            padre.AddHijo(hijo);
        }
        //TODO: AGREGAR NODOS HIJOS DE PARAMETROS
        //a
        padre.AddHijo(new Nodo(")",""));
        return padre;
    }

}