import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";

export default class Funcion extends Simbolos implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;

    constructor(simbolo : number, tipo : Tipo, identificador : string, lista_params, metodo, lista_instrucciones, linea, columna) {
        super(simbolo,tipo,identificador,null,lista_params, metodo);
        console.log(this.lista_params);
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna =columna;
    }

    agregarSimboloFuncion(controlador: Controlador, ts: TablaSimbolos){
        if(!(ts.existe(this.identificador))){
            ts.agregar2(this.identificador,this);
        }else{
            //Error semantico
        }
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);
        console.log("intruccion a");
        for(let ins of this.lista_instrucciones){
            
            console.log(ins);
            let r = ins.ejecutar(controlador,ts_local);
           
        }
       /* controlador.ambito="Funcion: \n"+this.identificador;
        controlador.graficarEntornos(controlador,ts_local,"");*/
        return null;
    }

    recorrer(): Nodo {
        let padre = new Nodo("Funcion",""); 
        padre.AddHijo(new Nodo(this.tipo.stype,""));
        padre.AddHijo(new Nodo(this.identificador,""));

        padre.AddHijo(new Nodo("(",""));

        for(let x=0;x<this.lista_params.length;x++){
            let hijo = new Nodo("Identificador","");
            hijo.AddHijo(new Nodo(this.lista_params[x].identificador,""));
            padre.AddHijo(hijo);
        }

        padre.AddHijo(new Nodo(")",""));

        padre.AddHijo(new Nodo("{",""));

        let hijo_instrucciones = new Nodo("Instrucciones","");
        for(let inst of this.lista_instrucciones){
            hijo_instrucciones.AddHijo(inst.recorrer());
        }
        
        padre.AddHijo(hijo_instrucciones);
        padre.AddHijo(new Nodo("}",""));
        
       return padre;
    }

}