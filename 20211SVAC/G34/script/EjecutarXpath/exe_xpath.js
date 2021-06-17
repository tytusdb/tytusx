"use strict";
function exepath(listainstrucciones) {
    var p = tds_xml_persistente[0];
    //console.log(p[i]);
    for (var j = 0; j < listainstrucciones.length; j++) {
        for (var i = 0; i < p.length; i++) {
            //console.log(listainstrucciones[j]);
            //console.log(p[i]);
            //if(listainstrucciones[j])
            console.log(getInfoXpath(listainstrucciones[j], p[i]));
            //break;
        }
    }
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
                            //console.log(entorno[i].simbolos[j]);
                            aux.push(entorno[i].simbolos[j]);
                        }
                    }
                    else {
                        aux.push(entorno[i].simbolos[j]);
                    }
                }
            }
            //console.log(entorno[i]);
            //if(listainstrucciones.ruta2.dato.valor)
        }
        //console.log(listainstrucciones.ruta2.dato.valor);
        if (listainstrucciones.mostrar != undefined) {
            var entornofiltrado = filtrarCondicion(aux, entorno, listainstrucciones);
            return entornofiltrado;
        }
        return aux;
    }
}
function filtrarCondicion(aux, entorno, listainstrucciones) {
    if (listainstrucciones.mostrar != undefined) {
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
            var actual = aux_1[_i];
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
                    entornofiltrado.push(aux);
                }
            }
        }
        if (entornofiltrado.length > 0) {
            //if(listainstrucciones.mostrar.mostrar != undefined){
            //    entornofiltrado =  filtrarCondicion(entornofiltrado,entorno,listainstrucciones.mostrar);
            //}
            return entornofiltrado;
        }
        return;
    }
}
