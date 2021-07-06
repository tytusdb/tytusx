import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";


export default class funcionXquery extends Simbolos implements Instruccion{
    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;

    constructor(simbolo : number, tipo : Tipo, identificador : string, lista_params, metodo, lista_instrucciones, linea, columna) {
        super(simbolo,tipo,identificador,null,lista_params, metodo);
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna =columna;
    }

    agregarSimboloFuncion(controlador: Controlador, ts: TablaSimbolos){
        if(!(ts.existe(this.identificador))){
            ts.agregar(this.identificador,this);
        }else{
            //Error semantico
        }
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);
        for(let ins of this.lista_instrucciones){
            let r = ins.ejecutar(controlador,ts_local);
        }
        return null;
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}