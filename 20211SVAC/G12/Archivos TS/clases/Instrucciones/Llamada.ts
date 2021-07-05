import { TOUCH_BUFFER_MS } from "@angular/cdk/a11y";
import Errores from "../AST/Errores";
import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Declaracion from "./Declaracion";
import Funcion from "./Funcion";
import Detener from "./SentenciaTransferencia/Break";
import Continuar from "./SentenciaTransferencia/continuar";
import retornar from "./SentenciaTransferencia/retornar";


export default class Llamada implements Instruccion, Expreciones{

    public identificador : string;
    public parametros : Array<Expreciones>;
    public linea : number;
    public columna : number;

    lblTrue: string;
    lblFalse: string;
    constructor(id, param, linea, col) {
        this.identificador = id;
        this.parametros = param;
        this.columna = col;
        this.linea = linea;
    }
    limpiar() {
        throw new Error("Method not implemented.");
    }
    getvalor3d(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    

    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        let valor = this.getValor(controlador,ts);
        
        if(typeof valor == 'number'){
            return tipo.DOBLE;
        }else if(typeof valor == 'string'){
            return tipo.CADENA;
        }else if(typeof valor == 'boolean'){
            return tipo.BOOLEANO;
        }
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        if(ts.existe(this.identificador)){
            let ts_local=new TablaSimbolos(ts);

            let simbolo_funcion=ts.getSimbolo2(this.identificador) as Funcion;
            
            if(this.asociacion(controlador,ts_local,simbolo_funcion,ts)){
                console.log("entre aqui11");
                console.log(simbolo_funcion);
                let r=simbolo_funcion.ejecutar(controlador,ts_local);
               /* controlador.ambito="Funcion: \n"+this.identificador;
                controlador.graficarEntornos(controlador,ts_local,"");*/
            }

        }else{
            //Error semantico
        }
    }
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        if(ts.existe(this.identificador)){
            let ts_local=new TablaSimbolos(ts);

            let simbolo_funcion=ts.getSimbolo2(this.identificador) as Funcion;
            
            if(this.asociacion(controlador,ts_local,simbolo_funcion,ts)){
                console.log("entre aqui11");
                console.log(simbolo_funcion);
                let r=simbolo_funcion.ejecutar(controlador,ts_local);
               /* controlador.ambito="Funcion: \n"+this.identificador;
                controlador.graficarEntornos(controlador,ts_local,"");*/
            }

        }else{
            //Error semantico
        }
    }
    recorrer(): Nodo {

        let padre = new Nodo("Llamada",""); 
        padre.AddHijo(new Nodo(this.identificador,""));
        padre.AddHijo(new Nodo("(",""));

        for(let x=0; x<this.parametros.length;x++){
            let hijo = new Nodo("Exp","");
            hijo.AddHijo(this.parametros[x].recorrer());
            padre.AddHijo(hijo);
        }
        //TODO: AGREGAR NODOS HIJOS DE PARAMETROS
        
        padre.AddHijo(new Nodo(")",""));
        return padre;
    }

    asociacion(controlador: Controlador , ts: TablaSimbolos , simbolo_funcion: Funcion,ts_ant: TablaSimbolos){
        console.log("aqui estoy");
        console.log(simbolo_funcion.lista_params);
        console.log(this.parametros);
        if(this.parametros.length== simbolo_funcion.lista_params.length){
            for(let x=0; x<this.parametros.length;x++){
                let asignacion = new Declaracion(simbolo_funcion.lista_params[x].tipo,simbolo_funcion.lista_params[x],this.linea,this.columna) as Declaracion;
                asignacion.ejecutar(controlador,ts);
                ts.getSimbolo2(simbolo_funcion.lista_params[x].identificador).setValor(this.parametros[x].getValor(controlador,ts_ant));
            }
            console.log("no se por que no paso de aqui");
            return true;
        }else{
            //Error semantico
        }
        return false;
    }

}