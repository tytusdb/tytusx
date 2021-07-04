"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderBy = void 0;
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Consulta_1 = require("../XPath/Consulta");
class OrderBy {
    constructor(listaSort, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.listaSort = listaSort;
    }
    ejecutar(XQEnt, xmlEnt) {
        //Order by $x/book/title
        //this.listaSort[0].ejecutar(XQEnt, xmlEnt)
        let listaOrdenada = [];
        let n = 0;
        let criterioActual = this.listaSort[n];
        //Ordernar alfabeticamente o numericamente ascendente
        //1. Obtener $id
        let listaSimbs = XQEnt.obtenerSimbolo(criterioActual.identifier);
        //2. simb.valor tiene la lista de simbolos con la consulta.
        //Obtener la consulta completa (listanodos)
        listaOrdenada = this.ordenarPorCriterios(listaOrdenada, listaSimbs, n);
        //3. Guardar la lista ordenada en la tabla de simbolos
        let Ordenada = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_VAR, criterioActual.identifier, listaOrdenada, this.linea, this.columna);
        XQEnt.sobreEscribirSimbolo(criterioActual.identifier, Ordenada);
    }
    ordenarPorCriterios(listaOrdenada, listaSimbs, n) {
        let listaTextos = [];
        let criterioActual = this.listaSort[n];
        for (let i = 0; i < listaSimbs.valor.length; i++) {
            let consultaTemp = new Consulta_1.Consulta(criterioActual.listaNodos, this.linea, this.columna);
            let auxSimb = listaSimbs.valor[i].valor;
            let auxRespuesta = consultaTemp.ejecutar(auxSimb);
            for (let j = 0; j < auxRespuesta.length; j++) {
                let auxSimbRes = auxRespuesta[j];
                let textoCompare = this.obtenerTexto(auxSimbRes);
                if (textoCompare != null) {
                    //Comparar este texto con todos los anteriores en la lista.
                    let flag = false;
                    if (i > 0) {
                        for (let k = 0; k < i; k++) {
                            let numero = +textoCompare;
                            let numLista = +listaTextos[k];
                            if (!isNaN(numero) && !isNaN(numLista)) {
                                if (numLista > numero) {
                                    [listaTextos, listaOrdenada] = this.reOrdenar(listaTextos, textoCompare, listaOrdenada, listaSimbs.valor[i], k);
                                    flag = true;
                                    break;
                                }
                                else if (numLista === numero) {
                                    //Si son iguales, ver el proximo criterio de ordenamiento
                                    let sigCriterio = this.listaSort[n + 1];
                                    if (sigCriterio != undefined) {
                                        let desemp = this.desempatar(listaSimbs.valor[i], listaOrdenada[k], n + 1);
                                        if (desemp) {
                                            flag = true;
                                            [listaTextos, listaOrdenada] = this.reOrdenar(listaTextos, textoCompare, listaOrdenada, listaSimbs.valor[i], k);
                                            break;
                                        }
                                    }
                                }
                            }
                            else if (listaTextos[k] > textoCompare) {
                                //poner el nuevo texto en esta posicion k
                                //Desplazar lo que ya existia una posicioon
                                [listaTextos, listaOrdenada] = this.reOrdenar(listaTextos, textoCompare, listaOrdenada, listaSimbs.valor[i], k);
                                flag = true;
                                break;
                            }
                            else if (listaTextos[k] === textoCompare) {
                                //Si son iguales. Obtener el proximo criterio de ordenamiento
                                let sigCriterio = this.listaSort[n + 1];
                                if (sigCriterio != undefined) {
                                    let desemp = this.desempatar(listaSimbs.valor[i], listaOrdenada[k], n + 1);
                                    if (desemp) {
                                        flag = true;
                                        [listaTextos, listaOrdenada] = this.reOrdenar(listaTextos, textoCompare, listaOrdenada, listaSimbs.valor[i], k);
                                        break;
                                    }
                                }
                            }
                        }
                        if (!flag) {
                            listaTextos.push(textoCompare);
                            listaOrdenada.push(listaSimbs.valor[i]);
                        }
                    }
                    else {
                        listaTextos.push(textoCompare);
                        listaOrdenada.push(listaSimbs.valor[i]);
                    }
                }
            }
        }
        return listaOrdenada;
    }
    desempatar(valComparar, valYaEnLista, posCriterio) {
        let nuevoCriterio = this.listaSort[posCriterio];
        let consultaTemp = new Consulta_1.Consulta(nuevoCriterio.listaNodos, this.linea, this.columna);
        let auxSimb = valComparar.valor;
        let auxRespuesta = consultaTemp.ejecutar(auxSimb);
        let auxYaEnLista = valYaEnLista.valor;
        let auxRespuestaYaEnLista = consultaTemp.ejecutar(auxYaEnLista);
        for (let i = 0; i < auxRespuesta.length; i++) {
            let auxSimbRes = auxRespuesta[i];
            let textoCompare = this.obtenerTexto(auxSimbRes);
            if (textoCompare != null) {
                for (let j = 0; j < auxRespuestaYaEnLista.length; j++) {
                    let auxSimbYaRes = auxRespuestaYaEnLista[j];
                    let textoYaEnLista = this.obtenerTexto(auxSimbYaRes);
                    if (textoYaEnLista != null) {
                        let numero = +textoCompare;
                        let numLista = +textoYaEnLista;
                        if (!isNaN(numero) && !isNaN(numLista)) {
                            if (numLista > numero) {
                                return true;
                            }
                            else if (numLista === numero) {
                                let sigCriterio = this.listaSort[posCriterio + 1];
                                if (sigCriterio != undefined) {
                                    return this.desempatar(valComparar, valYaEnLista, posCriterio + 1);
                                }
                            }
                        }
                        else if (textoYaEnLista > textoCompare) {
                            return true;
                        }
                        else if (textoYaEnLista === textoCompare) {
                            let sigCriterio = this.listaSort[posCriterio + 1];
                            if (sigCriterio != undefined) {
                                return this.desempatar(valComparar, valYaEnLista, posCriterio + 1);
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
    reOrdenar(listaTextos, nuevoTexto, listaOrdenada, nuevoSimb, indiceReemplazar) {
        let nuevaListaText = [];
        let nuevaListaSimb = [];
        for (let i = 0; i < listaTextos.length; i++) {
            if (i === indiceReemplazar) {
                nuevaListaText.push(nuevoTexto);
                nuevaListaSimb.push(nuevoSimb);
            }
            nuevaListaText.push(listaTextos[i]);
            nuevaListaSimb.push(listaOrdenada[i]);
        }
        return [nuevaListaText, nuevaListaSimb];
    }
    obtenerTexto(etiqueta) {
        for (let i = 0; i < etiqueta.valor.tsimbolos.length; i++) {
            if (etiqueta.valor.tsimbolos[i].valor.getTipo() === Tipo_1.Tipo.STRING) {
                return etiqueta.valor.tsimbolos[i].valor.getValor();
            }
        }
        return null;
    }
}
exports.OrderBy = OrderBy;
