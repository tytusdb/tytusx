"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var etiquetas = [];
var etiquetasdoble = [];
var cadena = "";
function exepath1(listainstrucciones) {
    etiquetas = [];
    var p = tds_xml_persistente[0];
    //console.log(p[i]);
    for (var j = 0; j < listainstrucciones.length; j++) {
        if (listainstrucciones[j].ruta2 == undefined) /////si vienen solo una ruta
         {
            for (var i = 0; i < p.length; i++) {
                var auxiliar = [];
                auxiliar = getrutasimple(listainstrucciones[j], p[i]);
                if (auxiliar != undefined) {
                    if (auxiliar.length > 0) {
                        console.log(getrutasimple(listainstrucciones[j], p[i]));
                    }
                }
            }
        }
        else //////mas de una ruta
         {
            for (var i = 0; i < p.length; i++) {
                //console.log(listainstrucciones[j]);
                //console.log(p[i]);
                //if(listainstrucciones[j])
                console.log(getInfoXpath1(listainstrucciones[j], p[i]));
                //break;
            }
        }
    }
}
function exepath(listainstrucciones) {
    etiquetas = [];
    cadena = "";
    //let retorno="";
    var p = tds_xml_persistente[0];
    //console.log(tds_xml_persistente);
    for (var j = 0; j < listainstrucciones.length; j++) {
        /* if(listainstrucciones[j].ruta2===undefined) /////si vienen solo una ruta
         {
             
             let auxiliar=[];
             auxiliar=getrutasimple(listainstrucciones[j], p);
            
             if(auxiliar!=undefined)
             {
                 console.log(auxiliar);
             }
                 
         }
 
         else //////mas de una ruta
         {*/
        var auxiliar = [];
        auxiliar = getInfoXpath1(listainstrucciones[j], p);
        if (auxiliar != undefined) {
            console.log(auxiliar);
            cadenaresultante(auxiliar);
            console.log(cadena);
        }
        //}
    }
    return cadena;
}
//function getEntornos()
//Funcion para recorrer con diagonal o sin diagonal 
function getInfoXpath(listainstrucciones, entorno) {
    //console.log(listainstrucciones.ruta2)
    //console.log(entorno);
    if (listainstrucciones.dato.valor === entorno.entorno && listainstrucciones.ruta2 != undefined)
        return getInfoXpath(listainstrucciones.ruta2, entorno.simbolos);
    else {
        //console.log(entorno);
        var aux = [];
        for (var i = 0; i < entorno.length; i++) {
            if (entorno[i].tipo != 6) {
                for (var j = 0; j < entorno[i].simbolos.length; j++) {
                    if (listainstrucciones.ruta2 != undefined) {
                        if (entorno[i].simbolos[j].tipo != 6 && listainstrucciones.ruta2.dato.valor === entorno[i].simbolos[j].entorno) {
                            aux.push(entorno[i].simbolos[j]);
                        }
                    }
                    else {
                        //console.log(listainstrucciones);
                        //console.log(entorno[i].simbolos[j].entorno);
                        aux.push(entorno[i].simbolos[j]);
                    }
                }
            }
            //console.log(entorno[i]);
            //if(listainstrucciones.ruta2.dato.valor)
        }
        //console.log(listainstrucciones.ruta2.dato.valor);
        if (listainstrucciones.mostrar != "") {
            var entornofiltrado = filtrarCondicion(aux, entorno, listainstrucciones);
            return entornofiltrado;
        }
        return aux;
    }
}
function getInfoXpath1(listainstrucciones, entorno) {
    //console.log(listainstrucciones.ruta2)
    //console.log(entorno);
    if (listainstrucciones.ruta2 != undefined) {
        var auxiliar = [];
        auxiliar = getrutasimple(listainstrucciones, entorno);
        if (auxiliar.length > 0) // se encontro ruta actual
         {
            return getInfoXpath1(listainstrucciones.ruta2, auxiliar);
        }
        else {
            return undefined;
        }
    }
    else {
        var auxiliar = [];
        auxiliar = getrutasimple(listainstrucciones, entorno);
        if (auxiliar != undefined) {
            if (auxiliar.length > 0) // se encontro ruta actual
             {
                return auxiliar;
            }
        }
        else {
            return undefined;
        }
        //console.log(listainstrucciones.ruta2.dato.valor);
        /* if(listainstrucciones.mostrar !=""){
             let entornofiltrado = filtrarCondicion(aux, entorno, listainstrucciones);
                 return entornofiltrado;
         }*/
    }
}
function getrutasimple(listainstrucciones, entorno) {
    if (listainstrucciones.tipoRuta == 0) //diagonal simple
     {
        var tienedatos = [];
        if (listainstrucciones.dato.tipo == 0) //identificador
         {
            tienedatos = buscaretiquetaenhijos(listainstrucciones.dato.valor, entorno);
            if (tienedatos != undefined) {
                if (tienedatos.length > 1) //si devuelve una lista de varias posiciones
                 {
                    if (listainstrucciones.mostrar != "") {
                        var entornofiltrado = filtrarCondicion(tienedatos, tds_xml_persistente[0], listainstrucciones);
                        return entornofiltrado;
                    }
                    else {
                        return tienedatos;
                    }
                }
            }
        }
        else if (listainstrucciones.dato.tipo == 2) ////atributo
         {
            tienedatos = buscaratributoenhijo(listainstrucciones.dato.valor.valor, entorno);
            if (tienedatos != undefined) {
                if (tienedatos.length > 0) //si devuelve una lista de varias posiciones
                 {
                    if (listainstrucciones.mostrar != "") {
                        var entornofiltrado = filtrarCondicion(tienedatos, tds_xml_persistente[0], listainstrucciones);
                        return entornofiltrado;
                    }
                    else {
                        return tienedatos;
                    }
                }
            }
        }
    }
    else if (listainstrucciones.tipoRuta == 1) //diagonal doble
     {
        var retorno = [];
        etiquetas = [];
        etiquetasdoble = [];
        if (listainstrucciones.dato.tipo == 0) {
            buscaretiqueta(listainstrucciones.dato.valor, entorno);
            if (etiquetasdoble.length == 1) ////si devuelve una lista de una posicion
             {
                console.log("solo 1");
                console.log(etiquetasdoble[0]);
                retorno.push(etiquetasdoble[0]);
            }
            else if (etiquetasdoble.length > 1) //si devuelve una lista de varias posiciones
             {
                console.log("muchos");
                retorno = etiquetasdoble;
            }
        }
        else if (listainstrucciones.dato.tipo == 2) {
            buscaratributo(listainstrucciones.dato.valor.valor, entorno);
            if (etiquetas.length == 1) ////si devuelve una lista de una posicion
             {
                console.log("solo 1");
                retorno.push(etiquetas[0]);
            }
            else if (etiquetas.length > 1) //si devuelve una lista de varias posiciones
             {
                console.log("muchos");
                retorno.push(etiquetas);
            }
        }
        if (retorno.length > 0) {
            return retorno;
        }
        else {
            return undefined;
        }
    }
    else if (listainstrucciones.tipoRuta == 2) //sin diagonal
     {
        return buscaretiquetaenhijos(listainstrucciones.dato.valor, entorno);
    }
}
/////////////busca etiquetas en hijos e hijos de hijos////
function buscaretiqueta(etiqueta, entorno) {
    etiquetas = [];
    for (var i = 0; i < entorno.length; i++) {
        if (entorno[i].simbolos != undefined) {
            if (entorno[i].entorno === etiqueta) {
                for (var h = 0; h < entorno[i].simbolos.length; h++) {
                    etiquetas.push(entorno[i].simbolos[h]);
                }
            }
            else {
                buscaretiqueta(etiqueta, entorno[i].simbolos);
            }
        }
        else {
            if (entorno[i].entorno != undefined) {
                var eti = [];
                if (entorno[i].entorno === etiqueta) {
                    eti.push(entorno[i]);
                }
                etiquetas.push(eti);
            }
            else {
                var auxilia = entorno[i];
                var eti = [];
                for (var j = 0; j < auxilia.length; j++) {
                    if (auxilia[j].entorno === etiqueta && auxilia[j].simbolos != undefined) {
                        for (var h = 0; h < auxilia[j].simbolos.length; h++) {
                            eti.push(auxilia[j].simbolos[h]);
                        }
                    }
                    else if (auxilia[j].entorno != etiqueta && auxilia[j].simbolos != undefined) {
                        buscaretiqueta(auxilia[j].simbolos);
                    }
                    else if (auxilia[j].entorno === etiqueta) {
                        eti.push(auxilia[j]);
                    }
                }
                if (eti != undefined) {
                    if (eti.length > 0) {
                        etiquetas.push(eti);
                    }
                }
            }
        }
    }
    if (etiquetas != undefined) {
        if (etiquetas.length > 0) {
            etiquetasdoble.push(etiquetas);
        }
    }
}
/////////////busca etiquetas en hijos e hijos de hijos////
///////////busca etiqueta en hijos//////////////
function buscaretiquetaenhijos(etiqueta, entorno) {
    var retorno = [];
    for (var i = 0; i < entorno.length; i++) {
        if (entorno[i].simbolos != undefined) {
            var eti = [];
            for (var j = 0; j < entorno[i].simbolos.length; j++) {
                if (entorno[i].entorno === etiqueta) {
                    eti.push(entorno[i].simbolos[j]);
                }
            }
            if (eti.length > 0) {
                retorno.push(eti);
            }
        }
        else {
            var auxilia = entorno[i];
            var eti = [];
            for (var j = 0; j < auxilia.length; j++) {
                if (auxilia[j].entorno === etiqueta && auxilia[j].simbolos != undefined) {
                    for (var h = 0; h < auxilia[j].simbolos.length; h++) {
                        eti.push(auxilia[j].simbolos[h]);
                    }
                }
                else if (auxilia[j].entorno === etiqueta) {
                    eti.push(auxilia[j]);
                }
            }
            if (eti != undefined) {
                if (eti.length > 0) {
                    retorno.push(eti);
                }
            }
        }
    }
    if (retorno.length > 0) {
        return retorno;
    }
    else {
        return undefined;
    }
}
///////////busca etiquetas en hijos/////////////
/////////////busca atribujo en hijos e hijos de hijos////
function buscaratributo(etiqueta, entorno) {
    if (entorno.simbolos != undefined) {
        if (entorno.identificador === etiqueta) {
            etiquetas.push(entorno);
        }
        else {
            for (var j = 0; j < entorno.simbolos.length; j++) {
                buscaratributo(etiqueta, entorno.simbolos[j]);
            }
        }
    }
    else {
        if (entorno.identificador === etiqueta && entorno.tipo == 6) {
            etiquetas.push(entorno);
        }
    }
}
/////////////busca atribujo en hijos e hijos de hijos////
/////////busta atributo en hijos de etiqueta///////////////
function buscaratributoenhijo(etiqueta, entorno) {
    var retorno = [];
    for (var i = 0; i < entorno.length; i++) {
        var auxilia = entorno[i];
        var eti = [];
        for (var j = 0; j < auxilia.length; j++) {
            if (auxilia[j].identificador === etiqueta) {
                eti.push(auxilia[j]);
            }
        }
        if (eti != undefined) {
            if (eti.length > 0) {
                retorno.push(eti);
            }
        }
    }
    if (retorno.length > 0) {
        return retorno;
    }
    else {
        return undefined;
    }
}
/////////busca atributo en hijos de etiqueta////////////
function filtrarCondicion(aux, entorno, listainstrucciones) {
    if (listainstrucciones.mostrar != "") {
        var entornofiltrado = [];
        var expresion = listainstrucciones.mostrar.exp;
        var rutaOperar = void 0;
        var lado = void 0;
        if (expresion.operandoIzq != false) {
            rutaOperar = expresion.operandoIzq.dato.valor;
            lado = true;
        }
        else if (expresion.operandoDer != false) {
            rutaOperar = expresion.operandoDer.dato.valor;
            lado = false;
        }
        for (var _i = 0, aux_1 = aux; _i < aux_1.length; _i++) {
            var prueba = aux_1[_i];
            for (var _a = 0, prueba_1 = prueba; _a < prueba_1.length; _a++) {
                var actual = prueba_1[_a];
                if (actual.identificador == rutaOperar) {
                    var nuevaEXP = void 0, nuevaOP = void 0;
                    if (!isNaN(actual.valor)) {
                        nuevaEXP = nodoDato(actual.valor, TIPO_PRIMITIVO.NUMERICO);
                    }
                    else {
                        nuevaEXP = nodoDato(actual.valor, TIPO_PRIMITIVO.CADENA);
                    }
                    if (lado) {
                        nuevaOP = nodoOperacionBinaria(nuevaEXP, expresion.operandoDer, expresion.tipo_operacion, expresion.clase, expresion.fila, expresion.columna);
                    }
                    else {
                        nuevaOP = nodoOperacionBinaria(expresion.operandoIzq, nuevaEXP, expresion.tipo_operacion, expresion.clase, expresion.fila, expresion.columna);
                    }
                    var resultado = getValor(nuevaOP, entorno);
                    if (resultado) {
                        entornofiltrado.push(prueba);
                    }
                }
            }
        }
        if (entornofiltrado.length > 0) {
            if (listainstrucciones.mostrar.mostrar != "") {
                entornofiltrado = filtrarCondicion(entornofiltrado, entorno, listainstrucciones.mostrar);
            }
            return entornofiltrado;
        }
        return;
    }
}
/////////////busca atribujo en hijos e hijos de hijos////
function cadenaresultante(entorno) {
    for (var i = 0; i < entorno.length; i++) {
        var auxilia = entorno[i];
        if (auxilia.entorno === undefined) {
            for (var j = 0; j < auxilia.length; j++) {
                if (auxilia[j].simbolos != undefined) {
                    cadenaresultante(auxilia[j].simbolos);
                }
                else {
                    cadena = cadena + "Mensaje Grupo34 >>" + auxilia[j].valor + "\n";
                }
            }
        }
        else {
            if (entorno[i].simbolos != undefined) {
                cadenaresultante(entorno[i].simbolos);
            }
            else {
                cadena = cadena + "Mensaje Grupo34 >>" + entorno[i].valor + "\n";
            }
        }
    }
}
/////////////busca atribujo en hijos e hijos de hijos////
//graficar xpath
function graphXPathRuta(str, path, contador) {
    var NUMID = contador.incrementarContador();
    str.push("\n    node" + NUMID + "[label=\"" + path.dato.valor + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n    ");
    var ptr;
    if (path.mostrar != "") {
        ptr = graphXPathExp(str, path.mostrar.exp, contador);
        str.push(" node" + NUMID + " -> node" + ptr + ";\n ");
    }
    if (path.ruta2 != undefined) {
        ptr = graphXPathRuta(str, path.ruta2, contador);
        str.push(" node" + NUMID + " -> node" + ptr + ";\n ");
    }
    return NUMID;
}
function graphXPathExp(str, exp, contador) {
    var NUMID = contador.incrementarContador();
    if (exp.clase === TIPO_EXPRESION.OP_ARITMETICA) {
        var exp1 = graphXPathExp(str, exp.operandoIzq, contador);
        var exp2 = graphXPathExp(str, exp.operandoDer, contador);
        if (exp.tipo_operacion === TIPO_OPERACION.OP_SUMA) {
            str.push("\n            node" + NUMID + "[label=\"+\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_RESTA) {
            str.push("\n            node" + NUMID + "[label=\"-\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MULTIPLICACION) {
            str.push("\n            node" + NUMID + "[label=\"*\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_DIVISION) {
            str.push("\n            node" + NUMID + "[label=\"div\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MODULAR) {
            str.push("\n            node" + NUMID + "[label=\"%\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
    }
    else if (exp.clase === TIPO_EXPRESION.OP_RELACIONAL) {
        var exp1 = graphXPathExp(str, exp.operandoIzq, contador);
        var exp2 = graphXPathExp(str, exp.operandoDer, contador);
        if (exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_QUE) {
            str.push("\n            node" + NUMID + "[label=\">\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_QUE) {
            str.push("\n            node" + NUMID + "[label=\"<\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_IGUAL) {
            str.push("\n            node" + NUMID + "[label=\">=\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_IGUAL) {
            str.push("\n            node" + NUMID + "[label=\"<=\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_NO_IGUAL) {
            str.push("\n            node" + NUMID + "[label=\"!=\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_IGUAL) {
            str.push("\n            node" + NUMID + "[label=\"=\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
    }
    else if (exp.clase === TIPO_EXPRESION.OP_LOGICA) {
        var exp1 = graphXPathExp(str, exp.operandoIzq, contador);
        var exp2 = graphXPathExp(str, exp.operandoDer, contador);
        if (exp.tipo_operacion === TIPO_OPERACION.OP_AND) {
            str.push("\n            node" + NUMID + "[label=\"and\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_OR) {
            str.push("\n            node" + NUMID + "[label=\"or\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + exp1 + ";\n\n            node" + NUMID + " -> node" + exp2 + ";\n\n            ");
        }
    }
    else if (exp.tipo_primitivo === TIPO_PRIMITIVO.NUMERICO || exp.tipo_primitivo === TIPO_PRIMITIVO.CADENA) {
        str.push("\n        node" + NUMID + "[label=\"" + exp.valor + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        ");
    }
    else if (exp.dato.tipo === 0 || exp.dato.tipo === 5) {
        str.push("\n        node" + NUMID + "[label=\"" + exp.dato.valor + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        ");
    }
    return NUMID;
}
function graphXPathRuta2(str, path, contador) {
    var NUMID = contador.incrementarContador();
    str.push("\n    node" + NUMID + "[label=\"RUTA\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n    node" + contador.getContador() + "[label=\"" + path.dato.valor + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n    node" + NUMID + " -> node" + contador.incrementarContador() + ";\n    ");
    var ptr;
    if (path.mostrar != "") {
        ptr = graphXPathExp2(str, path.mostrar.exp, contador);
        str.push(" node" + NUMID + " -> node" + ptr + ";\n ");
    }
    if (path.ruta2 != undefined) {
        ptr = graphXPathRuta2(str, path.ruta2, contador);
        str.push(" node" + NUMID + " -> node" + ptr + ";\n ");
    }
    return NUMID;
}
function graphXPathExp2(str, exp, contador) {
    var NUMID = contador.incrementarContador();
    if (exp.clase === TIPO_EXPRESION.OP_ARITMETICA) {
        var exp1 = graphXPathExp2(str, exp.operandoIzq, contador);
        //let a = contador.getContador();
        //let b = contador.incrementarContador();
        var exp2 = graphXPathExp2(str, exp.operandoDer, contador);
        if (exp.tipo_operacion === TIPO_OPERACION.OP_SUMA) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"+\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_RESTA) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"-\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MULTIPLICACION) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"*\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_DIVISION) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"div\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MODULAR) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"%\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
    }
    else if (exp.clase === TIPO_EXPRESION.OP_RELACIONAL) {
        var exp1 = graphXPathExp2(str, exp.operandoIzq, contador);
        var exp2 = graphXPathExp2(str, exp.operandoDer, contador);
        if (exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_QUE) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\">\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_QUE) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"<\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_IGUAL) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\">=\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_IGUAL) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"<=\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_NO_IGUAL) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"!=\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_IGUAL) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"=\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
    }
    else if (exp.clase === TIPO_EXPRESION.OP_LOGICA) {
        var exp1 = graphXPathExp2(str, exp.operandoIzq, contador);
        var exp2 = graphXPathExp2(str, exp.operandoDer, contador);
        if (exp.tipo_operacion === TIPO_OPERACION.OP_AND) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"and\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_OR) {
            str.push("\n            node" + NUMID + "[label=\"EXP\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + contador.getContador() + "[label=\"or\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp1 + ";\n\n            node" + (contador.getContador() - 1) + " -> node" + exp2 + ";\n\n            ");
        }
    }
    else if (exp.tipo_primitivo === TIPO_PRIMITIVO.NUMERICO || exp.tipo_primitivo === TIPO_PRIMITIVO.CADENA) {
        str.push("\n        node" + NUMID + "[label=\"VALOR\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        node" + contador.getContador() + "[label=\"" + exp.valor + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        node" + NUMID + " -> node" + contador.incrementarContador() + ";\n        ");
    }
    else if (exp.dato.tipo === 0 || exp.dato.tipo === 5) {
        str.push("\n        node" + NUMID + "[label=\"VALOR\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        node" + contador.getContador() + "[label=\"" + exp.dato.valor + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        node" + NUMID + " -> node" + contador.incrementarContador() + ";\n        ");
    }
    return NUMID;
}
