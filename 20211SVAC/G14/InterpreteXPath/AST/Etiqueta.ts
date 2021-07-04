
import { Nodo } from "./Nodo";
import NodoAST from "./NodoAST";

export class Etiqueta extends Nodo{
    identificador:string;
    fila: number;
    columna: number;
    etiqueta: any;
    valor:any;

    constructor(id:string, fila:number, columna:number, etiqueta:Etiqueta, valor:any){
        super( fila, columna)
        this.identificador = id;
        this.fila = fila;
        this.columna = columna;
        this.etiqueta = etiqueta;
        this.valor = valor;
    }
    obtenerNodos(): Array<NodoAST> {
        var nodo;
        if( this.identificador == "atributo"){
            nodo = new NodoAST("LISTA_ATRIBUTOS");
        }else{
            nodo = new NodoAST("LISTA_OBJETOS")
        }

        if(this.etiqueta!=null){
            var eti = this.etiqueta.obtenerNodos()[0]
            nodo.addHijo(eti);
        }
        if(this.valor != null){
            nodo.addHijo(this.valor.obtenerNodos()[0])
        }
        
        return [nodo, nodo];
    }

}