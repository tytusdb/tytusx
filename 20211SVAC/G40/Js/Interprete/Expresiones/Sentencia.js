"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Sentencia = void 0;
var Sentencia = /** @class */ (function () {
    function Sentencia(tipo, expresion, linea, columna) {
        this.linea = linea;
        this.expresion = expresion;
        this.columna = columna;
        this.tipo = tipo;
    }
    Sentencia.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    Sentencia.prototype.getValorImplicito = function (objetos, arbol) {

        var objetosAux = [];
        var entornosAux = [];

        if(this.getTipo() == TipoSentencia.WHERE){

            var resultadoOperacion = this.expresion.getValorImplicito(objetos,[]);
            objetosAux = resultadoOperacion[1];
            entornosAux = resultadoOperacion[0];
            objetosGlobal = objetosAux;
            entornosGlobal = entornosAux;                                         
            return objetosAux;

        } else if(this.getTipo() == TipoSentencia.ORDERBY){

            objetos.sort(function(a, b) {
                var textA = a.texto.toUpperCase();
                var textB = b.texto.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            return objetos;
            

        } else if(this.getTipo() == TipoSentencia.ORDERBY_ELEMENTO){

            var id = this.expresion;

            objetos.sort(function(a, b) {
                var textA = a.getObjetos().find(x => x.identificador1 == id).texto.toUpperCase();
                var textB = b.getObjetos().find(x => x.identificador1 == id).texto.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            return objetos;           

        } else if(this.getTipo() == TipoSentencia.ORDERBY_ATRIBUTO){

            var id = this.expresion;

            objetos.sort(function(a, b) {
                var textA = a.getAtributos().find(x => x.identificador == id).valor.toUpperCase();
                var textB = b.getAtributos().find(x => x.identificador == id).valor.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            return objetos;  

        } else if(this.getTipo() == TipoSentencia.RETURN){

            console.log("RETURN");
            return objetos;

        } 

        return objetos

    };
    return Sentencia;
}());
//exports.Sentencia = Sentencia;
