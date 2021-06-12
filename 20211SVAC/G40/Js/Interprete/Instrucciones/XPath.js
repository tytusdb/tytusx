"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.XPath = void 0;
var XPath = /** @class */ (function () {
    function XPath(linea, columna, lista) {
        this.linea = linea;
        this.columna = columna;
        this.listaNodos = lista;
        this.global = null;
        this.temporal = null;
    }
    XPath.prototype.ejecutar = function (ent, arbol) {

        //este arreglo con el entorno global servira por si algun nodo tiene doble slash "//",".//" o "./"
        this.global = ObtenerObjetos([ent]);
        //"temporal" es arreglo con el entorno global es el punto de partida donde se iniciara a buscar
        //"temporal" ira variando dependiendo del retorno de cada NodoXPath
        this.temporal = ObtenerObjetos([ent]);

        for (var i=0; i < this.listaNodos.length;i++ ){
            this.listaNodos[i].setGlobal(this.global);
            //this.temporal = this.listaNodos[i].getValorImplicito(this.temporal,"");
            this.listaNodos[i].getValorImplicito(this.temporal,"");
        }
        

        return this.temporal;

    };

    

    return XPath;
}());
//exports.XPath = XPath;
