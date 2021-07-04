import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Errores from "../AST/Errores";

export default class Identificador implements Expreciones{

    public identificador : string;
    public linea : number;
    public columna : number;
    public valor:number;

    constructor(identifador, linea, columna,t) {
        this.identificador = identifador;
        this.linea = linea;
        this.columna = columna;
        this.valor=t;
    }


    getTipo(controlador: Controlador, ts: TablaSimbolos) {
       /* let existe_id = ts.getSimbolo(this.identificador);
        if(existe_id != null ){
            return existe_id.tipo.type;
        }*/
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let existe_id;
        let contador=1;
        for(let tssig of ts.sig){
            if(contador==controlador.posicionid){
                existe_id=tssig.sig.getSimbolo(this.identificador,this.valor);
            }
            contador++;
        }
        
        if(existe_id != null){
            return existe_id.valor; 
        }else{
           /* let error = new Errores('Semantico', `No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error Semantico : No existe la variable ${this.identificador} en la tabla de simbolos. En la linea ${this.linea} y columan ${this.columna}`);*/
            return null;
        }
    }
    recorrer(): Nodo {
        let padre = new Nodo("Identificador","");
        padre.AddHijo(new Nodo(this.identificador,""));
       return padre;
    }

}