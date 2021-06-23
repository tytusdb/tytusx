"use strict";


var TablaSimbolos = /** @class */ (function () {
    function TablaSimbolos() {
        this.entornoGlobal = new Entorno(null);
    }
    TablaSimbolos.prototype.LlenarTabla = function (entornoPadre, objetos) {
        var _this = this;
        objetos.forEach(function (element) {
            var entornoObjeto = new Entorno(null);
            if (element.listaAtributos.length > 0) {
                element.listaAtributos.forEach(function (atributo) {
                    var simbolo = new Simbolo(Tipo.ATRIBUTO, atributo.identificador, atributo.linea, atributo.columna, atributo.valor);
                    entornoObjeto.agregar(simbolo.indentificador, simbolo);
                });
            }
            if (element.listaObjetos.length > 0) {
                _this.LlenarTabla(entornoObjeto, element.listaObjetos);
            }
            element.entorno = entornoObjeto;
            var simbolo = new Simbolo(Tipo.STRUCT, element.identificador1, element.linea, element.columna, element);
            entornoPadre.agregar(simbolo.indentificador, simbolo);
        });
    };
    TablaSimbolos.prototype.setEntornoGlobal = function (entorno) {
        this.entornoGlobal = entorno;
    };
    return TablaSimbolos;
}());
