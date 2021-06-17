"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consulta = void 0;
var Tipo_1 = require("../AST/Tipo");
var Nodo_1 = require("./Nodo");
var Consulta = /** @class */ (function () {
    function Consulta(listaNodos, linea, columna) {
        this.listaNodos = listaNodos;
        this.linea = linea;
        this.columna = columna;
    }
    Consulta.prototype.ToString = function () {
        var cad = "";
        this.listaNodos.forEach(function (nodo) {
            cad += "/" + nodo.getNombre();
            if (nodo.getPredicado() != undefined) {
                cad += "[" + nodo.getPredicado() + "]";
            }
        });
        return cad;
    };
    Consulta.prototype.ejecutar = function (global) {
        //Recorrer lista de nodos
        return this.obtenerSalida(0, global, null);
    };
    Consulta.prototype.obtenerSalida = function (pos, ent, elemAux) {
        var _this = this;
        var salida = "";
        var actualNode = this.listaNodos[pos];
        switch (actualNode.getTipo()) {
            case Nodo_1.TipoNodo.IDENTIFIER:
                //Buscar si este id existe en el entorno.
                ent.tsimbolos.forEach(function (e) {
                    //Ver si este simbolo es igual a actualNode.getNombre()
                    var elem = e.valor;
                    if (elem.getNombre() === actualNode.getNombre()) {
                        //Si existe este simbolo en el entorno.
                        //1. Revisar si es el ultimo nodo a buscar
                        if (pos + 1 < _this.listaNodos.length) {
                            //Aun existen mas nodos en la consulta, ir a buscar eso
                            salida += _this.obtenerSalida(pos + 1, elem.valor, elem);
                        }
                        else {
                            //Es el ultimo nodo en la consulta, escribir su informacion de objeto
                            if (elem.getTipo() === Tipo_1.Tipo.STRING) {
                                salida += _this.concatHijoTexto(elem, 0);
                            }
                            else {
                                salida += _this.getConsultaObjeto(elem, 0);
                            }
                        }
                    }
                    else if (!actualNode.isFromRoot()) {
                        //Este nodo es de tipo //, entonces entrar a buscar de todos modos.
                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                            salida += _this.obtenerSalida(pos, elem.valor, elem);
                        }
                    }
                });
                break;
            case Nodo_1.TipoNodo.ATRIBUTO:
                //Ver si es @algo o @*
                if (actualNode.getNombre() === "*") {
                    //Si es asterisco, obtener todos los atributos del entorno actual
                    if (actualNode.isFromRoot()) {
                        //Solo es /, buscar solo en el entorno actual todos los atributos.
                        ent.tsimbolos.forEach(function (e) {
                            var elem = e.valor;
                            if (elem.getTipo() === Tipo_1.Tipo.ATRIBUTO) {
                                salida += elem.valor + "\n";
                            }
                        });
                    }
                    else {
                        //Es //, buscar en el entorno actual y los entornos hijos.
                        ent.tsimbolos.forEach(function (e) {
                            var elem = e.valor;
                            if (elem.getTipo() === Tipo_1.Tipo.ATRIBUTO) {
                                salida += elem.valor + "\n";
                            }
                            else if (elem.getTipo() === Tipo_1.Tipo.STRING) {
                                /*
                                  FALTAN ETIQUETAS CON TEXTO Y ATRIBUTO EJEMPLO:
                                    <title atributorandom="hola"> hola texto </title>
                                */
                            }
                            else if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                                //Ir a buscar atributos al entorno de esta etiqueta
                                salida += _this.getConsultaAtributos(elem, 0, "*");
                            }
                        });
                    }
                }
                else {
                    //El atributo tiene identificador, buscar solo los atributos que tienen este nombre.
                    if (actualNode.isFromRoot()) {
                        //Solo es /, buscar solo en el entorno actual todos los atributos.
                        ent.tsimbolos.forEach(function (e) {
                            var elem = e.valor;
                            if (elem.getTipo() === Tipo_1.Tipo.ATRIBUTO) {
                                //Concatenar solo si los nombres son iguales.
                                if (actualNode.getNombre() === elem.getNombre()) {
                                    salida += elem.valor + "\n";
                                }
                            }
                        });
                    }
                    else {
                        //Es //, buscar en el entorno actual y los entornos hijos.
                        ent.tsimbolos.forEach(function (e) {
                            var elem = e.valor;
                            if (elem.getTipo() === Tipo_1.Tipo.ATRIBUTO) {
                                if (actualNode.getNombre() === elem.getNombre()) {
                                    salida += elem.valor + "\n";
                                }
                            }
                            else if (elem.getTipo() === Tipo_1.Tipo.STRING) {
                                /*
                                  FALTAN ETIQUETAS CON TEXTO Y ATRIBUTO EJEMPLO:
                                    <title atributorandom="hola"> hola texto </title>
                                */
                            }
                            else if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                                //Ir a buscar atributos al entorno de esta etiqueta
                                salida += _this.getConsultaAtributos(elem, 0, actualNode.getNombre());
                            }
                        });
                    }
                }
                break;
            case Nodo_1.TipoNodo.DOTDOT:
                /*
                **
                **  .. (DOTDOT) ESTA BUGGEADO :(
                **
                */
                //Ver si es el ultimo o no
                if (pos + 1 < this.listaNodos.length) {
                    //Aun hay mas nodos.
                    //Avanzar en la lista de nodos (pos+1) pero regresar al entorno anterior (padre)
                    salida += this.obtenerSalida(pos + 1, ent.padre, elemAux);
                }
                else {
                    //Es el ultimo nodo, entonces obtener consulta sobre este entorno
                    var father = elemAux.valor.padre;
                    console.log("FATHER: ", father);
                    salida += "<" + father.nombre + ">\n";
                    father.tsimbolos.forEach(function (e) {
                        //Para cada simbolo en el entorno anterior, obtener su contenido
                        var elem = e.valor;
                        if (elem.getTipo() === Tipo_1.Tipo.STRING) {
                            //Esta etiqueta contiene solo texto.
                            salida += _this.concatHijoTexto(elem, 1);
                        }
                        else if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                            salida += _this.getConsultaObjeto(elem, 1);
                        }
                    });
                    salida += "</" + father.nombre + ">\n";
                }
                break;
            case Nodo_1.TipoNodo.DOT:
                //Ver si es el ultimo o no
                if (pos + 1 < this.listaNodos.length) {
                    //Aun hay mas nodos.
                    //Avanzar en la lista de nodos (pos+1) pero mantener el mismo entorno
                    salida += this.obtenerSalida(pos + 1, ent, elemAux);
                }
                else {
                    //Es el ultimo nodo, entonces obtener consulta sobre este entorno
                    if (elemAux.getTipo() === Tipo_1.Tipo.STRING) {
                        //Esta etiqueta contiene solo texto.
                        salida += this.concatHijoTexto(elemAux, 0);
                    }
                    else if (elemAux.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                        salida += this.getConsultaObjeto(elemAux, 0);
                    }
                }
                break;
            case Nodo_1.TipoNodo.ASTERISCO:
                //* Obtener Todo
                //1. Ver si existen mas nodos
                if (pos + 1 < this.listaNodos.length) {
                    //Aun hay mas nodos.
                    ent.tsimbolos.forEach(function (e) {
                        if (e.valor.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                            salida += _this.obtenerSalida(pos + 1, e.valor.valor, elemAux);
                        }
                    });
                }
                else {
                    //Es el ultimo nodo.
                    ent.tsimbolos.forEach(function (e) {
                        var elem = e.valor;
                        if (elem.getTipo() === Tipo_1.Tipo.STRING) {
                            salida += _this.concatHijoTexto(elem, 0);
                        }
                        else if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                            salida += _this.getConsultaObjeto(elem, 0);
                        }
                    });
                }
                break;
            case Nodo_1.TipoNodo.FUNCION:
                break;
            case Nodo_1.TipoNodo.AXIS:
                return "Implementacion de Axis no existe:'v";
                break;
        }
        return salida;
    };
    Consulta.prototype.addTabs = function (nTabs) {
        var tabs = "";
        for (var i = 0; i < nTabs; i++) {
            tabs += "    ";
        }
        return tabs;
    };
    Consulta.prototype.getConsultaAsterisco = function (ent, pos, nTabs) {
        var salida = this.addTabs(nTabs) + "";
    };
    Consulta.prototype.getConsultaAtributos = function (elem, nTabs, atrBuscar) {
        var _this = this;
        var salida = "";
        var hijosList = elem.valor.tsimbolos;
        hijosList.forEach(function (e) {
            var son = e.valor;
            if (son.getTipo() === Tipo_1.Tipo.ATRIBUTO) {
                //Es atributo, concatenar a la salida
                if (atrBuscar === "*") {
                    salida += son.valor + "\n";
                }
                else if (atrBuscar === son.getNombre()) {
                    salida += son.valor + "\n";
                }
            }
            if (son.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                salida += _this.getConsultaAtributos(son, nTabs, atrBuscar);
            }
        });
        return salida;
    };
    Consulta.prototype.getConsultaObjeto = function (elem, nTabs) {
        var _this = this;
        var salida = this.addTabs(nTabs) + "";
        //Obtener todos los que se llaman nombre y sus hijos.
        //1. Para cada elemento escribir su etiqueta, atributos e hijos o texto
        //2 Escribir nombre:
        salida += "<" + elem.nombre;
        var hijosList = elem.valor.tsimbolos;
        //3. Ver si este elemento tiene Atributos
        hijosList.forEach(function (atr) {
            var atributo = atr.valor;
            //3.1 Ver si el hijo es atributo
            if (atributo.getTipo() === Tipo_1.Tipo.ATRIBUTO) {
                //3.2 Concatenar atributo a la salida ejmplo: category="web"
                salida += " " + atributo.nombre + "=" + atributo.valor;
            }
        });
        salida += ">\n";
        //4. Ver si el elemento tiene hijos adentro
        hijosList.forEach(function (h) {
            var hijo = h.valor;
            if (hijo.getTipo() === Tipo_1.Tipo.STRING) {
                salida += _this.concatHijoTexto(hijo, nTabs + 1);
            }
            else if (hijo.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                //3.3 Escribir la info de este hijo
                salida += _this.getConsultaObjeto(hijo, nTabs + 1);
            }
        });
        //2.4 Cerrar la etiqueta actual
        salida += this.addTabs(nTabs) + "</" + elem.nombre + ">\n";
        return salida;
    };
    Consulta.prototype.concatHijoTexto = function (son, nTabs) {
        var salida = this.addTabs(nTabs) + "";
        salida += "" + son.getValor() + " ";
        return salida + "\n";
    };
    return Consulta;
}());
exports.Consulta = Consulta;
