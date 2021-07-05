"use strict";

var FlowerIf = /** @class */ (function () {
    function FlowerIf(linea, columna, id, funcion, xflowerif) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.funcionXPath = funcion;
        this.xflowerif = xflowerif;
        this.resultadoXPath = null;
        this.resultadoIf = null;
        this.global = null;
        this.temporal = null;
        this.resultadoAux = null;
        this.objetos = [];
        this.tipo = TipoXInstruccion.XFLOWERIF;
    }
    FlowerIf.prototype.ejecutar = function (ent, arbol) {

        objetosGlobal = ObtenerObjetos(ent);
        entornosGlobal = [ent];
        //este arreglo con el entorno global servira por si algun nodo tiene doble slash "//",".//" o "./"
        this.global = [ent];
        //"temporal" es arreglo con el entorno global es el punto de partida donde se iniciara a buscar
        //"temporal" ira variando dependiendo del retorno de cada NodoXPath
        this.temporal = [ent];

        this.resultadoXPath = this.funcionXPath.ejecutar(ent,arbol);
        this.resultadoSentencia = this.resultadoXPath;

        this.resultadoAux = this.xflowerif.getValorImplicito(this.resultadoSentencia,"");

        return this.resultadoAux;
       
    };

    FlowerIf.prototype.getTipo = function (){
        return this.tipo;
    };
    return FlowerIf;
}());
