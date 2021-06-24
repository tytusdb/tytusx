/*import { Entorno } from "./xml/ast/Entorno";
import { Simbolo } from "./xml/ast/Simbolo";
import { Tipo } from "./xml/ast/Tipo";
import { Atributo } from "./xml/expresiones/Atributo";
import { Objeto } from "./xml/expresiones/Objeto";
import { ReporteXML } from "./xml/reportes/ReporteXML";
import { AST_XML } from "./xml/ast/AST_XML";
import { AST_XPATH } from "./xpath/ast/AST_XPATH"
import { GraphAST } from "./grafo/GraphAST";
import { Gramatica } from "./xml/reportes/Gramatica";
import { Instruccion } from "./xpath/interfases/Instruccion";

const gramatica = require('../grammar/Grammar_xml')
const gramaticaDesc = require('../grammar/Grammar_xml_desc')
const gramaticaXPATH = require('../grammar/Grammar_xpath');*/
var contenido = "\n  <?xml version=\"1.0\" encoding=\"UTF-8\"?>  <!-- Your comment -->\n  <biblioteca>\n    <libro>\n      <titulo>La vida est\u00E1 en otra parte</titulo>\n      <autor>Milan Kundera</autor>\n      <fechaPublicacion a\u00F1o=\"1973\"/>\n    </libro>\n    <libro>\n      <titulo>Pantale\u00F3n y las visitadoras</titulo>\n      <autor fechaNacimiento=\"28/03/1936\">Mario Vargas Llosa</autor>\n      <fechaPublicacion a\u00F1o=\"1973\"/>\n    </libro>\n    <libro>\n      <titulo>Conversaci\u00F3n en la catedral</titulo>\n      <autor fechaNacimiento=\"28/03/1936\">Mario Vargas Llosa</autor>\n      <fechaPublicacion a\u00F1o=\"1969\"/>\n    </libro>\n  </biblioteca>\n";
var instrucciones;
//instrucciones = gramatica.parse(contenido);
var entornoGlobal = new Entorno(null);
function ejecutarCodigo(entrada) {
    instrucciones = Grammar_xml.parse(entrada);
    instrucciones.getExpresiones().forEach(function (element) {
        var entornoObj = new Entorno(null);
        if (element.listObjetos != undefined && element.listObjetos != null) {
            entornoObj = ambito_objeto(element.listObjetos, entornoGlobal);
        }
        if (element.listAtributos != undefined) {
            if (element.listAtributos.length > 0) {
                element.listAtributos.forEach(function (a) {
                    a.entorno = entornoObj;
                    var simbolo = new Simbolo(a.id, a.value, Tipo.ATRIBUTO, a.line, a.column);
                    entornoObj.agregar(simbolo);
                });
            }
        }
        if (element.id1 != undefined) {
            element.entorno = entornoObj;
            var simbolo = new Simbolo(element.id1, element, Tipo.OBJETO, element.line, element.column);
            entornoGlobal.agregar(simbolo);
        }
    });
}
function ambito_objeto(listO, entornoAnterior) {
    var entornoObjeto = new Entorno(entornoAnterior);
    listO.forEach(function (element) {
        var entornoObj = new Entorno(entornoObjeto);
        if (element.listObjetos != undefined && element.listObjetos != null) {
            //entornoObjeto.print();
            entornoObj = ambito_objeto(element.listObjetos, entornoObjeto);
        }
        if (element.listAtributos != undefined) {
            if (element.listAtributos.length > 0) {
                element.listAtributos.forEach(function (a) {
                    a.entorno = entornoObjeto;
                    var simbolo = new Simbolo(a.id, a.value, Tipo.ATRIBUTO, a.line, a.column);
                    //entornoObjeto.print();
                    entornoObj.agregar(simbolo);
                });
            }
        }
        if (element.id1 != undefined) {
            element.entorno = entornoObj;
            var simbolo = new Simbolo(element.id1, element, Tipo.OBJETO, element.line, element.column);
            entornoObjeto.agregar(simbolo);
        }
    });
    return entornoObjeto;
}
var texto = "";
var text = "";
var entorno_actual = [];
var instruccionesXPATH;
var entornoTemp;
function ejecutarXPATH(query) {
    text = "";
    texto = "";
    entorno_actual = [];
    instruccionesXPATH = G_xpath.parse(query);
    var flag = true;
    var list_entorno = [];
    var list_entorno2 = [];
    instruccionesXPATH.getInstrucciones().forEach(function (or) {
        var _loop_1 = function (o) {
            if (list_entorno.length == 0) {
                if (o.getNode() == "//") {
                    list_entorno = getEntornoActual(entornoGlobal, o.getPredicado());
                    //console.log(descendiente(entornoGlobal, "autor"))
                }
                else if (o.getNode() == "/") {
                    list_entorno = getEntornoActualSinDescendite(entornoGlobal, o.getPredicado());
                }
            }
            else {
                if (o.getPredicado() != ".") { //para guardar los nodos actuales y retornarlos
                    entorno_actual = [];
                }
                if (o.getNode() == "//") {
                    list_entorno.forEach(function (e) {
                        list_entorno2 = getEntornoActual(e.entorno, o.getPredicado());
                    });
                    list_entorno = list_entorno2;
                }
                else if (o.getNode() == "/") {
                    list_entorno.forEach(function (e) {
                        list_entorno2 = getEntornoActualSinDescendite(e.entorno, o.getPredicado());
                    });
                    list_entorno = list_entorno2;
                }
            }
            if (entorno_actual.length == 0) {
                editor2.setValue("Error!!!");
                flag = false;
                return "break";
            }
        };
        for (var _i = 0, or_1 = or; _i < or_1.length; _i++) {
            var o = or_1[_i];
            var state_1 = _loop_1(o);
            if (state_1 === "break")
                break;
        }
    });
    if (flag) {
        if (list_entorno2.length != 0) {
            list_entorno = list_entorno2;
        }
        list_entorno.forEach(function (e) {
            //console.log(e)
            print_entorno(e);
        });
        editor2.setValue(text);
    }
}
function print_entorno(o) {
    text += "<" + o.id1 + " ";
    if (o.listAtributos != null) {
        o.listAtributos.forEach(function (a) {
            text += a.id + "=\"" + a.value + "\" ";
        });
    }
    if (o.text == '' && o.listObjetos == null) {
        text += "/>";
    }
    else {
        if (o.text != null) {
            text += "> " + o.text;
        }
        else {
            text += ">";
        }
        if (o.listObjetos != null) {
            o.listObjetos.forEach(function (lo) {
                print_entorno(lo);
            });
        }
        text += "</" + o.id2 + ">\n";
    }
    return text;
}
//Busca el entorno descendiente "//"
function getEntornoActual(entornoG, id) {
    if (id == ".") { //selecciona el nodo actual
        return entorno_actual;
    }
    else if (id == "..") { //Selecciona el padre del nodo actual
        entorno_actual.push(entornoG.getAnterior().getAnterior().getSimbolo("0").getValorImplicito());
        return entorno_actual;
    }
    else if (id == "@*") {
        entornoTemp = entornoG; //Guardando entorno anterior
        console.log(entornoG.getTabla(), "SIIIIIIII");
        entorno_actual = searchAllAtributos(entornoG);
        return entorno_actual;
    }
    for (var key in entornoG.getTabla()) {
        if (entornoG.getSimbolo(key).id === id) {
            console.log(entornoG);
            entorno_actual.push(entornoG.getSimbolo(key).getValorImplicito());
        }
        var siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
        if (siguienteEntorno != null) {
            getEntornoActual(siguienteEntorno, id);
        }
    }
    return entorno_actual;
}
//Busca el entorno descendiente "/"
function getEntornoActualSinDescendite(entornoG, id) {
    if (id == ".") { //selecciona el nodo actual
        return entorno_actual;
    }
    else if (id == "..") { //Selecciona el padre del nodo actual
        entorno_actual.push(entornoG.getAnterior().getAnterior().getSimbolo("0").getValorImplicito());
        return entorno_actual;
    }
    for (var key in entornoG.getTabla()) {
        if (entornoG.getSimbolo(key).id === id) {
            entorno_actual.push(entornoG.getSimbolo(key).getValorImplicito());
        }
        /*let siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
          if (siguienteEntorno != null) {
            getEntornoActual(siguienteEntorno, id)
          }*/
    }
    return entorno_actual;
}
function searchAllAtributos(entornoG) {
    for (var key in entornoG.getTabla()) {
        if (typeof (entornoG.getSimbolo(key).getValorImplicito()) == "string") {
            entorno_actual.push(entornoTemp.getSimbolo(key).getValorImplicito());
        }
        var siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
        if (siguienteEntorno != null) {
            searchAllAtributos(siguienteEntorno);
        }
    }
    return entorno_actual;
}
function getEntorno(entornoG, id) {
    for (var key in entornoG.getTabla()) {
        if (entornoG.getSimbolo(key).id === id) {
            //console.log(entornoG)
            entorno_actual.push(entornoG.getSimbolo(key).getValorImplicito());
        }
        var siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
        if (siguienteEntorno != null) {
            getEntornoActual(siguienteEntorno, id);
        }
    }
    return entorno_actual;
}
function descendiente(entornoG, id) {
    for (var key in entornoG.getTabla()) {
        texto += "" + entornoG.getSimbolo(key).id;
        var siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
        if (siguienteEntorno != null) {
            descendiente(siguienteEntorno, id);
        }
    }
    return texto;
}
//ejecutarXML();
//ejecutarXPATH();
function getTablaSimboloXML() {
    var reporte = new ReporteXML();
    return reporte.tablaSimbolos(entornoGlobal, "0");
}
function getReporteErrorXMLASC() {
    return instrucciones.getErrores();
}
function getReporteGramaticalXMLASC() {
    return instrucciones.getProducciones();
}
function getGrafoAscXML() {
    //GRAFO
    var graph = new GraphAST(instrucciones);
    return graph.getGrafo();
}
function getGrafoAscXPATH() {
    //GRAFO
    var graph = new GraphASTXPATH(instruccionesXPATH);
    return graph.getGrafo();
}
function crear_tabla_errores_xpaht() {
    var body = document.getElementsByTagName("body")[0];
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    //CREAR ENCABEZADO
    var encabezado = document.createElement("tr");
    encabezado.style.color = "white";
    encabezado.style.background = 'black';
    var titulo = document.createElement("h1");
    var espacio = document.createElement("br");
    var espacio2 = document.createElement("br");
    var espacio3 = document.createElement("br");
    var numero = document.createElement("td");
    var tipo = document.createElement("td");
    var descripcion = document.createElement("td");
    var fila = document.createElement("td");
    var columna = document.createElement("td");
    var t_titulo = document.createTextNode("REPORTE XPAHT");
    var t_numero = document.createTextNode("Linea");
    var t_tipo = document.createTextNode("Tipo");
    var t_descripcion = document.createTextNode("Descripcion");
    var t_fila = document.createTextNode("Fila");
    var t_columna = document.createTextNode("Columna");
    numero.appendChild(t_numero);
    tipo.appendChild(t_tipo);
    descripcion.appendChild(t_descripcion);
    fila.appendChild(t_fila);
    columna.appendChild(t_columna);
    titulo.appendChild(t_titulo);
    encabezado.appendChild(numero);
    encabezado.appendChild(tipo);
    encabezado.appendChild(descripcion);
    encabezado.appendChild(fila);
    encabezado.appendChild(columna);
    body.appendChild(titulo);
    tblBody.appendChild(encabezado);
    var arrayErrores = [];
    var listaErrores = instruccionesXPATH.getErrores();
    for (var i = 0; i < listaErrores.length; i += 4) {
        var grupoErrores = listaErrores.slice(i, i + 4);
        arrayErrores.push(grupoErrores);
    }
    //CREAR CUERPO
    for (var i = 0; i < arrayErrores.length; ++i) {
        var error = arrayErrores[i];
        var Fila = document.createElement("tr");
        var celda = document.createElement("td");
        var cont = i + 1;
        var textoCelda = document.createTextNode("# " + cont);
        celda.appendChild(textoCelda);
        Fila.appendChild(celda);
        for (var j = 0; j < error.length; ++j) {
            var celda_1 = document.createElement("td");
            var textoCelda_1 = document.createTextNode(error[j]);
            celda_1.appendChild(textoCelda_1);
            Fila.appendChild(celda_1);
        }
        tblBody.appendChild(Fila);
    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    body.appendChild(espacio);
    body.appendChild(espacio2);
    body.appendChild(espacio3);
    //tabla.setAttribute("border", "2");
}
function crear_tabla_errores_xml() {
    var body = document.getElementsByTagName("body")[0];
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    //CREAR ENCABEZADO
    var encabezado = document.createElement("tr");
    encabezado.style.color = "white";
    encabezado.style.background = 'black';
    var titulo = document.createElement("h1");
    var espacio = document.createElement("br");
    var espacio2 = document.createElement("br");
    var espacio3 = document.createElement("br");
    var numero = document.createElement("td");
    var tipo = document.createElement("td");
    var descripcion = document.createElement("td");
    var fila = document.createElement("td");
    var columna = document.createElement("td");
    var t_titulo = document.createTextNode("REPORTE XML");
    var t_numero = document.createTextNode("Linea");
    var t_tipo = document.createTextNode("Tipo");
    var t_descripcion = document.createTextNode("Descripcion");
    var t_fila = document.createTextNode("Fila");
    var t_columna = document.createTextNode("Columna");
    numero.appendChild(t_numero);
    tipo.appendChild(t_tipo);
    descripcion.appendChild(t_descripcion);
    fila.appendChild(t_fila);
    columna.appendChild(t_columna);
    titulo.appendChild(t_titulo);
    encabezado.appendChild(numero);
    encabezado.appendChild(tipo);
    encabezado.appendChild(descripcion);
    encabezado.appendChild(fila);
    encabezado.appendChild(columna);
    body.appendChild(titulo);
    tblBody.appendChild(encabezado);
    var arrayErrores = [];
    var listaErrores = instrucciones.getErrores();
    for (var i = 0; i < listaErrores.length; i += 4) {
        var grupoErrores = listaErrores.slice(i, i + 4);
        arrayErrores.push(grupoErrores);
    }
    //CREAR CUERPO
    for (var i = 0; i < arrayErrores.length; ++i) {
        var error = arrayErrores[i];
        var Fila = document.createElement("tr");
        var celda = document.createElement("td");
        var cont = i + 1;
        var textoCelda = document.createTextNode("# " + cont);
        celda.appendChild(textoCelda);
        Fila.appendChild(celda);
        for (var j = 0; j < error.length; ++j) {
            var celda_2 = document.createElement("td");
            var textoCelda_2 = document.createTextNode(error[j]);
            celda_2.appendChild(textoCelda_2);
            Fila.appendChild(celda_2);
        }
        tblBody.appendChild(Fila);
    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    body.appendChild(espacio);
    body.appendChild(espacio2);
    body.appendChild(espacio3);
    //tabla.setAttribute("border", "2");
}
