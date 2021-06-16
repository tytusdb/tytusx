"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearArbolDot = void 0;
class CrearArbolDot{

    constructor(){
        this.id=1;
        this.contNodos=0;
        this.contNodos2=0;
    }

    
    recorrerHijos(Nodo){
        var cadena = "";
        this.contNodos++;
        var numHijos = Nodo.hijos.length;
        let Padre = "node"+this.contNodos;
        cadena += Padre + ";\n";
        var c=Nodo.valor.replace(/"/g, "");
        cadena += Padre + "[label = \"" + c +"\"];\n";
        if (numHijos > 0){
            for (var i = 0; i < numHijos; i++){
                this.contNodos2++;
                var Hijo = Nodo.hijos[i];
                let hoja = "nodeA"+this.contNodos2;                
                var cantidadHijos2 = Hijo.hijos.length;
                if (cantidadHijos2 > 0){
                    cadena += Padre + "->";
                    cadena += this.recorrerHijos(Hijo);
                }else{
                    cadena += Padre + "->" + hoja + ";\n";
                    var cambio=Hijo.valor.replace(/"/g, "");
                    cadena += hoja+"[label = \"" + cambio +"\"];\n";
                }
            }
        }    
        return cadena;
    }
    

    recorrerArbol(objeto){

    }

}

exports.CrearArbolDot = CrearArbolDot;