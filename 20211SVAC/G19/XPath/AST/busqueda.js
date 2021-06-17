"use strict";
var busqueda = /** @class */ (function () {
    function busqueda(tabla) {
        this.bandera = false;
        this.x = 0;
        this.cadenaDouble = "";
        //  this.list_nodos=new Array();
        this.tabla = tabla;
        this.query = [];
    }
    busqueda.prototype.prueba = function (nodito, tabla) {
        console.log(nodito.name);
        if (tabla != undefined) {
        }
    };
    busqueda.prototype.RecorrerAst = function (padre) {
        if (padre.name != null) {
            for (var n in padre.children) { //si el nodo padre tiene hijos
                this.RecorrerChildren(padre.children[n], this.tabla);
            }
            console.log(this.query);
        }
        this.search(this.tabla, 0, false);
    };
    busqueda.prototype.RecorrerChildren = function (actual, tablaActual) {
        var cadena = "";
        if (actual.children != undefined) { //tiene hijos
            for (var child in actual.children) {
                cadena = "";
                if (actual.children[child].children == undefined)
                    this.query.push(actual.children[child]);
                this.RecorrerChildren(actual.children[child], tablaActual);
            }
        }
        return cadena;
    };
    busqueda.prototype.search = function (tablaActual, x, imprimir) {
        var cadena = "";
        if (tablaActual != undefined) {
            for (var t = 0; t < tablaActual.length; t++) {
                var e = tablaActual[t];
                while (x < this.query.length) {
                    if (this.query[x] == "/") {
                        x++;
                    }
                    else if (this.query[x] == "//") {
                        x++;
                        if (this.query[x] == e.id) {
                            cadena = this.recorrerTablaId(this.query[x], tablaActual);
                        }
                        else {
                            var arr = this.doubleSlash(x, e, e.tablaEntornos);
                            cadena = arr[0];
                            var etemp = arr[1];
                            x++;
                            for (var t_1 = 0; t_1 < etemp.length; t_1++) {
                                this.search(etemp.tablaEntornos, x + 1, imprimir);
                            }
                        }
                    }
                    else {
                        if (this.query[x] == e.id) {
                            cadena = this.recorrerTablaId(this.query[x], tablaActual);
                            if (x + 1 == this.query.length && imprimir == false) {
                                console.log(cadena);
                                imprimir = true;
                            }
                            this.search(e.tablaEntornos, x + 1, imprimir);
                            break;
                        }
                        else {
                            if (t + 1 < tablaActual.length) {
                                break;
                            }
                            else {
                                x++;
                            }
                        }
                    }
                }
            }
        }
    };
    busqueda.prototype.doubleSlash = function (x, e, tablaActual) {
        var cadena = "";
        var etemp;
        if (tablaActual != undefined) {
            for (var t = 0; t < tablaActual.length; t++)
                var e = tablaActual[t];
            if (this.query[x] == e.id) {
                etemp = e;
                cadena = this.recorrerTablaId(this.query[x], tablaActual);
                // break;
            }
            else {
                this.doubleSlash(x, e, e.tablaEntornos);
            }
        }
        return [cadena, etemp];
    };
    busqueda.prototype.recorrerTablaId = function (objeto, tablaActual) {
        var _this = this;
        var cadena = "";
        tablaActual.forEach(function (element) {
            if (element.id == objeto) { //encontró el entorno
                if (element.id == element.EtiquetaCierre) {
                    cadena += "<" + element.id + ">\n ";
                    if (element.tablaSimbolos.length != 0) { // SI EL ELEMENTO TIENE MAS ENTORNOS EN SU INTERIOR
                        cadena += _this.recorrerAttrb(element.tablaSimbolos);
                    }
                    else {
                        if (element.texto != "")
                            cadena += element.texto;
                        else
                            cadena += _this.getContenido(element.tablaEntornos);
                        cadena += "</" + element.EtiquetaCierre + ">\n";
                    }
                }
                else {
                    cadena += "<" + element.id;
                    if (element.tablaSimbolos.length != 0) { // SI EL ELEMENTO TIENE MAS ENTORNOS EN SU INTERIOR
                        cadena += _this.recorrerAttrb(element.tablaSimbolos) + "/>";
                    }
                    else
                        cadena += _this.getContenido(element.tablaEntornos) + "/>";
                }
            }
        });
        return cadena;
    };
    busqueda.prototype.getContenido = function (tablaActual) {
        var _this = this;
        var cadena = "";
        if (tablaActual != undefined) {
            tablaActual.forEach(function (element) {
                if (element.id == element.EtiquetaCierre) {
                    cadena += "<" + element.id + "> ";
                    if (element.tablaSimbolos.length != 0) { // SI EL ELEMENTO TIENE MAS ENTORNOS EN SU INTERIOR
                        cadena += _this.recorrerAttrb(element.tablaSimbolos);
                    }
                    else {
                        if (element.texto != "") {
                            cadena += element.texto;
                        }
                        else
                            cadena += _this.getContenido(element.tablaEntornos);
                    }
                    cadena += "</" + element.EtiquetaCierre + ">\n";
                }
                else {
                    cadena += "<" + element.id;
                    if (element.tablaSimbolos.length != 0) { // SI EL ELEMENTO TIENE MAS ENTORNOS EN SU INTERIOR
                        cadena += _this.recorrerAttrb(element.tablaSimbolos);
                    }
                    else
                        cadena += _this.getContenido(element.tablaEntornos);
                }
            });
        }
        return cadena;
    };
    busqueda.prototype.recorrerAttrb = function (tabla) {
        var cadena = " ";
        tabla.forEach(function (element) {
            cadena += element.id + "=" + element.valor + " ";
        });
        cadena += " ";
        return cadena;
    };
    busqueda.prototype.getId = function () {
    };
    return busqueda;
}());
//# sourceMappingURL=busqueda.js.map