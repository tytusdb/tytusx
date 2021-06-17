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

    constructor(id, param, linea, col) {
        this.identificador = id;
        this.parametros = param;
        this.columna = col;
        this.linea = linea;
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
      /*  if(ts.existe(this.identificador)){
            let ts_local=new TablaSimbolos(ts);

            let simbolo_funcion=ts.getSimbolo(this.identificador) as Funcion;
            
            if(this.asociacion(controlador,ts_local,simbolo_funcion,ts)){
                let r=simbolo_funcion.ejecutar(controlador,ts_local);
                controlador.ambito="Funcion: \n"+this.identificador;
                controlador.graficarEntornos(controlador,ts_local,"");
                if(r instanceof Detener || r instanceof Continuar){
                    let error = new Errores('Semantico', `Break y Continue solo son para ciclos`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`Error Semantico : Break y Continue solo son para ciclos. En la linea ${this.linea} y columan ${this.columna}`);
                    return null;
                }
                if( r !=null){

                    return r;
                }
            }

        }else{
            //Error semantico
        } */
    }
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
       /* if(ts.existe(this.identificador)){
            let ts_local=new TablaSimbolos(ts);

            let simbolo_funcion=ts.getSimbolo(this.identificador) as Funcion;
            
            if(this.asociacion(controlador,ts_local,simbolo_funcion,ts)){
                let r=simbolo_funcion.ejecutar(controlador,ts_local);
                controlador.ambito="Funcion: \n"+this.identificador;
                controlador.graficarEntornos(controlador,ts_local,"");
                if(r instanceof Detener || r instanceof Continuar){
                    let error = new Errores('Semantico', `Break y Continue solo son para ciclos`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`Error Semantico : Break y Continue solo son para ciclos. En la linea ${this.linea} y columan ${this.columna}`);
                
                    return null;
                }
                if( r !=null){
                    return r;
                }
            }

        }else{
            //Error semantico
        }*/
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
        if(this.parametros.length== simbolo_funcion.lista_params.length){
            for(let x=0; x<this.parametros.length;x++){
                let lista_simbolos = new Array();
                lista_simbolos.push(simbolo_funcion.lista_params[x]);
                let asignacion = new Declaracion(simbolo_funcion.lista_params[x].tipo,lista_simbolos,this.linea,this.columna) as Declaracion;
                asignacion.ejecutar(controlador,ts);
                ts.getSimbolo(simbolo_funcion.lista_params[x].identificador).setValor(this.parametros[x].getValor(controlador,ts_ant));
            }
            return true;
        }else{
            //Error semantico
        }
        return false;
    }

}