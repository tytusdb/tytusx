"use strict";
var CSTAcadena = "digraph G {node[shape= \"box\", style=filled ]";
var m = 0;
var k = 0;
var padreXML;
var cstXML;
function otra(result) {
    result.forEach(function (element) {
        cstXML += "digraph G{ node[shape= \"box\", style=filled ];\n\n";
        cstXML += "RAIZ;\n";
        cstXML += 'RAIZ->';
        cstXML += recorrer(element);
        cstXML += '}';
        //this.cadenaFinal += cadenaInterna
    });
    cstXML = cstXML.replace('undefined', '');
    return cstXML;
}
function recorrer(objetos) {
    var concatena = "";
    m++;
    var padre = "nodo" + m;
    //Con esta linea agregamos el objeto anterior al padre
    concatena += padre + ";\n";
    concatena += padre + "[label = \"" + objetos.id + "\"];\n";
    if (objetos.tablaSimbolos != undefined) {
        if (objetos.tablaSimbolos.length != 0) {
            objetos.tablaSimbolos.forEach(function (atributos) {
                k++;
                var atributo = "nodoAtributo" + k;
                var val = "";
                //Acciones para graficara tributos a objeto
                concatena += padre + "->" + atributo + ";\n";
                val = atributos.valor.replace('"', '');
                val = val.replace('"', '');
                concatena += atributo + "[label =\"" + atributos.id + "=" + val + "\"];\n";
            });
        }
    }
    //Verificamos si tiene texto para agregarselo
    if (objetos.texto != '') {
        m++;
        var nodoTexto = "nodoTexto" + m;
        concatena += padre + "->" + nodoTexto + ";\n";
        concatena += nodoTexto + "[label =\"" + objetos.texto + "\"];\n";
    }
    if (objetos.tablaEntornos != undefined) {
        if (objetos.tablaEntornos.length != 0) {
            objetos.tablaEntornos.forEach(function (objetoSiguiente) {
                //Con esta linea agregamos el objeto anterior al padre
                concatena += padre + "->";
                concatena += recorrer(objetoSiguiente);
            });
        }
    }
    return concatena;
}
function pruebaGraficar(result) {
    result.forEach(function (element) {
        if (element != undefined) {
            if (element.id == element.EtiquetaCierre || element.EtiquetaCierre == 'Unica') {
                if (element.tablaSimbolos.lenght != 0) {
                    element.tablaSimbolos.forEach(function (atributo) {
                        if (atributo != undefined) {
                            var simbolo = new SimboloXML("ATRIBUTO", atributo.id, atributo.linea, atributo.columna, atributo.valor, element.id);
                        }
                    });
                }
                if (element != undefined) {
                    var simbolo = new SimboloXML("OBJETO", element.id, element.linea, element.columna, element.texto, entornoAnterior);
                    agregarTablaSimbolos3(element.tablaEntornos);
                }
            }
            else {
            }
        }
    });
}
function graficarCST(element) {
    padreXML = padreXML + m;
    element.texto = element.texto.toString().replace('"', '');
    element.texto = element.texto.toString().replace('"', '');
    for (var index = 0; index < element.length; index++) {
        if (element[0].tablaEntornos != undefined) {
            if (element[0].tablaEntornos.length == 0) {
                if (element[0].EtiquetaCierre == element[0].id) {
                    CSTAcadena += padreXML + "->" + element[0].id;
                    m++;
                    //let simbolo = new SimboloXML("OBJETO", element[index].id, element[index].linea, element[index].columna, element[index].texto, entornoAnterior);
                }
                else {
                    CSTAcadena += padreXML + "->" + element[0].id;
                    m++;
                }
            }
        }
    }
    var _loop_1 = function (index) {
        if (element[index].tablaEntornos != undefined) {
            if (element[index].tablaEntornos.length != 0) {
                var simbolo = new SimboloXML("OBJETO", element[index].id, element[index].linea, element[index].columna, element[index].texto, entornoAnterior);
            }
            if (element[index].tablaSimbolos != undefined) {
                element[index].tablaSimbolos.forEach(function (atributo) {
                    var simbolo = new SimboloXML("ATRIBUTO", atributo.id, atributo.linea, atributo.columna, atributo.valor, element[index].id);
                });
            }
        }
    };
    for (var index = 0; index < element.length; index++) {
        _loop_1(index);
    }
    for (var index = 0; index < element.length; index++) {
        if (element[index].tablaEntornos != undefined) {
            if (element[index].id == element[index].EtiquetaCierre || element[index].EtiquetaCierre == 'Unica') {
                if (element[index].tablaEntornos.length != 0) {
                    simboloAnterior = new SimboloXML("OBJETO", element[index].id, element[index].linea, element[index].columna, element[index].texto, entornoAnterior);
                    padreXML = element[index].id;
                    agregarTablaSimbolos(element[index].tablaEntornos);
                }
            }
            else {
            }
        }
    }
}
function CSTA(element) {
    var padre = "nodo" + m;
    try {
        // var rem=element.texto.toString().replace('"','');
        //var reme=rem.replace('"','');
        for (var index = 0; index < element.length; index++) {
            if (element[index].id != undefined) {
                CSTAcadena += "" + padre + " [label =" + "\"" + element[index].id + "\"]  ";
                m = m + 1;
            }
        }
        //CSTAcadena +=""+ padre+ " [label ="+"\""+element.id+"]  ";
        //i=i + 1;
        //cadena+= padre +"->"+"nodo"+(i)+ "\n";
        //}
        for (var index = 0; index < element.length; index++) {
            //console.log(Nodos.hijos[index].descripcion.toString());
            //  if((Nodos.descripcion.toString()!="")){
            CSTAcadena = CSTAcadena + padre + "->" + "nodo" + (m) + " ";
            //  }
            // if((Nodos.hijos[index].descripcion.toString()!="")){ 
            if (element[index].tablaEntornos != undefined) {
                CSTA(element[index].tablaEntornos);
                //}
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    // if((Nodos.descripcion.toString()!="")){
    //console.log(cadena);
    return CSTAcadena;
}
//# sourceMappingURL=prueba.js.map