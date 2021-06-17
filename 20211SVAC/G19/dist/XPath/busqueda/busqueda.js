"use strict";
var busqueda = /** @class */ (function () {
    function busqueda(tabla) {
        //  this.list_nodos=new Array();
        this.tabla = tabla;
    }
    busqueda.prototype.RecorrerAst = function (padre) {
        if (padre.name != null) {
            console.log(padre.name);
            for (var n in padre.children) { //si el nodo padre tiene hijos
                this.RecorrerChildren(padre.children[n], this.tabla);
            }
        }
    };
    busqueda.prototype.RecorrerChildren = function (actual, tablaActual) {
        if (actual.children != undefined) { //tiene hijos
            console.log(actual.name);
            for (var child in actual.children) {
                if (actual.children[child].children != undefined)
                    console.log(actual.children[child].name);
                else {
                    console.log(actual.children[child]);
                    this.Busqueda(actual.children[child], tablaActual);
                }
                this.RecorrerChildren(actual.children[child], tablaActual);
            }
        }
    };
    busqueda.prototype.Busqueda = function (objeto, tablaActual) {
        if (tabla != undefined) {
            if (objeto.name == "/") { //si es /|//|id
                // this.getNodos(tabla, objeto)
            }
            else if (objeto.name == "//") {
            }
            else {
                console.log("es id");
                this.recorrerTablaId(objeto.name, this.tabla);
            }
        }
    };
    busqueda.prototype.getNodos = function (tablatabla, objeto) {
        /* switch (objeto.) {
             case :
                 
                 break;
         
             default:
                 break;
         }*/
    };
    busqueda.prototype.recorrerTablaId = function (id, tablaActual) {
        var _this = this;
        tablaActual.forEach(function (element) {
            if (element.id == id) {
                if (element.id == element.EtiquetaCierre) {
                    if (element.tablaSimbolos.length != 0) {
                    }
                    else {
                        if (element.texto != "") {
                            console.log("<" + element.id + ">" + element.texto + "</" + element.EtiquetaCierre + ">");
                        }
                    }
                }
                else {
                }
                llenarElementos(element.tablaEntornos);
                // console.log(element.tablaEntornos)
            }
            else {
                _this.recorrerTablaId(id, element.tablaEntornos);
            }
        });
    };
    busqueda.prototype.getId = function () {
    };
    return busqueda;
}());
//# sourceMappingURL=busqueda.js.map