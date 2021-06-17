import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export default class Print implements Instruccion{

    public expresion : Expreciones;
    public linea : number;
    public columna : number;

    constructor(expresion, linea, columna) {
        this.expresion =expresion;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let valor = this.expresion.getValor(controlador,ts);
        controlador.append(valor);
        return null;
    }

    recorrer(): Nodo {
        let padre = new Nodo("Print",""); 
        padre.AddHijo(new Nodo("print",""));
        padre.AddHijo(new Nodo("(",""));

        let hijo = new Nodo("exp","");
        hijo.AddHijo(this.expresion.recorrer());
        
        padre.AddHijo(hijo);
        padre.AddHijo(new Nodo(")",""));
        
       return padre;
    }

}