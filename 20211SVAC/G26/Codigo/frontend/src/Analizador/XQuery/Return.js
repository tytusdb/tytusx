import { NativaXQuery } from "../Traduccion/TranslateXQuery";
import { Consulta } from "../XPath/Consulta";
export class Return {
    constructor(tipoRet, identificador, listaNodos, html, ifthen, funcion, linea, columna) {
        this.tipo = tipoRet;
        this.funcion = funcion;
        this.html = html;
        this.listaNodos = listaNodos;
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
        this.ifthen = ifthen;
    }
    getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery) {
        let code = "";
        if (this.tipo === TipoReturn.NORMAL && this.identificador != undefined) {
            //Return normal solo obtener el simbolo.
            let simbolo = XQueryEnt.obtenerSimbolo(this.identificador);
            if (simbolo != null) {
                if (traductorXQuery.funcionesUtilizadas.indexOf(NativaXQuery.IMPRIMIRTEXTOXQ) === -1) {
                    //Agregar a la lista de funciones que se utilizaran.
                    traductorXQuery.funcionesUtilizadas.push(NativaXQuery.IMPRIMIRTEXTOXQ);
                }
                if (traductorXQuery.funcionesUtilizadas.indexOf(NativaXQuery.IMPRIMIRATRIBUTOXQ) === -1) {
                    //Agregar a la lista de funciones que se utilizaran.
                    traductorXQuery.funcionesUtilizadas.push(NativaXQuery.IMPRIMIRATRIBUTOXQ);
                }
                if (traductorXQuery.funcionesUtilizadas.indexOf(NativaXQuery.IMPRIMIRETIQUETAXQ) === -1) {
                    //Agregar a la lista de funciones que se utilizaran.
                    traductorXQuery.funcionesUtilizadas.push(NativaXQuery.IMPRIMIRETIQUETAXQ);
                }
                if (traductorXQuery.funcionesUtilizadas.indexOf(NativaXQuery.IMPRIMIRCONSULTAXQ) === -1) {
                    //Agregar a la lista de funciones que se utilizaran.
                    traductorXQuery.funcionesUtilizadas.push(NativaXQuery.IMPRIMIRCONSULTAXQ);
                }
                traductorXQuery.funcionesUtilizadas = traductorXQuery.funcionesUtilizadas.reverse();
                if (this.listaNodos != undefined && this.listaNodos.length > 0) {
                    console.log("Tsimb: ", simbolo);
                    //2.5 Poner un -13 de referencia para saber donde inicia  y termina este simbolo del XQUERY
                    code += '\t/*--- INICIA REDEFINICION EN RETURN ---*/';
                    ///TEmporal para saber donde guardar en el stack e iniciar impresion.
                    let temporal = 'tq' + traductorXQuery.contT;
                    code += '\n\t' + temporal + " = HQ;\n";
                    traductorXQuery.contT++;
                    code += '\tXQHeap[(int)HQ] = -13;\n';
                    code += '\t HQ = HQ + 1;\n';
                    let temp = new Consulta(this.listaNodos, this.linea, this.columna);
                    simbolo.valor.forEach((respAnterior) => {
                        let nuevaSalida = temp.ejecutar(respAnterior.valor);
                        console.log("NUEVALISAD: ", nuevaSalida);
                        nuevaSalida.forEach((s) => {
                            if (!(typeof s === "string")) {
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
                            else {
                                //Es cadena...
                                code += traductorXQuery.StringToHeap(s, simbolo.getNombre());
                            }
                        });
                    });
                    //2.5 Poner un -13 de referencia para saber donde inicia  y termina este simbolo del XQUERY
                    code += '\t/*--- TERMINA REDEFINICION EN RETURN ---*/\n';
                    code += '\tXQHeap[(int)HQ] = -13;\n';
                    code += '\t HQ = HQ + 1;\n';
                    //Guardar en el stack el inicio de este simbolo.
                    code += '\n\tXQStack[(int)SQ] = ' + temporal + ';\n';
                    code += '\tSQ = SQ + 1;\n';
                    simbolo.setPosicion(traductorXQuery.contSQ);
                    traductorXQuery.contSQ++;
                }
                code += "\n\t/* IMPRIMIR EL RETURN */\n";
                code += "\ttq" + traductorXQuery.contT + " = XQStack[(int)" + simbolo.posicion + "];\n";
                code += "\tHQ = tq" + traductorXQuery.contT + ";\n";
                traductorXQuery.contT = traductorXQuery.contT + 1;
                //code += '\tSP = SP + 1;\n'
                code += "\t imprimirConsultaXQ();\n";
            }
        }
        else if (this.tipo === TipoReturn.FUNCIONXQUERY && this.funcion != undefined) {
            let prueba = this.funcion.getValor(XQueryEnt);
            console.log("Prueba: ", prueba);
        }
        return code;
    }
    ejecutar(XQEnt, xmlEnt) {
        //Ej: return $x/book
        //1. Buscar variable $id
        let pruebaReturn = "";
        let listaReturn = [];
        if (this.tipo === TipoReturn.NORMAL && this.identificador != undefined) {
            console.log("Return normal.");
            let ListaSimb = XQEnt.obtenerSimbolo(this.identificador);
            if (ListaSimb != null) {
                if (this.listaNodos != undefined && this.listaNodos.length > 0) {
                    let temp = new Consulta(this.listaNodos, this.linea, this.columna);
                    ListaSimb.valor.forEach((simb) => {
                        let auxEntorno = simb.valor;
                        listaReturn = listaReturn.concat((temp.ejecutar(auxEntorno)));
                    });
                    pruebaReturn += temp.simbolosToString(listaReturn);
                }
                else {
                    let temp = new Consulta([], this.linea, this.columna);
                    if (ListaSimb.valor[0] instanceof Array) {
                        ListaSimb.valor.forEach((sx) => {
                            let elx = sx;
                            pruebaReturn += temp.simbolosToString(elx);
                        });
                    }
                    else {
                        pruebaReturn += temp.simbolosToString(ListaSimb.valor);
                    }
                }
            }
            else {
                console.log("ERROR - El simbolo: $", this.identificador, " no existe.");
            }
        }
        else if (this.tipo === TipoReturn.FUNCIONXQUERY && this.funcion != undefined) {
            let temp = new Consulta([], this.linea, this.columna);
            pruebaReturn += temp.simbolosToString(this.funcion.getValor(XQEnt).valor);
        }
        else if (this.tipo === TipoReturn.IFTHENELSE && this.ifthen != undefined) {
            let nue = this.ifthen.ejecutar(XQEnt, xmlEnt);
            let temp = new Consulta([], this.linea, this.columna);
            pruebaReturn += temp.simbolosToString(nue);
        }
        return pruebaReturn;
    }
}
export var TipoReturn;
(function (TipoReturn) {
    TipoReturn[TipoReturn["NORMAL"] = 0] = "NORMAL";
    TipoReturn[TipoReturn["HTML"] = 1] = "HTML";
    TipoReturn[TipoReturn["IFTHENELSE"] = 2] = "IFTHENELSE";
    TipoReturn[TipoReturn["FUNCIONXQUERY"] = 3] = "FUNCIONXQUERY";
})(TipoReturn || (TipoReturn = {}));
