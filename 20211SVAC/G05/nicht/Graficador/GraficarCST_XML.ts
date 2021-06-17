import { NodoCST } from "./NodoCST";

export class GraficarCST_XML {
    private i:number;

    constructor(){
        this.i = 0;
    }

    public graficar(raiz:NodoCST){
        var codigo = "";
        this.i = 0;
        
        codigo += 'digraph SG {\n'
        codigo += this.recorrer(raiz);
        codigo += "}";

        return codigo;
    };

    private recorrer(nodo:NodoCST){
        var cadena = "";
        this.i++;
        var padre = "nodo" + this.i;

        var valor = nodo.valor;
        if (valor == '') {
            cadena += padre + '[label="'+ nodo.etiqueta +'"];\n'
        } else {
            if (valor.includes('\"')){
                console.log('entre');
                valor = valor.replace(/"/g, '');
            }
            cadena += padre + '[label="'+ nodo.etiqueta + '\\n' + valor +'"];\n';
        }
        
        for(var j=0; j<nodo.hijos.length; j++){
            var nodoHijo = nodo.hijos[j];
            cadena += padre + ' -> nodo' + (this.i+1) + ';\n';
            cadena += this.recorrer(nodoHijo); 
        }
        return cadena;
    };
}