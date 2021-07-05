import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { NativaXQuery } from "../Traduccion/TranslateXQuery";
import { Consulta } from "../XPath/Consulta";
export class OrderBy {
    constructor(listaSort, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.listaSort = listaSort;
    }
    getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery) {
        let code = "";
        this.ejecutar(XQueryEnt, xmlEnt);
        //Declarar temp donde voy a guardar $id en el stack
        code += "/*---- INICIA ORDER BY --*/";
        let temporal = 'tq' + traductorXQuery.contT;
        code += '\n\t' + temporal + " = HQ;\n";
        traductorXQuery.contT++;
        //1. Obtener $id
        let n = 0;
        let criterioActual = this.listaSort[n];
        let listaSimbs = XQueryEnt.obtenerSimbolo(criterioActual.identifier);
        //2.5 Poner un -13 de referencia para saber donde inicia  y termina este simbolo del XQUERY
        code += '\tXQHeap[(int)HQ] = -13;\n';
        code += '\t HQ = HQ + 1;\n';
        if (listaSimbs instanceof Array) {
            for (let i = 0; i < listaSimbs.length; i++) {
                let s = listaSimbs[i];
                //Es una lista de simbolos.
                code += "\t/*--- TRASLADANDO " + s.nombre + " HACIA EL HEAP DEL XQUERY --- */\n";
                code += '\t H = stack[(int)' + s.posicion + ']; \n';
                //H tiene la posicion del heap (xml) donde inicia el simbolo.
                //2. Llamar a funcion para que escribe el simbolo en el heap del xpath.
                code += '\tfromHeapToXQHeap();\n';
                if (traductorXQuery.funcionesUtilizadas.indexOf(NativaXQuery.FROMHEAPTOXQHEAP) === -1) {
                    //Agregar a la lista de funciones que se utilizaran.
                    traductorXQuery.funcionesUtilizadas.push(NativaXQuery.FROMHEAPTOXQHEAP);
                }
            }
        }
        //2.5 Poner un -13 de referencia para saber donde inicia  y termina este simbolo del XQUERY
        code += '\tXQHeap[(int)HQ] = -13;\n';
        code += '\t HQ = HQ + 1;\n';
        code += '\t/*--- GUARDAR EN STACK DE XQUERY --*/\n';
        code += '\t\nXQStack[(int)SQ] = ' + temporal + ';\n';
        code += '\tSQ = SQ + 1;\n';
        return code;
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
        let Ordenada = new Simbolo(Tipo.XQ_VAR, criterioActual.identifier, listaOrdenada, this.linea, this.columna);
        XQEnt.sobreEscribirSimbolo(criterioActual.identifier, Ordenada);
    }
    ordenarPorCriterios(listaOrdenada, listaSimbs, n) {
        let listaTextos = [];
        let criterioActual = this.listaSort[n];
        for (let i = 0; i < listaSimbs.valor.length; i++) {
            let consultaTemp = new Consulta(criterioActual.listaNodos, this.linea, this.columna);
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
        let consultaTemp = new Consulta(nuevoCriterio.listaNodos, this.linea, this.columna);
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
            if (etiqueta.valor.tsimbolos[i].valor.getTipo() === Tipo.STRING) {
                return etiqueta.valor.tsimbolos[i].valor.getValor();
            }
        }
        return null;
    }
}
