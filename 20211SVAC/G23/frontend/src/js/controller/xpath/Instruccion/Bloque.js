"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Enum_1 = require("../../../model/xpath/Enum");
var DobleEje_1 = __importDefault(require("./Selecting/DobleEje"));
var Eje_1 = __importDefault(require("./Selecting/Eje"));
var Axis_1 = __importDefault(require("./Selecting/Axis/Axis"));
var reset;
var output = [];
function Bloque(_instruccion, _ambito, _retorno) {
    var tmp;
    reset = _retorno;
    for (var i = 0; i < _instruccion.length; i++) {
        var camino = _instruccion[i]; // En caso de tener varios caminos
        for (var j = 0; j < camino.length; j++) {
            var instr = camino[j];
            if (instr.tipo === Enum_1.Tipos.SELECT_FROM_ROOT) {
                tmp = Eje_1.default(instr, _ambito, _retorno);
                if (tmp.notFound) {
                    _retorno = reset;
                    break;
                }
                if (tmp.error)
                    return tmp;
                _retorno = tmp;
            }
            else if (instr.tipo === Enum_1.Tipos.SELECT_FROM_CURRENT) {
                tmp = DobleEje_1.default(instr, _ambito, _retorno);
                if (tmp.notFound) {
                    _retorno = reset;
                    break;
                }
                if (tmp.error)
                    return tmp;
                _retorno = tmp;
            }
            else if (instr.tipo === Enum_1.Tipos.SELECT_AXIS) {
                tmp = Axis_1.default.SA(instr, _ambito, _retorno);
                if (tmp.notFound) {
                    _retorno = reset;
                    break;
                }
                if (tmp.error)
                    return tmp;
                _retorno = tmp;
            }
            else {
                return { error: "Error: Instrucción no procesada.", tipo: "Semántico", origen: "Query", linea: instr.linea, columna: instr.columna };
            }
        }
        output.push(_retorno);
        _retorno = reset;
    }
    return writeOutput();
}
function writeOutput() {
    var cadena = "";
    for (var i = 0; i < output.length; i++) {
        var path = output[i];
        if (path.cadena === Enum_1.Tipos.TEXTOS) {
            var root = (path.texto) ? (path.texto) : (path.elementos);
            root.forEach(function (txt) {
                cadena += concatText(txt);
            });
        }
        else if (path.cadena === Enum_1.Tipos.ELEMENTOS) {
            var root = path.elementos;
            root.forEach(function (element) {
                cadena += concatChilds(element, "");
            });
        }
        else if (path.cadena === Enum_1.Tipos.ATRIBUTOS) {
            if (path.atributos) {
                var root = path.atributos; // <-- muestra sólo el atributo
                root.forEach(function (attr) {
                    cadena += concatAttributes(attr);
                });
            }
            else {
                var root = path.elementos; // <-- muestra toda la etiqueta
                root.forEach(function (element) {
                    cadena += extractAttributes(element, "");
                });
            }
        }
        else if (path.cadena === Enum_1.Tipos.COMBINADO) {
            var root = path.nodos;
            root.forEach(function (elemento) {
                if (elemento.elementos) {
                    cadena += concatChilds(elemento.elementos, "");
                }
                else if (elemento.textos) {
                    cadena += concatText(elemento.textos);
                }
            });
        }
    }
    output = [];
    if (cadena)
        return replaceEntity(cadena.substring(1));
    return "No se encontraron elementos.";
}
function replaceEntity(cadena) {
    var _lessThan = /&lt;/gi;
    var _greaterThan = /&gt;/gi;
    var _ampersand = /&amp;/gi;
    var _apostrophe = /&apos;/gi;
    var _quotation = /&quot;/gi;
    var salida = cadena.replace(_lessThan, "<").replace(_greaterThan, ">").replace(_ampersand, "&").replace(_apostrophe, "\'").replace(_quotation, "\"");
    return salida;
}
function concatChilds(_element, cadena) {
    cadena = ("\n<" + _element.id_open);
    if (_element.attributes) {
        _element.attributes.forEach(function (attribute) {
            cadena += (" " + attribute.id + "=\"" + attribute.value + "\"");
        });
    }
    if (_element.childs) {
        cadena += ">";
        _element.childs.forEach(function (child) {
            cadena += concatChilds(child, cadena);
        });
        cadena += ("\n</" + _element.id_close + ">");
    }
    else {
        if (_element.id_close === null)
            cadena += "/>";
        else {
            cadena += ">";
            cadena += (_element.value + "</" + _element.id_close + ">");
        }
    }
    return cadena;
}
function concatAttributes(_attribute) {
    return "\n" + _attribute.id + "=\"" + _attribute.value + "\"";
}
function extractAttributes(_element, cadena) {
    if (_element.attributes) {
        _element.attributes.forEach(function (attribute) {
            cadena += "\n" + attribute.id + "=\"" + attribute.value + "\"";
        });
    }
    return cadena;
}
function concatText(_text) {
    return "\n" + _text;
}
module.exports = Bloque;
