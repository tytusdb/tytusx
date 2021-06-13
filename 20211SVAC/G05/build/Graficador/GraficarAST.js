"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraficarAST = void 0;
class GraficarAST {
    constructor() {
        this.cadenaFinal = "";
        this.i = 0;
        this.j = 0;
    }
    graficar(arbol) {
        try {
            this.cadenaFinal += "digraph G{ node[shape = \"oval\" , style=filled, color=\"yellow\"];\n\n";
            this.cadenaFinal += "L_Objetos;\n";
            arbol.forEach((objeto) => {
                let cadenaInterna = "";
                if (objeto.identificador1 == "?XML") {
                    //Acciones para el prologo
                }
                else {
                    this.cadenaFinal += 'L_Objetos->';
                    this.cadenaFinal += this.recorrer(objeto);
                }
                //this.cadenaFinal += cadenaInterna
            });
            this.cadenaFinal += "\n}";
            // console.log(this.cadenaFinal);
            var direccion = encodeURI("https://dreampuf.github.io/GraphvizOnline/#" + this.cadenaFinal);
            window.open(direccion, '_blank');
        }
        catch (error) {
        }
    }
    recorrer(nodo) {
        let cadena = "";
        this.i++;
        let padre = "nodo" + this.i;
        //Con esta linea agregamos el objeto anterior al padre
        cadena += padre + ";\n";
        cadena += padre + "[label = \"" + nodo.identificador1 + "\"];\n";
        if (nodo.listaAtributos.length > 0) {
            nodo.listaAtributos.forEach((atributo) => {
                this.j++;
                let atrib = "nodoA" + this.j;
                //Acciones para graficara tributos a objeto
                cadena += padre + "->" + atrib + ";\n";
                cadena += atrib + "[label =\"" + atributo.identificador + "=" + atributo.valor.replace(/['"]+/g, '') + "\"];\n";
            });
        }
        //Verificamos si tiene texto para agregarselo
        if (nodo.texto != '') {
            this.i++;
            let nodoTexto = "nodoT" + this.i;
            cadena += padre + "->" + nodoTexto + ";\n";
            cadena += nodoTexto + "[label =\"" + nodo.texto + "\"];\n";
        }
        if (nodo.listaObjetos.length > 0) {
            nodo.listaObjetos.forEach((objetoHijo) => {
                //Con esta linea agregamos el objeto anterior al padre
                cadena += padre + "->";
                cadena += this.recorrer(objetoHijo);
            });
        }
        return cadena;
    }
}
exports.GraficarAST = GraficarAST;
