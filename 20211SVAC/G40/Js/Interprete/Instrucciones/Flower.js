"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Flower = void 0;
var Flower = /** @class */ (function () {
    function Flower(linea, columna, id, funcion, sentencias) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.funcionXPath = funcion;
        this.sentencias = sentencias;
        this.resultadoXPath = null;
        this.resultadoSentencia = null;
        this.global = null;
        this.temporal = null;
        this.resultadoAux = null;
        this.objetos = [];
    }
    Flower.prototype.ejecutar = function (ent, arbol) {

        objetosGlobal = ObtenerObjetos(ent);
        entornosGlobal = [ent];
        //este arreglo con el entorno global servira por si algun nodo tiene doble slash "//",".//" o "./"
        this.global = [ent];
        //"temporal" es arreglo con el entorno global es el punto de partida donde se iniciara a buscar
        //"temporal" ira variando dependiendo del retorno de cada NodoXPath
        this.temporal = [ent];

        this.resultadoXPath = this.funcionXPath.ejecutar(ent,arbol);
        this.resultadoSentencia = this.resultadoXPath;

        for (var i=0; i < this.sentencias.length;i++ ){

            this.resultadoAux = this.sentencias[i].getValorImplicito(this.resultadoSentencia,"");
            this.resultadoSentencia = this.resultadoAux;

        }

        return this.resultadoAux;
       
    };
    return Flower;
}());
//exports.Flower = Flower;