"use strict";


var TablaSimbolosXML = /** @class */ (function () {
    function TablaSimbolosXML() {
        this.entornoGlobal = new EntornoXML(null);
    }
    TablaSimbolosXML.prototype.LlenarTabla = function (entornoPadre, objetos) {
        var _this = this;
        
        objetos.forEach(function (element) {
            var entornoObjeto = new EntornoXML(null);
            entornoObjeto.setID(IDentorno);
            IDentorno++;
            element.SetearID(IDobj);
            IDobj++;
            if (element.listaAtributos.length > 0) {
                element.listaAtributos.forEach(function (atributo) {
                    var simbolo = new Simbolo(Tipo.ATRIBUTO, atributo.identificador, atributo.linea, atributo.columna, atributo.valor);
                    entornoObjeto.agregar(simbolo);
                });
            }
            if (element.listaObjetos.length > 0) {
                _this.LlenarTabla(entornoObjeto, element.listaObjetos);
            }
            
            element.entorno = entornoObjeto;
            var simbolo = new Simbolo(Tipo.STRUCT, element.identificador1, element.linea, element.columna, element);
            entornoPadre.agregar(simbolo);
            entornoObjeto.setAnterior(entornoPadre);
        });
    };
    TablaSimbolosXML.prototype.setEntornoGlobal = function (entorno) {
        this.entornoGlobal = entorno;
    };
    TablaSimbolosXML.prototype.getEntornoGlobal = function () {
        return this.entornoGlobal;
    };
    return TablaSimbolosXML;
}());
