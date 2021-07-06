const { fs } = require('fs');
import { Nodo } from './Node';

export class Grafica{
    public conte;

    constructor(){
        this.conte = "";
    }

    public Graficar(raiz: Nodo){
        this.conte = "";
        this.conte = this.conte + "digraph lista{ rankdir=TB;node[shape = box, style = filled, color = LightBlue];\n";
        this.Generar(raiz);
        this.conte = this.conte + "}";
    }

    public Generar(raiz: Nodo){
        if(raiz.valor == ''){
            this.conte = this.conte + "nodo" + raiz.id + "[label=\"" +raiz.nombre+ "\", shape=\"box\"]; \n";
        } else {
            this.conte = this.conte + "nodo" + raiz.id + "[label=\"" +raiz.valor+ "\", shape=\"box\"]; \n";
        }

        if(raiz.hijos == undefined){console.log("Grafica:  Hijos no esta definido! "); return;}
        if(raiz.hijos.length > 0){
            var childs = raiz.hijos;
            for(let i = 0; i < childs.length; i++){
                this.Generar(childs[i]);
                this.conte = this.conte + "\"nodo"+ raiz.id + "\" -> \"nodo" + childs[i].id + "\" \n";
            }
        }
    }

}