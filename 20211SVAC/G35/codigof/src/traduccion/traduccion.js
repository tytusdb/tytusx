"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traduccion = void 0;
const Expresion_1 = require("../ejecucion/Expresion/Expresion");
const etiqueta_1 = require("../ejecucion/etiqueta");
const atributo_1 = require("../ejecucion/atributo");
const temporal_1 = require("./temporal");
const error_1 = require("../arbol/error");
const errores_1 = require("../arbol/errores");
const metodoC3D_1 = require("./metodoC3D");
const ejecucion_1 = require("../ejecucion/ejecucion");
const entornos_1 = require("../ejecucion/entornos");
class Traduccion {
    //TRADUCCION NUEVA
    constructor(raiz, raizXML, raiz2, raizxq) {
        this.contadorxml = 0;
        this.ArrayEtiquetas = new Array();
        this.arrayPosicionPadres = new Array();
        this.consolaSalidaXPATH = new Array();
        this.auxiliarEtiquetaResolverExpresion = null;
        this.controladorPredicado = false;
        this.controladorPredicadoInicio = false;
        this.controladorText = false;
        this.auxiliarAxe = "";
        this.dobleSimpleAxe = false;
        this.controladorAncestor = false;
        this.arrayAncestor = new Array();
        this.padresDobleAcceso = new Array();
        this.arrayMetodosC3D = new Array();
        this.P = 0;
        this.H = 0;
        this.arrayAuxiliarXquery = new Array();
        this.ListaMetodosXQUERY = new Map();
        this.temporalStringXQUERYenMain = "";
        this.posicionXQUERY1 = 0;
        this.miSalidaXQUERT = "";
        //OBJETOS XQUERY
        this.ArrayEtiquetasLineal = new Array();
        this.raiz = raiz;
        this.raiz2 = raiz2;
        this.raizXML = raizXML;
        this.contador = this.contadorxml = 0;
        this.contador2 = 0;
        this.dot = this.dotXML = '';
        this.dot2 = '';
        this.objetoActual = null;
        this.atributoActual = null;
        this.inicioRaiz = false;
        this.controladorDobleSimple = false;
        this.controladorAtributoImpresion = false;
        this.atributoID = '';
        this.contadorConsola = 0;
        this.arrayPosicionPadres.push(this.contadorConsola);
        this.auxiliarArrayPosicionPadres = -1;
        this.inicioPadre = 0;
        this.pathCompleto = true;
        this.auxiliarEtiquetaResolverExpresion = null;
        this.controladorPredicado = false;
        this.controladorPredicadoInicio = false;
        this.controladorText = false;
        this.auxiliarAxe = "";
        this.dobleSimpleAxe = false;
        this.controladorAncestor = false;
        this.ENCODING = "";
        this.codigo = '';
        this.codigoTemporal = "";
        this.temporalGlobal = new temporal_1.default("t");
        this.codigoTemporalMetodos = "";
        this.temporalPivote = "";
        this.simboloTemporalPivote = "";
        this.temporalPivote2 = "";
        this.operacionSuprema = "";
        this.contadorOperacionSuprema = 1;
        //XQUERY07
        this.raizXQUERY = raizxq;
        this.contadorStackXquery = 0;
        //XQUERY08
        const eje = new ejecucion_1.Ejecucion(raiz, raizXML, raizxq);
        eje.ejecutar();
        this.miSalidaXQUERT = eje.txtSalida;
        entornos_1.Entornos.getInstance().clear();
        errores_1.Errores.getInstance().clear();
    }
    getDot() {
        this.contador = 0;
        this.dot = "digraph G {\n";
        if (this.raiz != null) {
            this.generacionDot(this.raiz);
        }
        this.dot += "\n}";
        return this.dot;
    }
    getDotXQUERY() {
        this.contador = 0;
        this.dot = "digraph G {\n";
        if (this.raizXQUERY != null) {
            this.generacionDot(this.raizXQUERY);
        }
        this.dot += "\n}";
        return this.dot;
    }
    generacionDot(nodo) {
        if (nodo instanceof Object) {
            let idPadre = this.contador;
            this.dot += `node${idPadre}[label="${this.getStringValue(nodo.label)}"];\n`;
            if (nodo.hasOwnProperty("hijos")) {
                nodo.hijos.forEach((nodoHijo) => {
                    let idHijo = ++this.contador;
                    this.dot += `node${idPadre} -> node${idHijo};\n`;
                    if (nodoHijo instanceof Object) {
                        this.generacionDot(nodoHijo);
                    }
                    else {
                        this.dot += `node${idHijo}[label="${this.getStringValue(nodoHijo)}"];`;
                    }
                });
            }
        }
    }
    getStringValue(label) {
        if (label.startsWith("\"") || label.startsWith("'") || label.startsWith("`")) {
            return label.substr(1, label.length - 2);
        }
        return label;
    }
    traducir() {
        //PRIMERO RECORRERMOS XML
        const instrucciones = this.recorrerXML(this.raizXML);
        if (instrucciones instanceof Array) {
            instrucciones.forEach(element => {
                this.ArrayEtiquetas.push(element);
            });
        }
        //SEGUNDO DE LA LISTA GENERAMOS EL CODIGO 3 DIRECCIONES
        //DEL XML
        this.codigo += `#include <stdio.h>
    #include <math.h>
    
    double heap[30101999];
    double stack[30101999];
    double P;
    double H;
    double heapXPATH[30101999];
    double stackXPATH[30101999];
    double PXP;
    double HXP;
    double heapXQUERY[30101999];
    double stackXQUERY[30101999];
    double PXQ;
    double HXQ;
    `;
        this.LinealizarEtiquetas(); //CREAMOS UN SOLO ARRAY DEL ARRAY PRINCIPAL
        this.codigo += `//${this.ContadorString()}\n`;
        //CREAMOS UN CODIGO TEMPORAL QUE VAMOS A USAR MAS ADELANTOE
        // let codigoTemporal="";
        //XQUERY08
        let valorMedio = Math.round(this.ArrayEtiquetasLineal.length / 2), valorPrueba = 0;
        this.ArrayEtiquetasLineal.forEach(eti => {
            valorPrueba++;
            //XQUERY08
            if (valorPrueba == valorMedio) {
                this.codigoTemporal += this.AuxiliarGuardar();
                this.codigoTemporal += this.AuxiliarImpresionMAIN();
            }
            this.codigoTemporal += eti.DameC3D(this.temporalGlobal, this.ENCODING);
        });
        //XQUERY08
        //this.codigoTemporal += this.AuxiliarGuardar();
        this.auxiliarFor();
        this.textC3D();
        this.imprimirAtributoAnyC3D();
        this.ejecucionAxesC3D();
        this.comparacionValorEtiquetaC3D();
        this.comparacionValorC3D();
        this.ubicarPredicadoC3D();
        this.imprimirAtributoC3D();
        this.busquedaAtributoC3D();
        this.imprimirContenidoC3D();
        this.encontrarPrimerHijo();
        this.busquedaSimpleC3D();
        /*  //Hacemos una primera pasada para poder determinar que métodos se usaran en C3D
          this.primeraPasada(this.raiz);
          //Seguidamente eliminamos los elementos duplicados del array para NO escribir varias veces un mismo método
          let result = this.arrayMetodosC3D.filter((item,index)=>{
            return this.arrayMetodosC3D.indexOf(item) === index;
          })
          //console.log(result); //[1,2,6,5,9,'33']
          //En este punto recorremos el array de metodos para comenzar a escribirlos en el contenido del archivo de C3D
      
          for (let entry of result)
          {
            //Si existe alguna busqueda Simple se escribe el metodo
            if (entry == "busquedaSimple")
            {
              this.busquedaSimpleC3D();
              }
            }
    */
        this.recorrerArbolConsulta(this.raiz);
        //AHORA CREAMOS LA DECLARACION DE TEMPORALES
        //this.codigoTemporal += "//COMIENZA LA EJECUCION DE CONSULTA XPATH\n";
        //this.recorrerArbolConsulta(this.raiz);
        this.recorrerXquery(this.raizXQUERY, null);
        //ESO DEPENDE DE CUANTO HAYA AUMENTADO NUESTRA TEMPORAL GLOBAL
        this.codigo += `double `;
        for (let i = 0; i <= this.temporalGlobal.contador; i++) {
            this.codigo += `t${i},`;
            if (i + 1 > this.temporalGlobal.contador) {
                this.codigo += `t${i + 1},t${i + 2};\n`;
            }
        }
        //TEMPORAL
        //XQUERY08
        this.AuxiliarImpresion();
        this.codigo += "\n";
        this.codigo += this.codigoTemporalMetodos;
        this.codigo += "\n";
        //CREAMOS LA FUNCION MAIN Y METEMOS LA PRUEBA Y VER SI ESTA BIEN
        this.codigo += `int main(){\n`;
        //  this.codigo += codigoTemporal;
        this.codigo += this.codigoTemporal;
        this.codigo += `\n\n\n//CODIGO XQUERY MAIN\n`;
        this.codigo += this.temporalStringXQUERYenMain + "\n";
        this.codigo += `\n\n\n//CODIGO XQUERY MAIN\n`;
        //XQUERY08
        //CERRAMOS EL MAIN
        this.codigo += `return 0;\n}`;
        //TEMPORAL
        //XQUERY07
        this.codigo += `//EJEMPLO TRADUCCION XQUERY\n\n\n\n`;
        this.codigo += this.recorrerXquery(this.raizXQUERY, null);
        //this.codigo = this.recorrerXML(this.raiz, entorno);
        //FALTA RECORRER XQUERY
        return this.codigo;
    }
    //XML
    recorrerXML(nodo) {
        //S
        if (this.soyNodo('/', nodo)) {
            return this.recorrerXML(nodo.hijos[0]);
        }
        if (this.soyNodo('OBJETOS', nodo)) {
            let etiquetas = new Array();
            nodo.hijos.forEach((nodoHijo) => {
                if (this.soyNodo('OBJETO', nodoHijo)) {
                    //this.recorrer(nodoHijo);
                    let NuevaEtiqueta = this.recorrerXML(nodoHijo);
                    etiquetas.push(NuevaEtiqueta);
                }
                else if (this.soyNodo('COD', nodoHijo)) {
                    this.ENCODING = nodoHijo.hijos[0];
                }
            });
            return etiquetas;
        }
        if (this.soyNodo('TEXTO', nodo)) {
            if (this.soyNodo('TEXTO', nodo)) {
                return nodo.hijos[0].hijos[0];
            }
            return nodo.hijos[0];
        }
        if (this.soyNodo('COD', nodo)) {
            this.ENCODING = nodo.hijos[0];
            //alert(this.CODIGO);
        }
        if (this.soyNodo('ATRIBUTO', nodo)) {
            let tam = 0;
            let listaA = new Array();
            while (tam < nodo.hijos.length) {
                let nuevo = new atributo_1.Atributo(nodo.hijos[tam], nodo.hijos[tam + 1]);
                listaA.push(nuevo);
                tam += 2;
            }
            return listaA;
        }
        if (this.soyNodo('OBJETO', nodo)) {
            let id = nodo.hijos[0].label;
            let atributos = new Array();
            let textoo = "";
            let hijoEtiqueta = new Array();
            let pos = nodo.hijos[0].linea;
            nodo.hijos[0].hijos.forEach((nodoHijo) => {
                if (this.soyNodo('ATRIBUTO', nodoHijo)) {
                    atributos = this.recorrerXML(nodoHijo);
                }
                else if (this.soyNodo('TEXTO', nodoHijo)) {
                    textoo += " " + this.recorrerXML(nodoHijo);
                }
                else if (this.soyNodo('OBJETO', nodoHijo)) {
                    let Nuevo = this.recorrerXML(nodoHijo);
                    hijoEtiqueta.push(Nuevo);
                }
            });
            let NuevaEtiqueta = new etiqueta_1.Etiqueta(id, atributos, hijoEtiqueta, textoo, pos);
            return NuevaEtiqueta;
        }
    }
    BuscarHijoMayorXML() {
        let mayor = 0;
        this.ArrayEtiquetas.forEach(et => {
            if (et.buscarMayorHijo() > mayor) {
                mayor = et.buscarMayorHijo();
            }
        });
        return mayor;
    }
    BuscarLongitudMayor() {
        let mayor = 0, temp = 0;
        this.ArrayEtiquetas.forEach(et => {
            temp = et.buscaLongitudCadena();
            if (temp > mayor) {
                mayor = temp;
            }
        });
        return mayor;
    }
    LinealizarEtiquetas() {
        let NuevaLista = new Array();
        this.ArrayEtiquetas.forEach(element => {
            NuevaLista.push(...element.LinealizarHijos());
        });
        this.ArrayEtiquetasLineal = NuevaLista;
    }
    ContadorString() {
        let contador = 0;
        this.ArrayEtiquetas.forEach(element => {
            contador += element.valor.length;
            element.atributos.forEach(at => {
                contador += at.nombre.length;
                contador += at.valor.length;
            });
        });
        return contador;
    }
    //XML
    //------------------------------------------------------------------------XQUERY
    recorrerXquery(nodo, x) {
        if (this.tipoNodo('INICIO', nodo)) {
            this.recorrerXquery(nodo.hijos[0], null);
        }
        if (this.tipoNodo('S', nodo)) {
            this.recorrerXquery(nodo.hijos[0], null);
        }
        if (this.tipoNodo('L_INS', nodo)) {
            let contenido = "";
            for (var i = 0; i < nodo.hijos.length; i++) {
                contenido += this.recorrerXquery(nodo.hijos[i], null);
            }
            return contenido;
        }
        if (this.tipoNodo('DECLARACION', nodo)) {
            this.traducirDeclaracionVariable(nodo);
        }
        if (this.tipoNodo('FOR4', nodo)) {
            this.traducirFor(nodo, 0);
        }
        if (this.tipoNodo('FOR1', nodo)) {
            this.traducirFor1(nodo, 0);
        }
        //CREANDO FUNCIONES
        if (this.soyNodo('DECLARAR_FUNCION', nodo)) {
            //ESCRIBIMOS EN C3D LOS DATOS
            let contenido = "void " + nodo.hijos[1] + "(){\n";
            let NombreElemento = nodo.hijos[1].toLowerCase();
            let NumeroParametros = this.ContadorParametrosXQUERY(nodo.hijos[2]);
            //Creamos un metodo
            let Metodo = new metodoC3D_1.default(NumeroParametros, nodo.linea);
            //Lo Guardamos en nuestra lista
            this.ListaMetodosXQUERY.set(NombreElemento, Metodo);
            //contenido 
            nodo.hijos[5].hijos.forEach(hijo => {
                contenido += this.recorrerXquery(hijo, null);
            });
            //CERRAMOS CONTENIDO Y LO PONEMOS EN NUESTRA VARIABLE FINAL
            contenido += "return;\n}\n";
            this.codigoTemporalMetodos += contenido;
        }
        if (this.soyNodo('BLOQUE', nodo)) {
            if (nodo.hijos.length == 1) {
                return this.recorrerXquery(nodo.hijos[0], null);
            }
        }
        //POR CADA DECLARACION DE UN PARAMETRO
        //FIN CREANDO FUNCION
        if (this.soyNodo('S_IF', nodo)) {
            //AQUI BUSCAMOS DIRECTAMENTE LA EXPRESION;
            if (this.soyNodo('L_CONDICIONES', nodo.hijos[0])) {
                if (this.soyNodo('IF', nodo.hijos[0].hijos[0])) {
                    let Expres = nodo.hijos[0].hijos[0].hijos[0];
                    this.codigoTemporal += "\n\n\n\n\n\n\n" + this.resolverCondicion(Expres);
                    +"\n\n\n\n\n\n\n\n";
                }
            }
        }
        //EN EL CASO DEL WHERE
        if (this.soyNodo('where', nodo)) {
            this.codigoTemporal += this.resolverCondicion(nodo.hijos[0]).replace("goto", "return") + "\n";
        }
        //RESOLVIENDO VAL
        if (this.soyNodo('VAL', nodo)) {
            //TODO
            //REVISAR EL OTRO
            if (nodo.hijos.length == 1) {
                return this.recorrerXquery(nodo.hijos[0], null);
            }
            else {
                let cont = "";
                nodo.hijos.forEach(hijo => {
                    cont += this.recorrerXquery(hijo, null);
                });
                return cont;
            }
        }
        //SI VENGO DE VAL VOY ACA
        if (this.soyNodo('X', nodo)) {
            //TODO REVISAR HIJOS
            let c = "";
            nodo.hijos.forEach(e => {
                c += this.recorrerXquery(e, null);
            });
            return c;
        }
        if (this.soyNodo('L_EXP', nodo)) {
            let con = "";
            nodo.hijos.forEach(e => {
                con += this.recorrerXquery(e, null);
            });
            return con;
        }
        if (this.soyNodo('entero', nodo) || this.soyNodo('doble', nodo) || this.soyNodo('identificador', nodo) || this.soyNodo('booleano', nodo)) {
            //TODO
            //REVISAR HIJOS
            if (nodo.hijos.length == 1) {
                //ES RELATIVAMENTE LO MISMO, SOLO NECESITO EL VALOR COMO TAL
                return nodo.hijos[0];
            }
        }
        //variante id
        if (this.soyNodo('identificador2', nodo)) {
            if (nodo.hijos.length == 1) {
                return `$` + nodo.hijos[0];
            }
        }
        //XQUERY07 RESOLVER RELACIONALES
        if (this.soyNodo('>', nodo)) {
            this.temporalGlobal.aumentarEtiqueta();
            //Resolvemos la expresion de lado derecho que será el valor a comparar 
            let valorComparar = this.resolverExpresion(nodo.hijos[1]);
            let anterior = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + anterior + ";\n";
            let segnundo = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            //Obtenemos el identificador a buscar dentro de las etiquetas respectivas 
            let identificador = nodo.hijos[0].hijos[1].hijos[0].hijos[0].toString();
            //Escribimos el identificador del parametro que nos servira ara filtrar la informacion 
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXQ;\n";
            for (var z = 0; z < identificador.length; z++) {
                this.codigoTemporal += `heapXPATH[(int)HXP] = ${identificador.charCodeAt(z)};\n`;
                this.codigoTemporal += `HXP = HXP+1;\n`;
            }
            this.codigoTemporal += "heapXQUERY[(int)HXQ] =-1;\n";
            this.codigoTemporal += "HXQ = HXQ+1;\n";
            this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=" + this.temporalGlobal.retornarString() + ";\n";
            this.codigoTemporal += "PXQ = " + this.temporalGlobal.retornarString() + ";\n";
            this.contadorStackXquery++;
            this.temporalGlobal.aumentar();
            let tercero = this.temporalGlobal.retornarString();
            for (var i = x.contadorConsola; i < x.consolaSalidaXPATH.length; i++) {
                this.codigoTemporal += "P =" + x.consolaSalidaXPATH[i].posicion + ";\n";
                this.codigoTemporal += "PXP =" + segnundo + ";\n";
                this.codigoTemporal += "auxiliarFor();\n";
                this.temporalGlobal.aumentar();
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + tercero + ";\n";
                this.codigoTemporal += `if (${this.temporalGlobal.retornarString()}>${anterior}) goto ` + ";\n";
            }
            return `if (${this.temporalGlobal.retornarString()}>${this.temporalGlobal.retornarString()}) goto `;
        }
        if (this.soyNodo('<', nodo)) {
            this.temporalGlobal.aumentarEtiqueta();
            this.temporalGlobal.aumentarEtiqueta();
            //Resolvemos la expresion de lado derecho que será el valor a comparar 
            let valorComparar = this.resolverExpresion(nodo.hijos[1]);
            let anterior = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + anterior + ";\n";
            let segnundo = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            //Obtenemos el identificador a buscar dentro de las etiquetas respectivas 
            let identificador = nodo.hijos[0].hijos[1].hijos[0].hijos[0].toString();
            //Escribimos el identificador del parametro que nos servira ara filtrar la informacion 
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXQ;\n";
            for (var z = 0; z < identificador.length; z++) {
                this.codigoTemporal += `heapXPATH[(int)HXP] = ${identificador.charCodeAt(z)};\n`;
                this.codigoTemporal += `HXP = HXP+1;\n`;
            }
            this.codigoTemporal += "heapXQUERY[(int)HXQ] =-1;\n";
            this.codigoTemporal += "HXQ = HXQ+1;\n";
            this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=" + this.temporalGlobal.retornarString() + ";\n";
            this.codigoTemporal += "PXQ = " + this.temporalGlobal.retornarString() + ";\n";
            this.contadorStackXquery++;
            this.temporalGlobal.aumentar();
            let tercero = this.temporalGlobal.retornarString();
            for (var i = x.contadorConsola; i < x.consolaSalidaXPATH.length; i++) {
                this.codigoTemporal += "P =" + x.consolaSalidaXPATH[i].posicion + ";\n";
                this.codigoTemporal += "PXP =" + segnundo + ";\n";
                this.codigoTemporal += "auxiliarFor();\n";
                this.temporalGlobal.aumentar();
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + tercero + ";\n";
                this.codigoTemporal += `if (${this.temporalGlobal.retornarString()}<${anterior}) goto ` + ";\n";
            }
            return `if (${this.recorrerXquery(nodo.hijos[0], null)}<${this.recorrerXquery(nodo.hijos[1], null)}) goto `;
        }
        if (this.soyNodo('>=', nodo)) {
            this.temporalGlobal.aumentarEtiqueta();
            this.temporalGlobal.aumentarEtiqueta();
            //Resolvemos la expresion de lado derecho que será el valor a comparar 
            let valorComparar = this.resolverExpresion(nodo.hijos[1]);
            let anterior = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + anterior + ";\n";
            let segnundo = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            //Obtenemos el identificador a buscar dentro de las etiquetas respectivas 
            let identificador = nodo.hijos[0].hijos[1].hijos[0].hijos[0].toString();
            //Escribimos el identificador del parametro que nos servira ara filtrar la informacion 
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXQ;\n";
            for (var z = 0; z < identificador.length; z++) {
                this.codigoTemporal += `heapXPATH[(int)HXP] = ${identificador.charCodeAt(z)};\n`;
                this.codigoTemporal += `HXP = HXP+1;\n`;
            }
            this.codigoTemporal += "heapXQUERY[(int)HXQ] =-1;\n";
            this.codigoTemporal += "HXQ = HXQ+1;\n";
            this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=" + this.temporalGlobal.retornarString() + ";\n";
            this.codigoTemporal += "PXQ = " + this.temporalGlobal.retornarString() + ";\n";
            this.contadorStackXquery++;
            this.temporalGlobal.aumentar();
            let tercero = this.temporalGlobal.retornarString();
            for (var i = x.contadorConsola; i < x.consolaSalidaXPATH.length; i++) {
                this.codigoTemporal += "P =" + x.consolaSalidaXPATH[i].posicion + ";\n";
                this.codigoTemporal += "PXP =" + segnundo + ";\n";
                this.codigoTemporal += "auxiliarFor();\n";
                this.temporalGlobal.aumentar();
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + tercero + ";\n";
                this.codigoTemporal += `if (${this.temporalGlobal.retornarString()}>=${anterior}) goto ` + ";\n";
            }
            return `if (${this.recorrerXquery(nodo.hijos[0], null)}>=${this.recorrerXquery(nodo.hijos[1], null)}) goto `;
        }
        if (this.soyNodo('=', nodo)) {
            this.temporalGlobal.aumentarEtiqueta();
            this.temporalGlobal.aumentarEtiqueta();
            //Resolvemos la expresion de lado derecho que será el valor a comparar 
            let valorComparar = this.resolverExpresion(nodo.hijos[1]);
            let anterior = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + anterior + ";\n";
            let segnundo = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            //Obtenemos el identificador a buscar dentro de las etiquetas respectivas 
            let identificador = nodo.hijos[0].hijos[1].hijos[0].hijos[0].toString();
            //Escribimos el identificador del parametro que nos servira ara filtrar la informacion 
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXQ;\n";
            for (var z = 0; z < identificador.length; z++) {
                this.codigoTemporal += `heapXPATH[(int)HXP] = ${identificador.charCodeAt(z)};\n`;
                this.codigoTemporal += `HXP = HXP+1;\n`;
            }
            this.codigoTemporal += "heapXQUERY[(int)HXQ] =-1;\n";
            this.codigoTemporal += "HXQ = HXQ+1;\n";
            this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=" + this.temporalGlobal.retornarString() + ";\n";
            this.codigoTemporal += "PXQ = " + this.temporalGlobal.retornarString() + ";\n";
            this.contadorStackXquery++;
            this.temporalGlobal.aumentar();
            let tercero = this.temporalGlobal.retornarString();
            for (var i = x.contadorConsola; i < x.consolaSalidaXPATH.length; i++) {
                this.codigoTemporal += "P =" + x.consolaSalidaXPATH[i].posicion + ";\n";
                this.codigoTemporal += "PXP =" + segnundo + ";\n";
                this.codigoTemporal += "auxiliarFor();\n";
                this.temporalGlobal.aumentar();
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + tercero + ";\n";
                this.codigoTemporal += `if (${this.temporalGlobal.retornarString()}=${anterior}) goto ` + ";\n";
            }
            return `if (${this.recorrerXquery(nodo.hijos[0], null)}=${this.recorrerXquery(nodo.hijos[1], null)}) goto `;
        }
        if (this.soyNodo('!=', nodo)) {
            this.temporalGlobal.aumentarEtiqueta();
            this.temporalGlobal.aumentarEtiqueta();
            //Resolvemos la expresion de lado derecho que será el valor a comparar 
            let valorComparar = this.resolverExpresion(nodo.hijos[1]);
            let anterior = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + anterior + ";\n";
            let segnundo = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            //Obtenemos el identificador a buscar dentro de las etiquetas respectivas 
            let identificador = nodo.hijos[0].hijos[1].hijos[0].hijos[0].toString();
            //Escribimos el identificador del parametro que nos servira ara filtrar la informacion 
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXQ;\n";
            for (var z = 0; z < identificador.length; z++) {
                this.codigoTemporal += `heapXPATH[(int)HXP] = ${identificador.charCodeAt(z)};\n`;
                this.codigoTemporal += `HXP = HXP+1;\n`;
            }
            this.codigoTemporal += "heapXQUERY[(int)HXQ] =-1;\n";
            this.codigoTemporal += "HXQ = HXQ+1;\n";
            this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=" + this.temporalGlobal.retornarString() + ";\n";
            this.codigoTemporal += "PXQ = " + this.temporalGlobal.retornarString() + ";\n";
            this.contadorStackXquery++;
            this.temporalGlobal.aumentar();
            let tercero = this.temporalGlobal.retornarString();
            for (var i = x.contadorConsola; i < x.consolaSalidaXPATH.length; i++) {
                this.codigoTemporal += "P =" + x.consolaSalidaXPATH[i].posicion + ";\n";
                this.codigoTemporal += "PXP =" + segnundo + ";\n";
                this.codigoTemporal += "auxiliarFor();\n";
                this.temporalGlobal.aumentar();
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + tercero + ";\n";
                this.codigoTemporal += `if (${this.temporalGlobal.retornarString()}!=${anterior}) goto ` + ";\n";
            }
            return `if (${this.recorrerXquery(nodo.hijos[0], null)}!=${this.recorrerXquery(nodo.hijos[1], null)}) goto `;
        }
        if (this.soyNodo('<=', nodo)) {
            this.temporalGlobal.aumentarEtiqueta();
            this.temporalGlobal.aumentarEtiqueta();
            //Resolvemos la expresion de lado derecho que será el valor a comparar 
            let valorComparar = this.resolverExpresion(nodo.hijos[1]);
            let anterior = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + anterior + ";\n";
            let segnundo = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            //Obtenemos el identificador a buscar dentro de las etiquetas respectivas 
            let identificador = nodo.hijos[0].hijos[1].hijos[0].hijos[0].toString();
            //Escribimos el identificador del parametro que nos servira ara filtrar la informacion 
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXQ;\n";
            for (var z = 0; z < identificador.length; z++) {
                this.codigoTemporal += `heapXPATH[(int)HXP] = ${identificador.charCodeAt(z)};\n`;
                this.codigoTemporal += `HXP = HXP+1;\n`;
            }
            this.codigoTemporal += "heapXQUERY[(int)HXQ] =-1;\n";
            this.codigoTemporal += "HXQ = HXQ+1;\n";
            this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=" + this.temporalGlobal.retornarString() + ";\n";
            this.codigoTemporal += "PXQ = " + this.temporalGlobal.retornarString() + ";\n";
            this.contadorStackXquery++;
            this.temporalGlobal.aumentar();
            let tercero = this.temporalGlobal.retornarString();
            for (var i = x.contadorConsola; i < x.consolaSalidaXPATH.length; i++) {
                this.codigoTemporal += "P =" + x.consolaSalidaXPATH[i].posicion + ";\n";
                this.codigoTemporal += "PXP =" + segnundo + ";\n";
                this.codigoTemporal += "auxiliarFor();\n";
                this.temporalGlobal.aumentar();
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + tercero + ";\n";
                this.codigoTemporal += `if (${this.temporalGlobal.retornarString()}<=${anterior}) goto ` + ";\n";
            }
            return `if (${this.recorrerXquery(nodo.hijos[0], null)}<=${this.recorrerXquery(nodo.hijos[1], null)}) goto `;
        }
        //FIN RESOLVER RELACIONALES
        //INSTRUCCIONES A RETORNAR
        //LISTA PRINCIPAL 613
        if (this.soyNodo('SALIDA', nodo)) {
            let c = "//AQUI IMPRIMIMOS \n//TENEMOS PENDIENTE PONER LOS DATOS A MOSTRAR\n";
            //console.log(nodo.hijos[0]);
            c += this.recorrerXquery(nodo.hijos[0], null);
            //TODO REVISAR DONDE LO METEMOS
            //this.temporalStringXQUERYenMain+=c+'\n';
            return c;
        }
        if (this.soyNodo('LLAMADA_FUNCION', nodo)) {
            return this.GeneraLlamadaMetodo(nodo.hijos[0]);
        }
        return "";
        //  return `//es una prueba\n\n\n//es una prueba`;
    }
    //METODO RECORRER XQUERY
    //------------------------------------------------------------------------XQUERY
    /**
     * Funcion para determinar en que tipo de nodo estoy
     * @param label
     * @param nodo
     */
    soyNodo(label, nodo) {
        if (nodo == null || !(nodo instanceof Object)) {
            return false;
        }
        if (nodo.hasOwnProperty('label') && nodo.label != null) {
            return nodo.label === label;
        }
        return false;
    }
    /**
     * Recibe un nodo y retorna el valor de su hijo
     * @param nodo
     */
    getValorDeNodo(nodo) {
        if (nodo == null || !(nodo instanceof Object))
            return '';
        if (nodo.hasOwnProperty('hijos') && nodo.hijos instanceof Array && nodo.hijos[0] != null)
            return nodo.hijos[0];
        return '';
    }
    /**
     * Funcion que retorna un string con el nuevo nombre para la variable
     * @param e
     * @param id
     */
    getIdNuevo(e, id) {
        return `nv_${e.getNombreFuncionGeneradora()}_${id}`;
    }
    /**
     * Recibe un nodo INSTRUCCIONES y retorna true si alguno de sus hijos es una DECLARACION_FUNCION
     * @param nodo
     */
    tengoFuncionAnidada(nodo) {
        if (!(nodo instanceof Object))
            return false;
        return nodo.hijos.some((item) => item.label == 'DECLARACION_FUNCION');
    }
    /**
     * Retorna un elemento del enum TIPOS
     * @param tipo hijo de TIPO_VARIABLE_NATIVA
     * @param e entorno actual
     */
    getTipo(tipo, e) {
        if (tipo == 'string')
            return 0 /* STRING */;
        if (tipo == 'number')
            return 1 /* NUMBER */;
        if (tipo == 'boolean')
            return 2 /* BOOLEAN */;
        if (tipo == 'void')
            return 5 /* VOID */;
        //Si es un ID
        const variable = e.getVariable(tipo);
        if (variable != null) {
            return variable.getTipo();
        }
        return 4 /* SIN_ASIGNAR */;
    }
    //IMPLEMENTACION DE C3D PARA XPATH 
    //METODO PARA RECORRER EL ARBOL DE CONSULTAS 
    //METODO PARA RECORRER EL ARBOL DE CONSULTAS 
    recorrerArbolConsulta(nodo) {
        //NODO INICIO 
        if (this.tipoNodo('INICIO', nodo)) {
            this.recorrerArbolConsulta(nodo.hijos[0]);
        }
        //NODO L, ES LA LISTA DE CONSULTAS 
        if (this.tipoNodo('L', nodo)) {
            //SE RECORREN TODOS LOS NODOS QUE REPRESENTAN UNA CONSULTA 
            for (var i = 0; i < nodo.hijos.length; i++) {
                this.recorrerArbolConsulta(nodo.hijos[i]);
                this.reiniciar();
                // this.codigoTemporal += "xxxxxxxxxxxxxxxxxxxx-"+this.contadorConsola+"."+"\n";
            }
        }
        //PARA RECORRER TODOS LOS ELEMENTOS QUE COMPONEN LA CONSULTA 
        if (this.tipoNodo('CONSULTA', nodo)) {
            for (var i = 0; i < nodo.hijos.length; i++) {
                this.pathCompleto = false;
                this.controladorAtributoImpresion = false;
                this.controladorDobleSimple = false;
                this.controladorPredicado = false;
                this.recorrerArbolConsulta(nodo.hijos[i]);
            }
        }
        //PARA RECORRER TODOS LOS ELEMENTOS QUE COMPONEN LA CONSULTA 
        if (this.tipoNodo('VAL', nodo)) {
            for (var i = 0; i < nodo.hijos.length; i++) {
                this.pathCompleto = false;
                this.controladorAtributoImpresion = false;
                this.controladorDobleSimple = false;
                this.controladorPredicado = false;
                this.recorrerArbolConsulta(nodo.hijos[i]);
            }
        }
        //PARA VERIFICAR EL TIPO DE ACCESO, EN ESTE CASO // 
        if (this.tipoNodo('DOBLE', nodo)) {
            this.controladorDobleSimple = true;
            this.recorrerArbolConsulta(nodo.hijos[0]);
        }
        //PARA VERIFICAR EL TIPO DE ACCESO, EN ESTE CASO: /
        if (this.tipoNodo('SIMPLE', nodo)) {
            //Establecemos que se tiene un acceso de tipo DOBLE BARRA 
            this.controladorDobleSimple = false;
            this.recorrerArbolConsulta(nodo.hijos[0]);
        }
        //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES UN IDENTIFICADOR  
        if (this.tipoNodo('identificador', nodo)) {
            const str = nodo.hijos[0];
            this.busquedaElemento(str);
        }
        //PARA VERIFICAR SI LO QUE SE VA A ANALIZAR ES UN PREDICADO  
        if (this.tipoNodo('PREDICADO', nodo)) {
            this.controladorPredicado = true;
            const identificadorPredicado = nodo.hijos[0];
            //Primero se procede a la búsqueda del predicado
            this.codigoTemporal += "//Inicio ejecucion predicado\n";
            this.busquedaElemento(identificadorPredicado);
            //Seguidamente se resuelve la expresión
            let resultadoExpresion = this.resolverExpresion(nodo.hijos[1]);
            let anteriorPredicado = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + anteriorPredicado + ";\n";
            let predicadoVariable = this.temporalGlobal.retornarString();
            this.codigoTemporal += "PXP = " + predicadoVariable + ";\n";
            this.codigoTemporal += "ubicarPredicado();\n";
            //SI EL RESULTADO ES DE TIPO ETIQUETA
            if (resultadoExpresion.tipo == 4) {
                let datos = resultadoExpresion.valor;
                let a = datos[0];
                let b = datos[1];
                let c = datos[2];
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite; i++) {
                    // salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameID());
                    this.auxiliarPredicado(a, b, c, this.consolaSalidaXPATH[i]);
                }
            }
            //SI EL RESULTADO ES DE TIPO ETIQUETA
            if (resultadoExpresion.tipo == 1) {
                this.consolaSalidaXPATH.push(this.consolaSalidaXPATH[(this.contadorConsola + resultadoExpresion.valor) - 1]);
                this.contadorConsola = this.consolaSalidaXPATH.length - 1;
            }
            this.controladorPredicadoInicio = false;
        }
        //PARA VERIFICAR QUE ES UN PREDICADO DE UN ATRIBUTO
        if (this.tipoNodo('PREDICADO_A', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            const identificadorPredicadoAtributo = nodo.hijos[0];
            //RECORREMOS LO QUE VA DENTRO DE LLAVES PARA OBTENER EL VALOR
            //AQUI VA EL METODO RESOLVER EXPRESION DE SEBAS PUTO 
            return this.recorrerArbolConsulta(nodo.hijos[1]);
        }
        //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES UN ATRIBUTO  
        if (this.tipoNodo('atributo', nodo)) {
            this.controladorAtributoImpresion = true;
            const identificadorAtributo = nodo.hijos[0];
            if (this.inicioRaiz) {
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite; i++) {
                    let x = this.consolaSalidaXPATH[i];
                    //let nodoBuscarAtributo = this.consolaSalidaXPATH[this.consolaSalidaXPATH.length - 1];
                    let nodoBuscarAtributo = x;
                    //CODIGO DE 3 DIRECCIONES 
                    this.codigoTemporal += "P=" + nodoBuscarAtributo.posicion + ";\n";
                    let inicioRaizXML = this.temporalGlobal.retornarString();
                    this.temporalGlobal.aumentar();
                    //Ubicamos nuestra variabel a buscar en el principio del heap 
                    this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
                    //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
                    for (var z = 0; z < identificadorAtributo.length; z++) {
                        this.codigoTemporal += `heapXPATH[(int)HXP] = ${identificadorAtributo.charCodeAt(z)};\n`;
                        this.codigoTemporal += `HXP = HXP+1;\n`;
                    }
                    this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
                    this.codigoTemporal += `HXP = HXP+1;\n`;
                    let anteriorGlobal = this.temporalGlobal.retornarString();
                    this.codigoTemporal += "stackXPATH[(int)PXP]=" + anteriorGlobal + ";\n";
                    this.temporalGlobal.aumentar();
                    this.codigoTemporal += "busquedaAtributo();\n";
                    //CODIGO DE 3 DIRECCIONES 
                    //Se procede a la búsqueda de los atributos en todos los nodos
                    for (let entry of nodoBuscarAtributo.atributos) {
                        let atributoTemporal = entry;
                        let nombreAbributo = atributoTemporal.dameNombre();
                        if (nombreAbributo == identificadorAtributo) {
                            this.atributoID = identificadorAtributo;
                            this.pathCompleto = true;
                            //  this.contadorConsola = i;
                            //  this.consolaSalidaXPATH.push(nodoBuscarAtributo);
                        }
                    }
                    /*for (let entry of nodoBuscarAtributo.hijos) {
                      this.busquedaAtributo(entry, identificadorAtributo);
                    }*/
                    if (this.controladorDobleSimple) {
                        this.busquedaAtributo(x, identificadorAtributo);
                    }
                }
            }
            else {
                this.inicioRaiz = true;
                for (let entry of this.ArrayEtiquetas) {
                    let temp = entry;
                    //CODIGO DE 3 DIRECCIONES 
                    this.codigoTemporal += "P=" + temp.posicion + ";\n";
                    let inicioRaizXML = this.temporalGlobal.retornarString();
                    this.temporalGlobal.aumentar();
                    //Ubicamos nuestra variabel a buscar en el principio del heap 
                    this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
                    //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
                    for (var z = 0; z < identificadorAtributo.length; z++) {
                        this.codigoTemporal += `heapXPATH[(int)HXP] = ${identificadorAtributo.charCodeAt(z)};\n`;
                        this.codigoTemporal += `HXP = HXP+1;\n`;
                    }
                    this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
                    this.codigoTemporal += `HXP = HXP+1;\n`;
                    let anteriorGlobal = this.temporalGlobal.retornarString();
                    this.codigoTemporal += "stackXPATH[(int)PXP]=" + anteriorGlobal + ";\n";
                    this.temporalGlobal.aumentar();
                    this.codigoTemporal += "busquedaAtributo();\n";
                    //CODIGO DE 3 DIRECCIONES 
                    for (let entry2 of temp.atributos) {
                        let aTemp = entry2;
                        let nameAtt = aTemp.dameNombre();
                        if (nameAtt == identificadorAtributo) {
                            this.atributoID = identificadorAtributo;
                            this.pathCompleto = true;
                        }
                    }
                    if (this.controladorDobleSimple) {
                        this.busquedaAtributo(entry, identificadorAtributo);
                    }
                }
            }
        }
        //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES CUALQUIER ELEMENTO   
        if (this.tipoNodo('any', nodo)) {
            //SIGNIFICA ACCESO DOBLE
            if (this.controladorDobleSimple) {
                let controladorNuevoInicio = -1;
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite; i++) {
                    let temporal = this.consolaSalidaXPATH[i];
                    for (let entry of temporal.hijos) {
                        //insertamos TODOS los hijos
                        this.codigoTemporal += "P =" + entry.posicion + ";\n";
                        this.codigoTemporal += "imprimirContenido();\n";
                        this.consolaSalidaXPATH.push(entry);
                        if (controladorNuevoInicio == -1)
                            controladorNuevoInicio = this.consolaSalidaXPATH.length - 1;
                        this.complementoAnyElement(entry);
                    }
                }
                this.contadorConsola = controladorNuevoInicio;
                this.pathCompleto = true;
            }
            //SIGNIFICA ACCESO SIMPLE 
            else {
                //Controlamos el nuevo acceso para cuando coloquemos un nuevo elemento en la lista 
                let controladorNuevoInicio = -1;
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite; i++) {
                    let temporal = this.consolaSalidaXPATH[i];
                    for (let entry of temporal.hijos) {
                        //insertamos TODOS los hijos
                        this.consolaSalidaXPATH.push(entry);
                        if (controladorNuevoInicio == -1)
                            controladorNuevoInicio = this.consolaSalidaXPATH.length - 1;
                    }
                }
                this.contadorConsola = controladorNuevoInicio;
                this.pathCompleto = true;
            }
        }
        //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES UNA PALABRA RESERVADA  que simplicaria un AXE 
        if (this.tipoNodo('reservada', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            const identificador = nodo.hijos[0];
            this.auxiliarAxe = identificador;
            //VERIFICAMOS EL TIPO DE ACCESO DE AXE 
            if (this.controladorDobleSimple)
                this.dobleSimpleAxe = true;
        }
        if (this.tipoNodo('AXE', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            if (this.dobleSimpleAxe)
                this.controladorDobleSimple = true;
            this.temporalGlobal.aumentar();
            //Ubicamos nuestra variabel a buscar en el principio del heap 
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
            //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
            for (var i = 0; i < this.auxiliarAxe.length; i++) {
                this.codigoTemporal += `heapXPATH[(int)HXP] = ${this.auxiliarAxe.charCodeAt(i)};\n`;
                this.codigoTemporal += `HXP = HXP+1;\n`;
            }
            this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
            this.codigoTemporal += `HXP = HXP+1;\n`;
            this.codigoTemporal += "PXP =" + this.temporalGlobal.retornarString() + ";\n";
            this.codigoTemporal += "ejecutarAxe();\n";
            //Si Solicita implementar el axe child
            if (this.auxiliarAxe == "child") {
                //ESCRIBIMOS LOS IFS RESPECTIVOS 
                this.recorrerArbolConsulta(nodo.hijos[0]);
            }
            //Si necesitsa implementar el axe attribute
            if (this.auxiliarAxe == "attribute") {
                //Le cambiamos la etiqueta de identificador a atributo para fines de optimizacion de codigo
                nodo.hijos[0].label = "atributo";
                //Escribimos el codigo en C3D para la ejecución del axe atributo 
                this.recorrerArbolConsulta(nodo.hijos[0]);
            }
            //Si necesitsa implementar el ancestor
            if (this.auxiliarAxe == "ancestor") {
                //Va a resolver el predicado o identificador que pudiese venir 
                this.recorrerArbolConsulta(nodo.hijos[0]);
            }
            if (this.auxiliarAxe == "descendant") {
                this.controladorDobleSimple = true;
                this.recorrerArbolConsulta(nodo.hijos[0]);
            }
            //Reiniciamos la variable cuando ya se acabe el axe
            this.auxiliarAxe = "";
        }
        //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES UN ATRIBUTO  
        if (this.tipoNodo('X', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            //const identificadorAtributo = nodo.hijos[0] as string;
            this.controladorDobleSimple = true;
            this.recorrerArbolConsulta(nodo.hijos[0]);
            /*
            EN ESTA PARTE SE VA A PROCEDER PARA IR A BUSCAR EL ELEMENTO SEGÚN TIPO DE ACCESO
            */
        }
        //PARA VERIFICAR SI SE NECESITAN TODOS LOS ATRIBUTOS DEL NODO ACTUAL    
        if (this.tipoNodo('any_att', nodo)) {
            this.controladorText = true;
            const identificadorAtributo = nodo.hijos[0];
            //Verificamos el tipo de acceso
            //Significa acceso con prioridad
            if (this.controladorDobleSimple) {
                //VERIFICAMOS DESDE DONDE INICIAMOS
                if (!this.inicioRaiz) {
                    this.inicioRaiz = true;
                    for (let entry of this.ArrayEtiquetas) {
                        this.codigoTemporal += "P =" + entry.posicion + ";\n";
                        this.codigoTemporal += "imprimirAtributoAny();\n";
                        for (let att of entry.atributos) {
                            //  salidaXPATH.getInstance().push(att.dameNombre()+"="+att.dameValor());
                        }
                        this.complementoAnnyAtributte(entry);
                    }
                }
                else {
                    let limite = this.consolaSalidaXPATH.length;
                    for (var i = this.contadorConsola; i < limite; i++) {
                        let entry = this.consolaSalidaXPATH[i];
                        this.codigoTemporal += "P =" + entry.posicion + ";\n";
                        this.codigoTemporal += "imprimirAtributoAny();\n";
                        for (let att of entry.atributos) {
                            //  salidaXPATH.getInstance().push(att.dameNombre()+"="+att.dameValor());
                        }
                        this.complementoAnnyAtributte(entry);
                    }
                }
            }
            //Acceso sin prioridad
            else {
                if (!this.inicioRaiz) {
                    for (let entry of this.ArrayEtiquetas) {
                        this.codigoTemporal += "P =" + entry.posicion + ";\n";
                        this.codigoTemporal += "imprimirAtributoAny();\n";
                        for (let att of entry.atributos) {
                            //   salidaXPATH.getInstance().push(att.dameNombre()+"="+att.dameValor());
                        }
                    }
                }
                else {
                    let limite = this.consolaSalidaXPATH.length;
                    for (var i = this.contadorConsola; i < limite; i++) {
                        let entry = this.consolaSalidaXPATH[i];
                        this.codigoTemporal += "P =" + entry.posicion + ";\n";
                        this.codigoTemporal += "imprimirAtributoAny();\n";
                        for (let att of entry.atributos) {
                            //  salidaXPATH.getInstance().push(att.dameNombre()+"="+att.dameValor());
                        }
                    }
                }
            }
        } //FIN ANNY ATT
        //PARA VERIFICAR SI SE ESTÁ INVOCANDO A LA FUNCIÓN TEXT()    
        if (this.tipoNodo('text', nodo)) {
            this.controladorText = true;
            const identificadorAtributo = nodo.hijos[0];
            //Si se necesita el texto de el actual y los descendientes
            if (this.controladorDobleSimple) {
                for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length; i++) {
                    /*if (this.consolaSalidaXPATH[i].dameValor() == "" || this.consolaSalidaXPATH[i].dameValor() == " ") {
                        
                    } else {
                      //     salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameValor());
                    }*/
                    this.codigoTemporal += "P=" + this.consolaSalidaXPATH[i].posicion + ";\n";
                    this.codigoTemporal += "text();\n";
                    this.complementoText(this.consolaSalidaXPATH[i]);
                }
            }
            else {
                //si necesita solo el texto del actual 
                for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length; i++) {
                    /*  if (this.consolaSalidaXPATH[i].dameValor() == "" || this.consolaSalidaXPATH[i].dameValor() == " ") {
                          
                      } else {
                        //salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameValor());
                      }*/
                    this.codigoTemporal += "P=" + this.consolaSalidaXPATH[i].posicion + ";\n";
                    this.codigoTemporal += "text();\n";
                }
            }
        }
        //PARA VERIFICAR SI ES EL TIPO DE ACCESO AL PADRE: ":"  
        if (this.tipoNodo('puntos', nodo)) {
            const cantidad = nodo.hijos[0];
            //DOSPUNTOSSSSSSSSS
            if (cantidad.length == 2) {
                this.pathCompleto = true;
                if (this.auxiliarArrayPosicionPadres == -1) {
                    this.auxiliarArrayPosicionPadres = this.arrayPosicionPadres.length - 1;
                }
                for (var i = this.auxiliarArrayPosicionPadres; i >= 0; i--) {
                    let contadorHermanos = this.arrayPosicionPadres[i];
                    let controladorInicio = 0;
                    if (i > 0) {
                        while (contadorHermanos != this.arrayPosicionPadres[i - 1]) {
                            this.consolaSalidaXPATH.push(this.consolaSalidaXPATH[contadorHermanos]);
                            this.codigoTemporal += "P =" + this.consolaSalidaXPATH[contadorHermanos].posicion + ";\n";
                            if (controladorInicio == 0) {
                                this.contadorConsola = this.consolaSalidaXPATH.length - 1;
                            }
                            controladorInicio++;
                            contadorHermanos--;
                            this.auxiliarArrayPosicionPadres = contadorHermanos;
                        }
                    }
                    else {
                        while (contadorHermanos >= 0) {
                            this.consolaSalidaXPATH.push(this.consolaSalidaXPATH[contadorHermanos]);
                            this.codigoTemporal += "P =" + this.consolaSalidaXPATH[contadorHermanos].posicion + ";\n";
                            if (controladorInicio == 0) {
                                this.contadorConsola = this.consolaSalidaXPATH.length - 1;
                            }
                            controladorInicio++;
                            contadorHermanos--;
                            this.auxiliarArrayPosicionPadres = contadorHermanos;
                        }
                    }
                    break;
                }
                this.codigoTemporal += "busquedaSimple();\n";
            }
            //SIGNIFICA QUE TIENE SOLO UN PUNTO 
            else {
                this.pathCompleto = true;
            }
            ///DOS PUNTOOOOOOOOOOOOOOOOS
        }
    } //FIN DE METODO PARA RECORRER EL ARBOL DE CONSULTAS 
    complementoAnnyAtributte(objeto) {
        for (let a of objeto.hijos) {
            this.codigoTemporal += "P =" + a.posicion + ";\n";
            this.codigoTemporal += "imprimirAtributoAny();\n";
            for (let b of a.atributos) {
                // salidaXPATH.getInstance().push(b.dameNombre()+"="+b.dameValor());
            }
            this.complementoAnnyAtributte(a);
        }
    }
    complementoAnyElement(objeto) {
        for (let entry of objeto.hijos) {
            this.codigoTemporal += "P =" + entry.posicion + ";\n";
            this.codigoTemporal += "imprimirContenido();\n";
            this.consolaSalidaXPATH.push(entry);
            this.complementoAnyElement(entry);
        }
    }
    //Metodo para complementar la implementación de text
    complementoText(nodo) {
        //Se recorren los nodos de la etiqueta para imprimir su valor si tuvieran
        for (let entry of nodo.hijos) {
            //Señales de que NO tiene valor
            /* if (entry.dameValor() == "" || entry.dameValor() == " ") {
                 
             } else {
               //Se imprime de una vez en la consola final
               //  salidaXPATH.getInstance().push(entry.dameValor());
             }*/
            this.codigoTemporal += "P=" + entry.posicion + ";\n";
            this.codigoTemporal += "text();\n";
            //Buscamos recursivamente
            this.complementoText(entry);
        }
    }
    /**METODO PARA COMPLEMENTAR LA BUSQUEDA DEL VALOR DE UN PREDICADO
      * Funcion para determinar en que tipo de nodo estoy
      * @param tipo
      * @param nombre
      * @param valor
      * @param objeto
      */
    auxiliarPredicado(tipo, nombre, valor, objeto) {
        //Verificamos si lo que se buscó en el predicado es un atributo o etiqueta
        if (tipo == "atributo") {
            //Recorremos los atributos del objecto en cuestion
            for (let att of objeto.atributos) {
                //Si los nombres de atributos son iguales
                if (att.dameNombre() == nombre) {
                    //Si los valores de los atributos son iguales al valor ingresado en el predicado
                    if (att.dameValor() == valor) {
                        //Guardamos el elemento que contiene el atributo
                        this.consolaSalidaXPATH.push(objeto);
                        //Esta linea de codigo para para verificar el nuevo punto de inicio de la consola final, para no redundar
                        if (!this.controladorPredicadoInicio) {
                            this.contadorConsola = this.consolaSalidaXPATH.length - 1;
                            this.controladorPredicadoInicio = true;
                        }
                    } //Cierre comparacion valor
                } //Cierre comparacion nombre
            } //Cierre for para recorrer atributos
            for (let entry of objeto.hijos) {
                for (let att of entry.atributos) {
                    //Si los nombres de atributos son iguales
                    if (att.dameNombre() == nombre) {
                        //Si los valores de los atributos son iguales al valor ingresado en el predicado
                        if (att.dameValor() == valor) {
                            //Guardamos el elemento que contiene el atributo
                            this.consolaSalidaXPATH.push(objeto);
                            //Esta linea de codigo para para verificar el nuevo punto de inicio de la consola final, para no redundar
                            if (!this.controladorPredicadoInicio) {
                                this.contadorConsola = this.consolaSalidaXPATH.length - 1;
                                this.controladorPredicadoInicio = true;
                            }
                        } //Cierre comparacion valor
                    } //Cierre comparacion nombre
                } //Ci
            }
        }
        else {
            //Si lo que se busca es una etiqueta en el predicado
            for (let entry of objeto.hijos) {
                //Recorremos cada uno de los hijos y verificamos el nombre de la etiqueta
                if (entry.dameID() == nombre) {
                    //Sí hay concidencia, se procede a examinar si el valor es el buscado
                    if (entry.dameValor().substring(1) == valor) {
                        //Agregamos el objeto a la consola de salida
                        this.consolaSalidaXPATH.push(objeto);
                        //Al iguar que n fragmento anteriores, se establece el nuevo punto de inicio
                        if (!this.controladorPredicadoInicio) {
                            this.contadorConsola = this.consolaSalidaXPATH.length - 1;
                            this.controladorPredicadoInicio = true;
                        } //cierreControladorInicio
                    } //CIERRE VALOR
                } //CIERREID
            } //CIERRE RECORRIDO DE HIJOS
        }
        //La siguiente linea comentada es para recursividad, pendiente de uso.
    }
    /**
      * Funcion para determinar en que tipo de nodo estoy
      * @param etiqueta
      * @param nodoActual
      */
    tipoNodo(etiqueta, nodoActual) {
        if (nodoActual == null || !(nodoActual instanceof Object)) {
            return false;
        }
        if (nodoActual.hasOwnProperty('label') && nodoActual.label != null) {
            return nodoActual.label === etiqueta;
        }
        return false;
    }
    /**
     * Funcion para determinar en que tipo de nodo estoy
     * @param nombre
     *
     */
    //METODO PARA BUSCAR UN ELEMENTO EN LA TABLA DE SIMBOLOS
    busquedaElemento(nombre) {
        /*
        Se dividirá la búsqueda según el tipo de acceso / o //
        */
        if (!this.controladorDobleSimple) {
            //VERIFICAMOS SI EL OBJETO A BUSCAR PARTE DE LA RAIZ O NO 
            if (!this.inicioRaiz) {
                //SE COMIENZA EN LA RAIZ 
                for (let entry of this.ArrayEtiquetas) {
                    //Usamos una variable auxiliar para almacenar el objeto en cuestion
                    let auxiliarBusqueda = entry;
                    //Dado que es la raiz, ubicamos la posición en STACK en donde se encuentra el principio de la misma Y la asignados a una variable temporal
                    this.codigoTemporal += "P=" + auxiliarBusqueda.posicion + ";\n";
                    let inicioRaizXML = this.temporalGlobal.retornarString();
                    this.temporalGlobal.aumentar();
                    //Ubicamos nuestra variabel a buscar en el principio del heap 
                    this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
                    //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
                    for (var i = 0; i < nombre.length; i++) {
                        this.codigoTemporal += `heapXPATH[(int)HXP] = ${nombre.charCodeAt(i)};\n`;
                        this.codigoTemporal += `HXP = HXP+1;\n`;
                    }
                    this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
                    this.codigoTemporal += `HXP = HXP+1;\n`;
                    let anteriorGlobal = this.temporalGlobal.retornarString();
                    this.codigoTemporal += "stackXPATH[(int)PXP]=" + anteriorGlobal + ";\n";
                    this.temporalGlobal.aumentar();
                    this.codigoTemporal += "busquedaSimple();\n";
                    //Verificamos si encontramos el elemento
                    if (auxiliarBusqueda.id == nombre) {
                        this.pathCompleto = true;
                        //Si se encuentra, significa que la siguiente busqueda se debe hacer a partir de este elemento
                        this.consolaSalidaXPATH.push(auxiliarBusqueda);
                        //Establecemos que ya no comience desde la raiz
                        this.inicioRaiz = true;
                    }
                }
            }
            //Ahora se procede a iniciar desde el elemento padre en caso de ya haberlo encontrado en la raiz 
            else {
                this.temporalGlobal.aumentar();
                //this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=stackXPATH[(int)PXP];";
                //this.codigoTemporalMetodos += "PXP = PXP + 1;\n";
                //Iniciamos la búsqueda en el último elementro encontrado dentro de la lista final
                let auxiliarContadorConsola = 0;
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite; i++) {
                    let auxiliarBusqueda = this.consolaSalidaXPATH[i];
                    //C3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3D
                    //C3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3DC3D
                    //Examinamos cada uno de los hijos de ese elemento
                    for (var j = 0; j < auxiliarBusqueda.hijos.length; j++) {
                        //Si coincide la busqueda, se agrega a la lista final y se activan las banderas respectivas
                        let temporal = auxiliarBusqueda.hijos[j];
                        //C3D/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                        this.codigoTemporal += "encontrarPrimerHijo();\n";
                        this.codigoTemporal += "P=" + temporal.posicion + ";\n";
                        let inicioRaizXML = this.temporalGlobal.retornarString();
                        this.temporalGlobal.aumentar();
                        //Ubicamos nuestra variabel a buscar en el principio del heap 
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
                        //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
                        for (var x = 0; x < nombre.length; x++) {
                            this.codigoTemporal += `heapXPATH[(int)HXP] = ${nombre.charCodeAt(x)};\n`;
                            this.codigoTemporal += `HXP = HXP+1;\n`;
                        }
                        this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
                        this.codigoTemporal += `HXP = HXP+1;\n`;
                        let anteriorGlobal = this.temporalGlobal.retornarString();
                        this.codigoTemporal += "stackXPATH[(int)PXP]=" + anteriorGlobal + ";\n";
                        this.temporalGlobal.aumentar();
                        this.codigoTemporal += "busquedaSimple();\n";
                        //C3D
                        ///////////////////////////////////////////////////
                        if (temporal.id == nombre) {
                            this.pathCompleto = true;
                            this.consolaSalidaXPATH.push(temporal);
                            auxiliarContadorConsola = i;
                        }
                    }
                }
                //Fragmento que nos sirve para ir guardando los padres asi como el nuevo inicio de la lista
                this.contadorConsola = auxiliarContadorConsola;
                this.arrayPosicionPadres.push(this.contadorConsola);
                this.contadorConsola++;
                // this.codigoTemporal += "//CONTADOR: " + this.contadorConsola + "\n";
            }
        }
        else { //ELSE PARA BUSCAR CON EL TIPO DE ACCESO //
            //nuevamente verificamos si se inicia en la raiz o en el elemento en cuestion 
            if (!this.inicioRaiz) {
                //this.arrayPosicionPadres.push(0);
                //En caso de iniciar en la raiz partimos del array de etiquetas 
                for (let entry of this.ArrayEtiquetas) {
                    let auxiliarBusqueda = entry;
                    //C3D*************************************************************************************************************
                    //Dado que es la raiz, ubicamos la posición en STACK en donde se encuentra el principio de la misma Y la asignados a una variable temporal
                    this.codigoTemporal += "P=" + auxiliarBusqueda.posicion + ";\n";
                    let inicioRaizXML = this.temporalGlobal.retornarString();
                    this.temporalGlobal.aumentar();
                    //Ubicamos nuestra variabel a buscar en el principio del heap 
                    this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
                    //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
                    for (var i = 0; i < nombre.length; i++) {
                        this.codigoTemporal += `heapXPATH[(int)HXP] = ${nombre.charCodeAt(i)};\n`;
                        this.codigoTemporal += `HXP = HXP+1;\n`;
                    }
                    this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
                    this.codigoTemporal += `HXP = HXP+1;\n`;
                    let anteriorGlobal = this.temporalGlobal.retornarString();
                    this.codigoTemporal += "stackXPATH[(int)PXP]=" + anteriorGlobal + ";\n";
                    this.temporalGlobal.aumentar();
                    this.codigoTemporal += "busquedaSimple();\n";
                    //C3D*************************************************************************************************************
                    //Verificamos si encontramos el elemento
                    if (auxiliarBusqueda.id == nombre) {
                        this.pathCompleto = true;
                        //Agregamos a la lista el elementro encontrado
                        this.consolaSalidaXPATH.push(auxiliarBusqueda);
                        //Establecemos que ya no comience desde la raiz
                    }
                    //Llamamos al método recursivo ya que al ser tipo de acceso doble tiene que buscar en todos los lados posibles
                    this.auxiliarDoble(auxiliarBusqueda, nombre);
                }
                //Activamos la bandera para ya no iniciar desde la raiz sino en el ultimo elementro encontrado
                this.inicioRaiz = true;
            }
            else {
                //Establecemos el limite de inicio y fin
                this.temporalGlobal.aumentar();
                let auxiliarContadorConsola = 0;
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite; i++) {
                    let auxiliarBusqueda = this.consolaSalidaXPATH[i];
                    //Revisamos cada uno de los hijos
                    for (var j = 0; j < auxiliarBusqueda.hijos.length; j++) {
                        //Si coinciden los valores respectivos
                        let temporal = auxiliarBusqueda.hijos[j];
                        this.codigoTemporal += "encontrarPrimerHijo();\n";
                        this.codigoTemporal += "P=" + temporal.posicion + ";\n";
                        let inicioRaizXML = this.temporalGlobal.retornarString();
                        this.temporalGlobal.aumentar();
                        //Ubicamos nuestra variabel a buscar en el principio del heap 
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
                        //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
                        for (var x = 0; x < nombre.length; x++) {
                            this.codigoTemporal += `heapXPATH[(int)HXP] = ${nombre.charCodeAt(x)};\n`;
                            this.codigoTemporal += `HXP = HXP+1;\n`;
                        }
                        this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
                        this.codigoTemporal += `HXP = HXP+1;\n`;
                        let anteriorGlobal = this.temporalGlobal.retornarString();
                        this.codigoTemporal += "stackXPATH[(int)PXP]=" + anteriorGlobal + ";\n";
                        this.temporalGlobal.aumentar();
                        this.codigoTemporal += "busquedaSimple();\n";
                        if (temporal.id == nombre) {
                            //Guardamos el nuevo elemento a mostrar o examinar y actualizamos el punto de inicio de la lista final
                            this.pathCompleto = true;
                            this.consolaSalidaXPATH.push(temporal);
                            auxiliarContadorConsola = i;
                        }
                        //Se llama al método recursivo para iniciar la busqueda a fondo 
                        this.auxiliarDoble(temporal, nombre);
                    }
                }
                //Establecemos los nuevos puntos de inicio asi como los padres
                this.contadorConsola = auxiliarContadorConsola;
                this.arrayPosicionPadres.push(this.contadorConsola);
                this.contadorConsola++;
            } //fin inicio raiz DOBLE
        } //FIN DE TIPO DE ACCESO://
    } //Fin del metodo para la búsqueda de un elemento
    /**
     *
     * @param objeto
     * @param nombre
     *
     */
    //METODO AUXILIAR PARA LA BUSQUEDA CON ACCESO //
    auxiliarDoble(objeto, nombre) {
        //Metodo recursivo que nos servira para buscar en todas las partes dentro de la raiz 
        for (let entry of objeto.hijos) {
            let auxiliarBusqueda = entry;
            //C3D*************************************************************************************************************
            //Dado que es la raiz, ubicamos la posición en STACK en donde se encuentra el principio de la misma Y la asignados a una variable temporal
            this.codigoTemporal += "encontrarPrimerHijo();\n";
            this.codigoTemporal += "P=" + auxiliarBusqueda.posicion + ";\n";
            let inicioRaizXML = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            //Ubicamos nuestra variabel a buscar en el principio del heap 
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
            //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
            for (var i = 0; i < nombre.length; i++) {
                this.codigoTemporal += `heapXPATH[(int)HXP] = ${nombre.charCodeAt(i)};\n`;
                this.codigoTemporal += `HXP = HXP+1;\n`;
            }
            this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
            this.codigoTemporal += `HXP = HXP+1;\n`;
            let anteriorGlobal = this.temporalGlobal.retornarString();
            this.codigoTemporal += "stackXPATH[(int)PXP]=" + anteriorGlobal + ";\n";
            this.temporalGlobal.aumentar();
            this.codigoTemporal += "busquedaSimple();\n";
            //C3D*************************************************************************************************************
            this.auxiliarDoble(auxiliarBusqueda, nombre);
            //Verificamos si encontramos el elemento
            if (auxiliarBusqueda.id == nombre) {
                // this.padresDobleAcceso.push(objeto);
                this.pathCompleto = true;
                //Si se encuentra, significa que la siguiente busqueda se debe hacer a partir de este elemento
                this.consolaSalidaXPATH.push(auxiliarBusqueda);
            }
        }
        // return null;
    }
    busquedaAtributo(objeto, nombre) {
        //CODIGO DE 3 DIRECCIONES 
        this.codigoTemporal += "P=" + objeto.posicion + ";\n";
        let inicioRaizXML = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        //Ubicamos nuestra variabel a buscar en el principio del heap 
        this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
        //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
        for (var i = 0; i < nombre.length; i++) {
            this.codigoTemporal += `heapXPATH[(int)HXP] = ${nombre.charCodeAt(i)};\n`;
            this.codigoTemporal += `HXP = HXP+1;\n`;
        }
        this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
        this.codigoTemporal += `HXP = HXP+1;\n`;
        let anteriorGlobal = this.temporalGlobal.retornarString();
        this.codigoTemporal += "stackXPATH[(int)PXP]=" + anteriorGlobal + ";\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporal += "busquedaAtributo();\n";
        //CODIGO DE 3 DIRECCIONES
        for (let entry of objeto.atributos) {
            let temporal = entry;
            let nombreAtributo = temporal.dameNombre();
            if (nombreAtributo == nombre) {
                this.pathCompleto = true;
                this.atributoID = nombre;
                this.consolaSalidaXPATH.push(objeto);
            }
        }
        for (let entry of objeto.hijos) {
            this.busquedaAtributo(entry, nombre);
        }
    }
    //PARA MOSTRAR EN CONSOLA LOS RESULTADOS 
    //METODO PARA LA LIMPIEZA DE LO QUE SE MUESTRA EN CONSOLA
    //METODO PARA REINICIAR TODO AL MOMENTO DE EJECUTAR UNA NUEVA CONSULTA 
    reiniciar() {
        // this.codigoTemporal += "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;\n";
        if (!this.controladorText) {
            if (this.pathCompleto) {
                for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length; i++) {
                    let entry = this.consolaSalidaXPATH[i];
                    this.arrayAuxiliarXquery.push(entry);
                    if (!this.controladorAtributoImpresion) {
                        this.codigoTemporal += "//IMPRESION DE RESULTADO\n";
                        //Asignamos el valor respectivo al puntero de stack XML 
                        this.codigoTemporal += "P = " + entry.posicion + ";\n";
                        this.codigoTemporal += "imprimirContenido();\n";
                        this.codigoTemporal += "//FIN DE IMPRESION\n";
                    }
                    else {
                        this.codigoTemporal += "//IMPRESION DE RESULTADO\n";
                        //Asignamos el valor respectivo al puntero de stack XML 
                        this.codigoTemporal += "P = " + entry.posicion + ";\n";
                        this.temporalGlobal.aumentar();
                        //Ubicamos nuestra variabel a buscar en el principio del heap 
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
                        //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
                        for (var x = 0; x < this.atributoID.length; x++) {
                            this.codigoTemporal += `heapXPATH[(int)HXP] = ${this.atributoID.charCodeAt(x)};\n`;
                            this.codigoTemporal += `HXP = HXP+1;\n`;
                        }
                        this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
                        this.codigoTemporal += `HXP = HXP+1;\n`;
                        this.codigoTemporal += "PXP = PXP + 0;\n";
                        this.codigoTemporal += "PXP =" + this.temporalGlobal.retornarString() + ";\n";
                        this.codigoTemporal += "stackXPATH[(int)PXP] =" + this.temporalGlobal.retornarString() + ";\n";
                        this.codigoTemporal += "imprimirAtributo();\n";
                        this.codigoTemporal += "//FIN DE IMPRESION\n";
                    }
                }
            }
        }
        this.contador = this.contadorxml = 0;
        this.dot = this.dotXML = '';
        this.objetoActual = null;
        this.atributoActual = null;
        this.inicioRaiz = false;
        this.controladorDobleSimple = false;
        this.controladorAtributoImpresion = false;
        this.atributoID = '';
        this.contadorConsola = 0;
        this.arrayPosicionPadres.push(this.contadorConsola);
        this.auxiliarArrayPosicionPadres = -1;
        this.inicioPadre = 0;
        this.pathCompleto = true;
        this.auxiliarEtiquetaResolverExpresion = null;
        this.controladorPredicado = false;
        this.controladorPredicadoInicio = false;
        this.controladorText = false;
        this.arrayPosicionPadres = new Array();
        this.consolaSalidaXPATH = new Array();
        this.auxiliarEtiquetaResolverExpresion = new Array();
        this.auxiliarAxe = "";
        this.dobleSimpleAxe = false;
        this.controladorAncestor = false;
        this.arrayAncestor = new Array();
        this.padresDobleAcceso = new Array();
        //  this.codigo = '';
        //  this.codigoTemporal = "";
        // this.temporalGlobal = new temporal("t");
        // this.codigoTemporalMetodos = "";
        this.temporalPivote = "";
        this.simboloTemporalPivote = "";
        this.temporalPivote2 = "";
        this.operacionSuprema = "";
        this.contadorOperacionSuprema = 1;
    }
    //METODO PARA SABER QUE MÉTODOS ESCRIBIR EN C3D  
    primeraPasada(nodo) {
        if (this.tipoNodo('INICIO', nodo)) {
            this.primeraPasada(nodo.hijos[0]);
        }
        //NODO L, ES LA LISTA DE CONSULTAS 
        if (this.tipoNodo('L', nodo)) {
            //SE RECORREN TODOS LOS NODOS QUE REPRESENTAN UNA CONSULTA 
            for (var i = 0; i < nodo.hijos.length; i++) {
                this.primeraPasada(nodo.hijos[i]);
            }
        }
        //PARA RECORRER TODOS LOS ELEMENTOS QUE COMPONEN LA CONSULTA 
        if (this.tipoNodo('CONSULTA', nodo)) {
            for (var i = 0; i < nodo.hijos.length; i++) {
                this.primeraPasada(nodo.hijos[i]);
            }
        }
        if (this.tipoNodo('DOBLE', nodo)) {
            this.arrayMetodosC3D.push("busquedaDoble");
        }
        if (this.tipoNodo('SIMPLE', nodo)) {
            this.arrayMetodosC3D.push("busquedaSimple");
        }
    }
    //METODO PARA LA ESCRITURA DE UN METODO DE BUSQUEDA SIMPLE EN C3D 
    busquedaSimpleC3D() {
        this.codigoTemporalMetodos += "void busquedaSimple(){\n";
        this.temporalGlobal.aumentar();
        this.temporalGlobal.aumentar();
        //Dado que es la raiz, ubicamos la posición en STACK en donde se encuentra el principio de la misma Y la asignados a una variable temporal
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= stack[(int)P];\n";
        let inicioRaizXML = this.temporalGlobal.retornarString();
        //Aumentamos el valor de la variable
        this.temporalGlobal.aumentar();
        //Ubicamos nuestra variabel a buscar en el principio del heap 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=stackXPATH[(int)PXP];\n";
        let anteriorGlobal = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        //Ahora escribimos la Etiqueta que simulara un FOR para recorrer ambos strings 
        this.codigoTemporalMetodos += "L0:\n";
        //Asignamos a una nueva variable temporal el valor del principio del indeitificador a buscar 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heapXPATH[(int)" + anteriorGlobal + "];\n";
        let pivoteXP = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= heap[(int)" + inicioRaizXML + "];\n";
        let pivoteXML = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        //escribimos la etiqueta para realizar la comparacion 
        // if(t5 != t6) goto L4;
        // if(t5 == -1) goto L3;
        this.codigoTemporalMetodos += "if(" + pivoteXP + "!=" + pivoteXML + ") goto L1;\n"; //ETIQUETA POR SI LAS PALABRAS NO SON IGUALES
        this.codigoTemporalMetodos += "if(" + pivoteXP + "== -1) goto L2;\n"; //ETIQUETA POR SI LAS PALABRAS SI SON IGUALES
        //EL SIGUIENTE FRAGMENTO ES PARA AUMENTAR LA POSICION PARA CONTINUAR CON LA COMPARACION DE LAS CADENAS 
        this.codigoTemporalMetodos += anteriorGlobal + "=" + anteriorGlobal + "+1;\n";
        this.codigoTemporalMetodos += inicioRaizXML + "=" + inicioRaizXML + "+1;\n";
        this.codigoTemporalMetodos += "goto L0;\n";
        //Ahora sigue las etiquetas de falso y verdadero, asignarles su accion 
        this.codigoTemporalMetodos += "L1:\n";
        this.codigoTemporalMetodos += "stackXPATH[(int)PXP]=-1096;\n";
        this.codigoTemporalMetodos += "goto L3;\n";
        this.codigoTemporalMetodos += "L2:\n";
        this.codigoTemporalMetodos += "stackXPATH[(int)PXP]=" + inicioRaizXML + ";\n";
        this.codigoTemporalMetodos += "L3:\n";
        // this.codigoTemporalMetodos += "if(stackXPATH[(int)PXP]==-1096) printf(\"%c\", (char)98);\n";
        // this.codigoTemporalMetodos += "if(stackXPATH[(int)PXP]!=-1096) printf(\"%c\", (char)97);\n";
        this.codigoTemporalMetodos += "return;\n}";
    }
    //METODO PARA DESPLAZARSE HASTA EL PRIMER HIJO DEL NODO ACTUAL EN C3D  
    encontrarPrimerHijo() {
        this.codigoTemporalMetodos += "void encontrarPrimerHijo(){\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= stackXPATH[(int)PXP]; \n";
        let temporalAnterior = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=0;\n";
        let temporalContadorMenosUno = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "L0:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + temporalAnterior + "];\n";
        this.codigoTemporalMetodos += "L1:\n";
        this.codigoTemporalMetodos += "if(" + this.temporalGlobal.retornarString() + "==-1) goto L2;\n";
        this.codigoTemporalMetodos += temporalAnterior + "=" + temporalAnterior + "+1;\n goto L0;\n";
        this.codigoTemporalMetodos += "L2:\n";
        this.codigoTemporalMetodos += temporalContadorMenosUno + "=" + temporalContadorMenosUno + "+1;\n";
        this.codigoTemporalMetodos += "if(" + temporalContadorMenosUno + "==2) goto L3;\n";
        this.codigoTemporalMetodos += temporalAnterior + "=" + temporalAnterior + "+1;\n goto L0;\n";
        this.codigoTemporalMetodos += "L3:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=" + temporalAnterior + "+1;\n";
        let temporalSalida = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + temporalSalida + "];\n";
        this.codigoTemporalMetodos += "if(" + this.temporalGlobal.retornarString() + "==-9) goto L4;\n goto L5;\n";
        this.codigoTemporalMetodos += "L4:\n";
        this.codigoTemporalMetodos += "PXP = PXP + 1;\nstackXPATH[(int)PXP]=-12;\n";
        this.codigoTemporalMetodos += "L5:\n";
        this.codigoTemporalMetodos += "PXP = PXP + 1;\nstackXPATH[(int)PXP]=" + this.temporalGlobal.retornarString() + ";\n";
        this.codigoTemporalMetodos += "L6:\n";
        this.codigoTemporalMetodos += "return;\n}\n";
    }
    imprimirContenidoC3D() {
        /*void imprimirContenido()
        {
            double t1,t2,t3,t4,t5,t6,t7;
            printf("%c", (char)60);
            t1 = stack[P]; //Obtenemos el principio de la etiqueta a imprimir
            t2 = t1;
            L0:
            t3 = heap[t1]; //Nos ubicamos en la posición respectiva del stack
            if(t3==-1) goto L1;
            printf("%c", (char)t3);
            t1 = t1+1;
            goto L0;
            L1: //CUANDO YA ACABE EL NOMBRE DE LA ETIQUETA
            t1 = t1+1;
            L2:
            t4 = heap[t1];
            if(t4==-77) goto L5; //si ya llegamos al final de los atributos
            if(t4==-3) goto L4; //Si encuentra el final del nombre del atributo
            if(t4==-2) goto L3; //Si encuentra el final del valor del atributo
            printf("%c", (char)t4);//IMPRIMIMOS
            t1 = t1+1;
            goto L2;
            L3://PARA IMPRIMIR EL ESPACIO PARA UN NUEVO ATRIBUTO
            printf("%c", (char)32);
            t1 = t1+1;
            goto L2;
            L4: //PARA IMPRIMIR '=' PARA LUEGO IMPRIMIR EL VALOR DEL ATRIBUTO
            printf("%c", (char)61);
            t1 = t1+1;
            goto L2;
            L5://PARA CUANDO YA ACABEN ATRIBUTOS
            printf("%c", (char)62);
            t1 = t1+1
            t5 = heap[t1];
            if(t5==-1) goto L9; //significa que no hay texto
            L6://PARA EMPEZAR A ESCRIBIR TEXTO SI ASI FUERA EL CASO
            t6 = heap[t1];
            if(t6==-1)goto L7; //EN CASO DE QUE TERMINE EL TEXTO
            printf("%c", (char)t6);
            t1 = t1+1;
            goto L6;
            L7: //fin cuando se escribe texto
            printf("%c", (char)60);
            printf("%c", (char)47);
            L8:
            t7 = heap[t2];
            if(t7==-1)goto L10; //fin de etiqueta con texto entre etique
            printf("%c", (char)t7);
            t2 = t2 + 1;
            goto L8;
            L10:
            printf("%c", (char)62);
            goto L500:
            L9:
            //SE VA A VERIFICAR SI HAY HIJOS O NO
            t1 = t1 +1;
            t8 = heap[t1]:
            L18:
            if(t1==-2) goto L14;
            if(t1==-9) goto L500;
            P = heap[t1];
            imprimirContenido();
            t1 = t1 + 1;
            goto L18;
            L14:
            t1 = t1+1;
            goto L18;
            L500:
            return;
        }*/
        //Se comienza escribiendo el nombre del metodo  
        this.codigoTemporalMetodos += "void imprimirContenido(){\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)10);\n";
        /*
        En el siguiente fragmento se procederá a declarar variables locales para el método, dado que
        será recursivo, el usar variables globales afectará el flujo puesto que necesitamos conservar los distintos
        valores en cada iteración
        */
        this.codigoTemporalMetodos += "double ";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString();
        let contador = 2;
        this.temporalGlobal.aumentar();
        for (var i = 0; i < 8; i++) {
            this.codigoTemporalMetodos += "," + this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            contador++;
        }
        this.codigoTemporalMetodos += ",t109696";
        this.codigoTemporalMetodos += ";\n";
        //En este punto regresamos las variables a como se encontraban al principio para que la escritura siga normal 
        this.temporalGlobal.contador = this.temporalGlobal.contador - contador;
        this.temporalGlobal.aumentar();
        //esribimos < para inidicar que inicia nuestra etiqueta 
        this.codigoTemporalMetodos += "printf(\"%c\", (char)60);\n";
        //Este asignacion de variable servirá para poder determinar el inicio de la etiqueta y  todo su contenido  
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=stack[(int)P];\n";
        let primeraVariable = this.temporalGlobal.retornarString();
        //Aumentamos el contador de el generador de variables temporales 
        this.temporalGlobal.aumentar();
        //Hacemos la asignacion de tipo t2 = t1 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=" + primeraVariable + ";\n";
        let segundaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "t109696=" + primeraVariable + ";\n";
        //Se escribe la primera etiqueta para la lectura del nombre de la ewtiqueta 
        this.codigoTemporalMetodos += "L0:\n";
        this.temporalGlobal.aumentar();
        //Escribimos la variable pivote para ir recorriendo el nombre de la etiqueta 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= heap[(int)" + primeraVariable + "];\n";
        let terceraVariable = this.temporalGlobal.retornarString();
        //escribimos el condicional para verificar si ya hemos llegado al final de nuestra etiqueta 
        this.codigoTemporalMetodos += "if(" + terceraVariable + "==-1) goto L1;\n";
        //Se escribe el caracter actual del nombre de la etiqueta 
        this.codigoTemporalMetodos += "printf(\"%c\", (char)" + terceraVariable + ");\n";
        //Nos desplazamos en el siguiente caracter a imprimir del nombred de la etiqueta 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Volvemos a iterar hacia la etiqueta inicial 
        this.codigoTemporalMetodos += "goto L0;\n";
        //Escribimos el codigo de la etiqueta cuando ya acabemos de escribir el nombre del nodo actual 
        this.codigoTemporalMetodos += "L1:\n";
        //Nos desplazamos hacia la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)32);\n";
        //Escribimos la etiqueta L2
        this.codigoTemporalMetodos += "L2:\n";
        this.temporalGlobal.aumentar();
        //Asignamos el pivote respectivo 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let cuartaVariable = this.temporalGlobal.retornarString();
        //Escribimos las condicionales para brincar hacia las etiquetas correspondientes de la escritura de ATRIBUTOS  
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-77) goto L5;\n"; //Final de atributos
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-3) goto L4;\n"; //Final de nombre atributo
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-2) goto L3;\n"; //Final valor atributo
        this.codigoTemporalMetodos += "printf(\"%c\", (char)" + cuartaVariable + ");\n"; //Imprimimos el nombre o valor del atributo
        //Seguimos desplazandonos a la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Regresamos a la etiqueta de impresion de atributos para seguir iterando 
        this.codigoTemporalMetodos += "goto L2;\n";
        //Ahora se va a escribir el espacio entre atributos 
        this.codigoTemporalMetodos += "L3:\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)32);\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L2;\n";
        //Ahora se escribe el signo igual para asignarle el valor al atributo respectivo
        this.codigoTemporalMetodos += "L4:\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)61);\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L2;\n";
        //Ahora se procede a escribir el codigo para el cierre del nombre de etiqueta luego de escribir sus atributos 
        this.codigoTemporalMetodos += "L5:\n";
        //Escribimos el simbolo > 
        this.codigoTemporalMetodos += "printf(\"%c\", (char)62);\n";
        //Nos desplazamos en el siguiente caracter a imprimir 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Aumentamos el contador global 
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let quintaVariable = this.temporalGlobal.retornarString();
        //Escribimos el condicional para la verificacion de existencia de texto 
        this.codigoTemporalMetodos += "if(" + quintaVariable + "==-1) goto L9;\n";
        //Escribimos la rutina para la escritura del texto entre etiquetas 
        this.codigoTemporalMetodos += "L6:\n";
        //Aumentamos el contador 
        this.temporalGlobal.aumentar();
        //Escribimos el nuevo pivote para escritura de texto 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let sextaVariable = this.temporalGlobal.retornarString();
        //Escribimos el condicional para verificacion de finalizacion de texto
        this.codigoTemporalMetodos += "if(" + sextaVariable + "==-1) goto L7;\n";
        //Escrbimos el caracter del texto entre etiquetas 
        this.codigoTemporalMetodos += "printf(\"%c\", (char)" + sextaVariable + ");\n"; //Imprimimos el nombre o valor del atributo
        //Seguimos desplazandonos a la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Regresamos a la etiqueta de impresion de atributos para seguir iterando 
        this.codigoTemporalMetodos += "goto L6;\n";
        //Escribimos la etiqueta para la finalizacion de escritura de texto 
        this.codigoTemporalMetodos += "L7:\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)60);\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)47);\n";
        this.codigoTemporalMetodos += "L8:\n";
        //Aumentamos el contador 
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= heap[(int)" + segundaVariable + "];\n";
        let septimaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + septimaVariable + "==-1)goto L10;\n"; //fin de etiqueta con texto entre etique
        this.codigoTemporalMetodos += "printf(\"%c\", (char)" + septimaVariable + ");\n";
        this.codigoTemporalMetodos += segundaVariable + "=" + segundaVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L8;\n";
        this.codigoTemporalMetodos += "L10:\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)62);\n";
        this.codigoTemporalMetodos += "goto L500;\n";
        //Escribimos la etiqueta que se encargará de trabajar la recursividad para la impresión de todo el contenido 
        this.codigoTemporalMetodos += "L9:\n";
        //Nos desplazamos a la siguiente posicion para verificar si hay hijos 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Aumentamos el contador 
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        // this.codigoTemporalMetodos += "printf(\" % c\", (char)32);\n";
        let octavaVariable = this.temporalGlobal.retornarString();
        //Escribimos la etiqueta que contiene la recursividad 
        this.codigoTemporalMetodos += "L18:\n";
        //ESCRIBIMOS LAS CONDICIONALES PARA SABER SI FINALIZA LA RECURSIVIDAD O FINALIZA UN HIJO 
        this.codigoTemporalMetodos += octavaVariable + "=heap[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + octavaVariable + "==-2) goto L14;\n";
        this.codigoTemporalMetodos += "if(" + octavaVariable + "==-9) goto L499;\n";
        //Asignamos al puntero del stack la posicion para iniciar en la nueva iteracion 
        this.codigoTemporalMetodos += "P=" + octavaVariable + ";\n";
        //Llamamos al método para manejar la recursividad 
        this.codigoTemporalMetodos += "imprimirContenido();\n";
        //No ubicamos en la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Iteramos nuevamente
        this.codigoTemporalMetodos += "goto L18;\n";
        //Escribimos el codigo para pasar de un hijo a otro  
        this.codigoTemporalMetodos += "L14:\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L18;\n";
        //METODO PARA ESCRIBIR LA ETIQUETA FINAL DE UNA ETIQUETA CON HIJOS 
        this.codigoTemporalMetodos += "L499:\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)10);\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)60);\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)47);\n";
        this.codigoTemporalMetodos += "L498:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)t109696];\n";
        let novenaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + novenaVariable + "==-1) goto L497;\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)" + novenaVariable + ");\n";
        this.codigoTemporalMetodos += "t109696 = t109696+1;\n";
        this.codigoTemporalMetodos += "goto L498;\n";
        this.codigoTemporalMetodos += "L497:\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)62);\n";
        //FINALIZAMOS EL METODO 
        this.codigoTemporalMetodos += "L500:\n";
        this.codigoTemporalMetodos += "return;\n}\n";
        //En este punto está pendiente todavía la escritura de la finalizacion de etiqueta cuando esta tiene hijos 
    }
    //METODO PARA LA ESCRITURA DEL ALGORITMO DE BUSQUEDA DE ATRIBUTO EN C3D 
    busquedaAtributoC3D() {
        /*
        void buscarAtributo()
    {
    t47= stack[(int)P];//INICO DE ETIQUETA
    ty = t47;
    t48=stackXPATH[(int)PXP];
    tx=t48;
    L0:
    t49= heap[(int)t47];
    if(t49== -1) goto L2;
    t47=t47+1;
    goto L0;
    L2:
    t47 = t47 +1;
    t50 = heap[(int)t47];
    if(t50==-77) goto L3;
    L4:
    t51 = heapXPATH[(int)t48];
    t52 = heap[(int)t47];
    if(t51!=t52) goto L5;
    if(t52==-3) goto L6;
    t48 = t48 +1;
    t47 = t47+1;
    goto L4;
    L5:
    t53 = heap[(int)t47];
    if(t53==-2) goto l7;
    t47= t47+1;
    goto L5;
    L7:
    t48 = tx;
    goto L2;
    L6:
    stackXPATH[PXP] = t47;
    PXP = PXP + 1;
    L3:
    return;
    }
        */
        //Comenzamos escribiendo el nombre del método 
        this.codigoTemporalMetodos += "void busquedaAtributo(){\n";
        this.temporalGlobal.aumentar();
        //Escribimos la primera variable que va a almacenar el puntero del stack 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= stack[(int)P];\n";
        //Escribimos la primera variable
        let primeraVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "double t1111 = " + primeraVariable + ";\n";
        this.temporalGlobal.aumentar();
        //Escribimos la segunda variable que almacena el puntero del stack de xpath
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= stackXPATH[(int)PXP];\n";
        let segundaVariable = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        //Guardamos un puntero para volver a analizar el mismo nombre con otro atributo distinto 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=" + segundaVariable + ";\n";
        let terceraVariable = this.temporalGlobal.retornarString();
        //Escribimos la etiqueta inicial 
        this.codigoTemporalMetodos += "L0:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let cuartaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-1) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L0;\n";
        //Escribimos la etiqueta L2 
        this.codigoTemporalMetodos += "L2:\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let quintaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + quintaVariable + "==-77) goto L3;\n";
        //Escribimos la etiqueta L4: 
        this.codigoTemporalMetodos += "L4:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heapXPATH[(int)" + segundaVariable + "];\n";
        let sextaVariable = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let septimaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + sextaVariable + "!=" + septimaVariable + ") goto L5;\n";
        this.codigoTemporalMetodos += "if(" + septimaVariable + "==-3) goto L6;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=" + segundaVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L4;\n";
        //Escribimos la etiqueta L5
        this.codigoTemporalMetodos += "L5:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let octavaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + octavaVariable + "==-2) goto L7;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L5;\n";
        //Escribimos la etiqueta L7 
        this.codigoTemporalMetodos += "L7:\n";
        this.codigoTemporalMetodos += segundaVariable + "=" + terceraVariable + ";\n";
        this.codigoTemporalMetodos += "goto L2;\n";
        //Escribimos la etiqueta L6
        this.codigoTemporalMetodos += "L6:\n";
        this.codigoTemporalMetodos += "stackXPATH[(int)PXP] = t1111;\nPXP = PXP+1;\n";
        this.codigoTemporalMetodos += "L3:\nreturn;\n}\n";
    }
    imprimirAtributoC3D() {
        /*
        printf("%c", (char)10);
    t47= stack[(int)P];//INICO DE ETIQUETA
    t48=stackXPATH[(int)PXP];
    tx=t48;
    L0:
    t49= heap[(int)t47];
    if(t49== -1) goto L2;
    t47=t47+1;
    goto L0;
    L2:
    t47 = t47 +1;
    t50 = heap[(int)t47];
    if(t50==-77) goto L3;
    L4:
    t51 = heapXPATH[(int)t48];
    t52 = heap[(int)t47];
    if(t51!=t52) goto L5;
    if(t52==-3) goto L6;
    t48 = t48 +1;
    t47 = t47+1;
    goto L4;
    L5:
    t53 = heap[(int)t47];
    if(t53==-2) goto l7;
    t47= t47+1;
    goto L5;
    L7:
    t48 = tx;
    goto L2;
    L6:
    t48 = tx;
    L9:
    t123 = heapXPATH[(int)t48];
    if(t123==-1) goto L10;
    printf("%c", (char)t123);
    t48 = t48+1;
    goto L9;
    L10:
    printf("%c", (char)61);
    L11:
    t11112343242 = heap[(int)t47];
    if(tx == -2) goto L3;
    printf("%c", (char)tx);
    t47 = t47+1;
    goto L11;
    L3:
    return;
             */
        //Comenzamos escribiendo el nombre del método 
        this.codigoTemporalMetodos += "void imprimirAtributo(){\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)10);\n";
        this.temporalGlobal.aumentar();
        //Escribimos la primera variable que va a almacenar el puntero del stack 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= stack[(int)P];\n";
        //Escribimos la primera variable
        let primeraVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "double t1111 = " + primeraVariable + ";\n";
        this.temporalGlobal.aumentar();
        //Escribimos la segunda variable que almacena el puntero del stack de xpath
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= stackXPATH[(int)PXP];\n";
        let segundaVariable = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        //Guardamos un puntero para volver a analizar el mismo nombre con otro atributo distinto 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=" + segundaVariable + ";\n";
        let terceraVariable = this.temporalGlobal.retornarString();
        //Escribimos la etiqueta inicial 
        this.codigoTemporalMetodos += "L0:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let cuartaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-1) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L0;\n";
        //Escribimos la etiqueta L2 
        this.codigoTemporalMetodos += "L2:\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let quintaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + quintaVariable + "==-77) goto L3;\n";
        //Escribimos la etiqueta L4: 
        this.codigoTemporalMetodos += "L4:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heapXPATH[(int)" + segundaVariable + "];\n";
        let sextaVariable = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let septimaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + septimaVariable + "==-3) goto L6;\n";
        this.codigoTemporalMetodos += "if(" + sextaVariable + "!=" + septimaVariable + ") goto L5;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=" + segundaVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L4;\n";
        //Escribimos la etiqueta L5
        this.codigoTemporalMetodos += "L5:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let octavaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + octavaVariable + "==-2) goto L7;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L5;\n";
        //Escribimos la etiqueta L7 
        this.codigoTemporalMetodos += "L7:\n";
        this.codigoTemporalMetodos += segundaVariable + "=" + terceraVariable + ";\n";
        this.codigoTemporalMetodos += "goto L2;\n";
        //Escribimos la etiqueta L6
        this.codigoTemporalMetodos += "L6:\n";
        this.codigoTemporalMetodos += segundaVariable + "=" + terceraVariable + ";\n";
        //Escribimos la etiqueta L9
        this.codigoTemporalMetodos += "L9:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heapXPATH[(int)" + segundaVariable + "];\n";
        let novenaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + novenaVariable + "==-1) goto L10;\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)" + novenaVariable + ");\n";
        this.codigoTemporalMetodos += segundaVariable + "=" + segundaVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L9;\n";
        //ESCRIBIMOS LA ETIQUETA L10
        this.codigoTemporalMetodos += "L10:\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)61);\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "L11:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= heap[(int)" + primeraVariable + "];\n";
        let decimaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + decimaVariable + "==-2) goto L3;\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)" + decimaVariable + ");\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L11;\n";
        //ESCRIBIMOS EL FINAL DEL METODO 
        this.codigoTemporalMetodos += "L3:\nreturn;\n}\n";
    }
    //METODO PARA RESOLVER EXPRESION 
    resolverExpresion(nodo) {
        if (this.soyNodo('VAL', nodo)) {
            //Para verificar si lo que se va a examinar es una ruta o un elemento unicamente
            //Sí la cantidad de hijos es mayor a 1, significa que tenemos una ruta 
            if (nodo.hijos.length > 1 || this.soyNodo('SIMPLE', nodo.hijos[0]) || this.soyNodo('DOBLE', nodo.hijos[0]) || this.soyNodo('identificador', nodo.hijos[0].hijos[0]) || this.soyNodo('atributo', nodo.hijos[0].hijos[0])) {
                //XQUERY07
                let instanciaResolverExpresion = new Traduccion(nodo, this.raizXML, null, null);
                //instanciaResolverExpresion.ArrayEtiquetas = this.ArrayEtiquetas;
                //instanciaResolverExpresion.ejExp();
                for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length; i++) {
                    instanciaResolverExpresion.ArrayEtiquetas.push(this.consolaSalidaXPATH[i]);
                    // salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameID());
                }
                instanciaResolverExpresion.recorrerArbolConsulta(instanciaResolverExpresion.raiz);
                this.codigoTemporal += "///////////////////////////////////////////////////////////////////////\n";
                this.codigoTemporal += instanciaResolverExpresion.codigoTemporal;
                this.codigoTemporal += "///////////////////////////////////////////////////////////////////////\n";
                /*  let arrayRetorno = new Array<Etiqueta>();
                  for (var i = instanciaResolverExpresion.contadorConsola; i < instanciaResolverExpresion.consolaSalidaXPATH.length - 1;i++)
                  {
                    arrayRetorno.push(instanciaResolverExpresion.consolaSalidaXPATH[i]);
                  }*/
                return new Expresion_1.Expresion({ tipo_: 4 /* ETIQUETA */, valor_: instanciaResolverExpresion });
            }
            return this.resolverExpresion(nodo.hijos[0]);
        }
        if (this.soyNodo('X', nodo)) {
            return this.resolverExpresion(nodo.hijos[0]);
        }
        if (this.soyNodo('E', nodo)) {
            return this.resolverExpresion(nodo.hijos[0]);
        }
        if (this.soyNodo('entero', nodo)) {
            var valor_ = Number(nodo.hijos[0]);
            return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
        }
        if (this.soyNodo('doble', nodo)) {
            var valor_ = Number(nodo.hijos[0]);
            return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
        }
        if (this.soyNodo('string_s', nodo)) {
            let valor_ = nodo.hijos[0].toString();
            var result = valor_.substring(1, valor_.length - 1);
            return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: result });
        }
        if (this.soyNodo('string_d', nodo)) {
            let valor_ = nodo.hijos[0].toString();
            var result = valor_.substring(1, valor_.length - 1);
            return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: result });
        }
        if (this.soyNodo('last', nodo)) {
            let valor_ = (this.consolaSalidaXPATH.length) - this.contadorConsola;
            return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
        }
        //NEGATIVO
        else if (this.soyNodo('negativo', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            //numero:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                let valor_ = a1 * -1;
                return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
            }
            //erroror
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar -' + this.obtenerTipo_string(expresion1)),
            }));
        } //FIN DE negativo
        //SUMA +
        if (this.soyNodo('+', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            this.temporalGlobal.aumentar();
            if (this.temporalPivote == "") {
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "+" + expresion2.valor.toString() + ";\n";
                this.temporalPivote = this.temporalGlobal.retornarString();
            }
            else {
                if (!this.soyNodo('VAL', nodo.hijos[0]) && !this.soyNodo('VAL', nodo.hijos[1])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "+" + this.operacionSuprema + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "+" + this.temporalPivote2 + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                    // this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "/" + this.temporalPivote2 + ";\n";
                    //this.temporalPivote = this.temporalGlobal.retornarString();
                }
                else if (!this.soyNodo('VAL', nodo.hijos[0])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.operacionSuprema + "+" + expresion2.valor.toString() + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "+" + expresion2.valor.toString() + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                }
                else if (!this.soyNodo('VAL', nodo.hijos[1])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "+" + this.operacionSuprema + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "+" + this.temporalPivote + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                }
                else {
                    this.contadorOperacionSuprema = 1;
                    this.operacionSuprema = this.temporalPivote;
                    this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "+" + expresion2.valor.toString() + ";\n";
                    this.temporalPivote2 = this.temporalPivote;
                    this.temporalPivote = this.temporalGlobal.retornarString();
                    this.contadorOperacionSuprema++;
                }
            }
            //this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "+" + expresion2.valor.toString() + ";\n";
            //Si el nodo1 es numero:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //Si el nodo2 es numero:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 + a2;
                    return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
                }
                //numero + cadena
                else if (expresion2.tipo == 2) {
                    let a1 = (expresion1.valor.toString());
                    let b0 = expresion2.valor.toString();
                    let valor_ = a1.concat(b0);
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: valor_ });
                }
            }
            //Si nodo1 es cadena
            else if (expresion1.tipo == 2) {
                let a1 = expresion1.valor.toString();
                //Si el nodo2 es numero:
                if (expresion2.tipo == 1) {
                    let b1 = expresion2.valor.toString();
                    let valor_ = a1.concat(b1);
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: valor_ });
                }
                //Si a2 es string
                else if (expresion2.tipo == 2) {
                    let b1 = expresion2.valor.toString();
                    let valor_ = a1.concat(b1);
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: valor_ });
                }
                //Si string + bool
                else if (expresion2.tipo == 3) {
                    let b1 = expresion2.valor.toString();
                    let valor_ = a1.concat(b1);
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: valor_ });
                }
            }
            else if (expresion1.tipo == 3) {
                let a1 = expresion1.valor.toString();
                //bool + string 
                if (expresion2.tipo == 2) {
                    let b1 = expresion2.valor.toString();
                    let valor_ = a1.concat(b1);
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: valor_ });
                }
            }
            //ErrorSUMA
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " + " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE LA SUMA
        //RESTA -
        else if (this.soyNodo('-', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            this.temporalGlobal.aumentar();
            if (this.temporalPivote == "") {
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "-" + expresion2.valor.toString() + ";\n";
                this.temporalPivote = this.temporalGlobal.retornarString();
            }
            else {
                if (!this.soyNodo('VAL', nodo.hijos[0]) && !this.soyNodo('VAL', nodo.hijos[1])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.operacionSuprema + "-" + this.temporalPivote + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote2 + "-" + this.temporalPivote + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                    // this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "/" + this.temporalPivote2 + ";\n";
                    //this.temporalPivote = this.temporalGlobal.retornarString();
                }
                else if (!this.soyNodo('VAL', nodo.hijos[0])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.operacionSuprema + "-" + expresion2.valor.toString() + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "-" + expresion2.valor.toString() + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                }
                else if (!this.soyNodo('VAL', nodo.hijos[1])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "-" + this.operacionSuprema + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "-" + this.temporalPivote + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                }
                else {
                    this.contadorOperacionSuprema = 1;
                    this.operacionSuprema = this.temporalPivote;
                    this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "-" + expresion2.valor.toString() + ";\n";
                    this.temporalPivote2 = this.temporalPivote;
                    this.temporalPivote = this.temporalGlobal.retornarString();
                    this.contadorOperacionSuprema++;
                }
            }
            //Si el nodo1 es numero:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //Si el nodo2 es numero:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 - a2;
                    return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
                }
            }
            //ErrorRESTA
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " - " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE LA RESTA
        //MULTIPLICACION
        else if (this.soyNodo('*', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            this.temporalGlobal.aumentar();
            /*if (this.temporalPivote == "") {
              this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "*" + expresion2.valor.toString() + ";\n";
              this.temporalPivote = this.temporalGlobal.retornarString();
            } else {
              if (!this.soyNodo('VAL', nodo.hijos[0])&&!this.soyNodo('VAL', nodo.hijos[1]))
              {
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "*" + this.temporalPivote2 + ";\n";
                this.temporalPivote = this.temporalGlobal.retornarString();
              } else if (!this.soyNodo('VAL', nodo.hijos[0]))
              {
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "*" + expresion2.valor.toString() + ";\n";
                this.temporalPivote2 = this.temporalPivote;
                this.temporalPivote = this.temporalGlobal.retornarString();
        
              }
              else if (!this.soyNodo('VAL', nodo.hijos[1]))
              {
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "*" + this.temporalPivote + ";\n";
                this.temporalPivote2 = this.temporalPivote;
                this.temporalPivote = this.temporalGlobal.retornarString();
              } else {
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "*" + expresion2.valor.toString() + ";\n";
                this.temporalPivote2 = this.temporalPivote;
                this.temporalPivote = this.temporalGlobal.retornarString();
                }
            }*/
            if (this.temporalPivote == "") {
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "*" + expresion2.valor.toString() + ";\n";
                this.temporalPivote = this.temporalGlobal.retornarString();
            }
            else {
                if (!this.soyNodo('VAL', nodo.hijos[0]) && !this.soyNodo('VAL', nodo.hijos[1])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "*" + this.operacionSuprema + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "*" + this.temporalPivote2 + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                    // this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "/" + this.temporalPivote2 + ";\n";
                    //this.temporalPivote = this.temporalGlobal.retornarString();
                }
                else if (!this.soyNodo('VAL', nodo.hijos[0])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.operacionSuprema + "*" + expresion2.valor.toString() + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "*" + expresion2.valor.toString() + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                }
                else if (!this.soyNodo('VAL', nodo.hijos[1])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "*" + this.operacionSuprema + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "*" + this.temporalPivote + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                }
                else {
                    this.contadorOperacionSuprema = 1;
                    this.operacionSuprema = this.temporalPivote;
                    this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "*" + expresion2.valor.toString() + ";\n";
                    this.temporalPivote2 = this.temporalPivote;
                    this.temporalPivote = this.temporalGlobal.retornarString();
                    this.contadorOperacionSuprema++;
                }
            }
            //Si el nodo1 es numero:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //Si el nodo2 es numero:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 * a2;
                    return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
                }
                //numero * cadena
                else if (expresion2.tipo == 2) {
                    let b0 = expresion2.valor.toString();
                    let b1 = "";
                    for (var i = 0; i < a1; i++) {
                        b1 = b1.concat(b0);
                    }
                    let valor_ = b1;
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: valor_ });
                }
            }
            //Si el nodo1 es numero:
            if (expresion1.tipo == 2) {
                let a1 = expresion1.valor.toString();
                //numero * cadena
                if (expresion2.tipo == 1) {
                    let b0 = Number(expresion2.valor.toString());
                    let b1 = "";
                    for (var i = 0; i < b0; i++) {
                        b1 = b1.concat(a1);
                    }
                    let valor_ = b1;
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: valor_ });
                }
            }
            //errorMulti
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " * " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE LA MULTI
        //DIVISION
        else if (this.soyNodo('div', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            this.temporalGlobal.aumentar();
            if (this.temporalPivote == "") {
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "/" + expresion2.valor.toString() + ";\n";
                this.temporalPivote = this.temporalGlobal.retornarString();
            }
            else {
                if (!this.soyNodo('VAL', nodo.hijos[0]) && !this.soyNodo('VAL', nodo.hijos[1])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "/" + this.operacionSuprema + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "/" + this.temporalPivote2 + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                    // this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "/" + this.temporalPivote2 + ";\n";
                    //this.temporalPivote = this.temporalGlobal.retornarString();
                }
                else if (!this.soyNodo('VAL', nodo.hijos[0])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.operacionSuprema + "/" + expresion2.valor.toString() + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + this.temporalPivote + "/" + expresion2.valor.toString() + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                }
                else if (!this.soyNodo('VAL', nodo.hijos[1])) {
                    if (this.contadorOperacionSuprema == 3) {
                        this.contadorOperacionSuprema = 1;
                        if (this.operacionSuprema != "") {
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "/" + this.operacionSuprema + ";\n";
                            this.temporalPivote2 = this.temporalPivote;
                            this.temporalPivote = this.temporalGlobal.retornarString();
                            this.operacionSuprema = "";
                        }
                    }
                    else {
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "/" + this.temporalPivote + ";\n";
                        this.temporalPivote2 = this.temporalPivote;
                        this.temporalPivote = this.temporalGlobal.retornarString();
                        this.contadorOperacionSuprema++;
                    }
                }
                else {
                    this.contadorOperacionSuprema = 1;
                    this.operacionSuprema = this.temporalPivote;
                    this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + expresion1.valor.toString() + "/" + expresion2.valor.toString() + ";\n";
                    this.temporalPivote2 = this.temporalPivote;
                    this.temporalPivote = this.temporalGlobal.retornarString();
                    this.contadorOperacionSuprema++;
                }
            }
            //Si el nodo1 es numero:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //Si el nodo2 es numero:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 / a2;
                    return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
                }
            }
            //errorDivi
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " / " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE LA DIvi
        //DIVISION
        else if (this.soyNodo('mod', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            //Si el nodo1 es numero:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //Si el nodo2 es numero:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 % a2;
                    return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
                }
            }
            //errorMod
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " mod " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE LA mod
        //mayorque
        else if (this.soyNodo('>', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            //numero:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //numero > numero:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 > a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //errormayor
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " > " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE LA mayor
        //menorque
        else if (this.soyNodo('<', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            //bool:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //bool and bool:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 < a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //errormayor
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " < " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE menor
        //mayor igual que
        else if (this.soyNodo('>=', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            //bool:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //bool and bool:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 >= a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //errormayor igual
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " >= " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE mayor igual
        //menor igual que
        else if (this.soyNodo('<=', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            //numero:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //numero <= numero:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 <= a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //errormenor igual
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " <= " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE menor igual
        //diferente que
        else if (this.soyNodo('!=', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            //numero:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //numero = numero:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 != a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //string:
            if (expresion1.tipo == 2) {
                let a1 = (expresion1.valor.toString());
                //string = string
                if (expresion2.tipo == 2) {
                    let a2 = (expresion2.valor.toString());
                    let valor_ = a1 != a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //bool:
            if (expresion1.tipo == 3) {
                let a1 = JSON.parse(expresion1.valor.toString());
                //bool = bool
                if (expresion2.tipo == 3) {
                    let a2 = JSON.parse(expresion2.valor.toString());
                    let valor_ = a1 != a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //errorigual
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " != " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE  diferente
        //igual que
        else if (this.soyNodo('=', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            //numero:
            if (expresion1.tipo == 1) {
                let a1 = Number(expresion1.valor.toString());
                //numero = numero:
                if (expresion2.tipo == 1) {
                    let a2 = Number(expresion2.valor.toString());
                    let valor_ = a1 == a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //string:
            if (expresion1.tipo == 2) {
                let a1 = (expresion1.valor.toString());
                //string = string
                if (expresion2.tipo == 2) {
                    let a2 = (expresion2.valor.toString());
                    let valor_ = a1 == a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //bool:
            if (expresion1.tipo == 3) {
                let a1 = JSON.parse(expresion1.valor.toString());
                //bool = bool
                if (expresion2.tipo == 3) {
                    let a2 = JSON.parse(expresion2.valor.toString());
                    let valor_ = a1 == a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //etiqueta:
            if (expresion1.tipo == 4) {
                let contador = 0;
                let datosRetorno = new Array();
                let a1 = expresion1.valor;
                // a1 = JSON.parse(expresion1.valor); //OBTENEMOS LA INSTANCIA DE LA CLASE EJECUCION
                let valorComparar = expresion2.valor.toString(); //OBTENEMOS EL VALOR A COMPARAR
                //RECORREMOS LA LISTA DE ETIQUETAS ENCONTRADAS EN LA RUTA
                for (var i = a1.contadorConsola; i < a1.consolaSalidaXPATH.length; i++) {
                    //salidaXPATH.getInstance().push("entra");
                    //ASIGNAMOS UNA VARIABLE TEMPORAL
                    let temp = a1.consolaSalidaXPATH[i];
                    // salidaXPATH.getInstance().push(temp.dameID());
                    //salidaXPATH.getInstance().push(temp.dameValor());
                    //salidaXPATH.getInstance().push(valorComparar);
                    //VERIFICAMOS SI SE BUSCA UN ATRIBUTO O ETIQUETA
                    if (a1.controladorAtributoImpresion) {
                        //SI ENTRAMOS ACA ES QUE SE BUSCA UN ATRIBUTO
                        //ESTABLECEMOS EN LA CLASE PADRE QUE UN ATRIBUTO VAMOS A IMPRIMIR SI FUESE EL ULTIMO
                        //  this.controladorAtributoImpresion = true;
                        for (let entry of temp.atributos) {
                            //RECORREMOS CADA UNO DE LOS ATRIBUTOS
                            let x = entry;
                            //OBTENEMOS EL NOMBRE DEL ATRIBUTO A EXAMINAR
                            let nombreAtributo = x.dameNombre();
                            //CODIGO DE 3 DIRECCIONES 
                            this.codigoTemporal += "P=" + temp.posicion + ";\n";
                            let inicioRaizXML = this.temporalGlobal.retornarString();
                            this.temporalGlobal.aumentar();
                            //Ubicamos nuestra variabel a buscar en el principio del heap 
                            this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
                            //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
                            for (var z = 0; z < valorComparar.length; z++) {
                                this.codigoTemporal += `heapXPATH[(int)HXP] = ${valorComparar.charCodeAt(z)};\n`;
                                this.codigoTemporal += `HXP = HXP+1;\n`;
                            }
                            this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
                            this.codigoTemporal += `HXP = HXP+1;\n`;
                            let anteriorGlobal = this.temporalGlobal.retornarString();
                            this.codigoTemporal += "stackXPATH[(int)PXP]=" + anteriorGlobal + ";\n";
                            this.temporalGlobal.aumentar();
                            this.codigoTemporal += "comparacionValor();\n";
                            //CODIGO DE 3 DIRECCIONES 
                            // salidaXPATH.getInstance().push(nombreAtributo);
                            //VERIFICAMOS SI ES EL ATRIBUTO CORRECTO
                            if (nombreAtributo == a1.atributoID) {
                                //VERIFICAMOS SI ES EL VALOR INDICADO
                                if (x.dameValor() == valorComparar) {
                                    if (contador == 0) {
                                        datosRetorno.push("atributo");
                                        datosRetorno.push(nombreAtributo);
                                        datosRetorno.push(valorComparar);
                                    }
                                    contador++;
                                }
                            }
                        }
                    }
                    else {
                        this.codigoTemporal += "P=" + temp.posicion + ";\n";
                        let inicioRaizXML = this.temporalGlobal.retornarString();
                        this.temporalGlobal.aumentar();
                        //Ubicamos nuestra variabel a buscar en el principio del heap 
                        this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXP;\n";
                        //Escribimos dentro del heap de XPATH el nombre del identificador a buscar 
                        for (var z = 0; z < valorComparar.length; z++) {
                            this.codigoTemporal += `heapXPATH[(int)HXP] = ${valorComparar.charCodeAt(z)};\n`;
                            this.codigoTemporal += `HXP = HXP+1;\n`;
                        }
                        this.codigoTemporal += `heapXPATH[(int)HXP] =-1;\n`;
                        this.codigoTemporal += `HXP = HXP+1;\n`;
                        let anteriorGlobal = this.temporalGlobal.retornarString();
                        this.codigoTemporal += "stackXPATH[(int)PXP]=" + anteriorGlobal + ";\n";
                        this.temporalGlobal.aumentar();
                        this.codigoTemporal += "comparacionValorEtiqueta();\n";
                        if (temp.dameValor().substring(1) === valorComparar) {
                            if (contador == 0) {
                                datosRetorno.push("etiqueta");
                                datosRetorno.push(temp.dameID());
                                datosRetorno.push(valorComparar);
                            }
                            contador++;
                        }
                    }
                }
                return new Expresion_1.Expresion({ tipo_: 4 /* ETIQUETA */, valor_: datosRetorno });
            }
            //errorigual
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " == " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE  diferente
        //and
        else if (this.soyNodo('and', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            //bool:
            if (expresion1.tipo == 3) {
                let a1 = JSON.parse(expresion1.valor.toString());
                //bool and bool:
                if (expresion2.tipo == 3) {
                    let a2 = JSON.parse(expresion2.valor.toString());
                    let valor_ = a1 && a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //errorand
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " AND " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE and
        //OR
        else if (this.soyNodo('or', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0]);
            let expresion2 = this.resolverExpresion(nodo.hijos[1]);
            //bool:
            if (expresion1.tipo == 3) {
                let a1 = JSON.parse(expresion1.valor.toString());
                //bool and bool:
                if (expresion2.tipo == 3) {
                    let a2 = JSON.parse(expresion2.valor.toString());
                    let valor_ = a1 || a2;
                    return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
                }
            }
            //erroror
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (Number(nodo.linea) + 1).toString(),
                descripcion: ('No es posible operar ' + this.obtenerTipo_string(expresion1) + " OR " + this.obtenerTipo_string(expresion2)),
            }));
        } //FIN DE or
        return new Expresion_1.Expresion({ tipo_: 0 /* ERROR */, valor_: "0" });
    } //FIN RESOLVER EXP
    //FIN DE METODO PARA RESOLVER EXPRESION   
    //METODO PARA OBTENER EL TIPO
    obtenerTipo_string(expresion_) {
        if (expresion_.tipo == 0) {
            return 'error';
        }
        else if (expresion_.tipo == 1) {
            return 'numero';
        }
        else if (expresion_.tipo == 2) {
            return 'cadena';
        }
        else if (expresion_.tipo == 3) {
            return 'booleano';
        }
        else {
            return 'error';
        }
    }
    //FIN DE METODO PARAO BTENER EL TIPO
    //METODO PARA UBICARSE EN EL NODO CORRECTO A PARTIR DEL PREDICADO 
    ubicarPredicadoC3D() {
        this.codigoTemporalMetodos += "void ubicarPredicado(){\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=PXP;\n";
        let primeraVariable = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=stackXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "P=" + this.temporalGlobal.retornarString() + ";\n";
        this.codigoTemporalMetodos += "return;\n}\n";
    }
    //METODO PARA COMPARAR EL VALOR deseado del atributo 
    //METODO PARA LA ESCRITURA DEL ALGORITMO DE BUSQUEDA DE ATRIBUTO EN C3D 
    comparacionValorC3D() {
        //Comenzamos escribiendo el nombre del método 
        this.codigoTemporalMetodos += "void comparacionValor(){\n";
        this.temporalGlobal.aumentar();
        //Escribimos la primera variable que va a almacenar el puntero del stack 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= stack[(int)P];\n";
        //Escribimos la primera variable
        let primeraVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "double t1111 = " + primeraVariable + ";\n";
        this.temporalGlobal.aumentar();
        //Escribimos la segunda variable que almacena el puntero del stack de xpath
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= stackXPATH[(int)PXP];\n";
        let segundaVariable = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        //Guardamos un puntero para volver a analizar el mismo nombre con otro atributo distinto 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=" + segundaVariable + ";\n";
        let terceraVariable = this.temporalGlobal.retornarString();
        //Escribimos la etiqueta inicial 
        this.codigoTemporalMetodos += "L0:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let cuartaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-1) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L0;\n";
        //Escribimos la etiqueta L2 
        this.codigoTemporalMetodos += "L2:\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let quintaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + quintaVariable + "==-77) goto L3;\n";
        //Escribimos la etiqueta L4: 
        this.codigoTemporalMetodos += "L4:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heapXPATH[(int)" + segundaVariable + "];\n";
        let sextaVariable = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let septimaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + sextaVariable + "!=" + septimaVariable + ") goto L5;\n";
        this.codigoTemporalMetodos += "if(" + septimaVariable + "==-2) goto L6;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=" + segundaVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L4;\n";
        //Escribimos la etiqueta L5
        this.codigoTemporalMetodos += "L5:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let octavaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + octavaVariable + "==-2) goto L7;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L5;\n";
        //Escribimos la etiqueta L7 
        this.codigoTemporalMetodos += "L7:\n";
        this.codigoTemporalMetodos += segundaVariable + "=" + terceraVariable + ";\n";
        this.codigoTemporalMetodos += "goto L2;\n";
        //Escribimos la etiqueta L6
        this.codigoTemporalMetodos += "L6:\n";
        this.codigoTemporalMetodos += "stackXPATH[(int)PXP] = t1111;\nPXP = PXP+1;\n";
        this.codigoTemporalMetodos += "L3:\nreturn;\n}\n";
    }
    //COMPARACION ETIQUETA 
    comparacionValorEtiquetaC3D() {
        this.codigoTemporalMetodos += "void comparacionValorEtiqueta(){\n";
        this.temporalGlobal.aumentar();
        this.temporalGlobal.aumentar();
        //Dado que es la raiz, ubicamos la posición en STACK en donde se encuentra el principio de la misma Y la asignados a una variable temporal
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= stack[(int)P];\n";
        let inicioRaizXML = this.temporalGlobal.retornarString();
        //Aumentamos el valor de la variable
        this.temporalGlobal.aumentar();
        //Ubicamos nuestra variabel a buscar en el principio del heap 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=stackXPATH[(int)PXP];\n";
        let anteriorGlobal = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        //Ahora escribimos la Etiqueta que simulara un FOR para recorrer ambos strings 
        this.codigoTemporalMetodos += "L0:\n";
        //Asignamos a una nueva variable temporal el valor del principio del indeitificador a buscar 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heapXPATH[(int)" + anteriorGlobal + "];\n";
        let pivoteXP = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= heap[(int)" + inicioRaizXML + "];\n";
        let pivoteXML = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        //escribimos la etiqueta para realizar la comparacion 
        // if(t5 != t6) goto L4;
        // if(t5 == -1) goto L3;
        this.codigoTemporalMetodos += "if(" + pivoteXP + "!=" + pivoteXML + ") goto L1;\n"; //ETIQUETA POR SI LAS PALABRAS NO SON IGUALES
        this.codigoTemporalMetodos += "if(" + pivoteXP + "== -1) goto L2;\n"; //ETIQUETA POR SI LAS PALABRAS SI SON IGUALES
        //EL SIGUIENTE FRAGMENTO ES PARA AUMENTAR LA POSICION PARA CONTINUAR CON LA COMPARACION DE LAS CADENAS 
        this.codigoTemporalMetodos += anteriorGlobal + "=" + anteriorGlobal + "+1;\n";
        this.codigoTemporalMetodos += inicioRaizXML + "=" + inicioRaizXML + "+1;\n";
        this.codigoTemporalMetodos += "goto L0;\n";
        //Ahora sigue las etiquetas de falso y verdadero, asignarles su accion 
        this.codigoTemporalMetodos += "L1:\n";
        this.codigoTemporalMetodos += "stackXPATH[(int)PXP]=-1096;\n";
        this.codigoTemporalMetodos += "goto L3;\n";
        this.codigoTemporalMetodos += "L2:\n";
        this.codigoTemporalMetodos += "stackXPATH[(int)PXP]=" + inicioRaizXML + ";\n";
        this.codigoTemporalMetodos += "L3:\n";
        // this.codigoTemporalMetodos += "if(stackXPATH[(int)PXP]==-1096) printf(\"%c\", (char)98);\n";
        // this.codigoTemporalMetodos += "if(stackXPATH[(int)PXP]!=-1096) printf(\"%c\", (char)97);\n";
        this.codigoTemporalMetodos += "return;\n}\n";
    }
    ejecucionAxesC3D() {
        //Escribimos el nombre del metodo 
        this.codigoTemporalMetodos += "void ejecutarAxe(){\n";
        //Escribimos la primera variable 
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=stackXPATH[(int)PXP];\n";
        let primeraVariable = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heapXPATH[(int)" + primeraVariable + "];\n";
        let segundaVariable = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=" + primeraVariable + ";\n";
        let terceraVariable = this.temporalGlobal.retornarString();
        //ESCRIBIMOS LA ETIQUETA L0 QUE SERVIRÁ PARA IDENTIFICAR EL AXE CHILD 
        this.codigoTemporalMetodos += "L0:\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 99) goto L1;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 104) goto L1;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 105) goto L1;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 108) goto L1;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 100) goto L4;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        //ESCRIBIMOS LA ETIQUETA QUE SERVIRÁ PARA IDENTIFICAR EL AXE ATTRIBUTE 
        this.codigoTemporalMetodos += "L1:\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + terceraVariable + ";\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 97) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 116) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 116) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 114) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 105) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 98) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 117) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 116) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 101) goto L5;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        //AHORA ESCRIBIMOS EL CODIGO PARA LA VERIFICACION DEL AXE DESCENDANT 
        this.codigoTemporalMetodos += "L2:\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + terceraVariable + ";\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 100) goto L3;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 101) goto L3;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 115) goto L3;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 99) goto L3;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 101) goto L3;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 110) goto L3;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 100) goto L3;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 97) goto L3;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 110) goto L3;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + segundaVariable + "!= 116) goto L6;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += segundaVariable + "=heapXPATH[(int)" + primeraVariable + "];\n";
        //AHORA ESCRIBIMOS LAS ACIONES PARA CADA UNO DE LOS CASOS QUE SE CUMPLAN  
        this.codigoTemporalMetodos += "L4:\n";
        this.codigoTemporalMetodos += "PXP = 1;\n";
        this.codigoTemporalMetodos += "goto L7;\n";
        this.codigoTemporalMetodos += "L5:\n";
        this.codigoTemporalMetodos += "PXP = 2;\n";
        this.codigoTemporalMetodos += "goto L7;\n";
        this.codigoTemporalMetodos += "L6:\n";
        this.codigoTemporalMetodos += "PXP = 3;\n";
        this.codigoTemporalMetodos += "goto L7;\n";
        this.codigoTemporalMetodos += "L3:\n";
        this.codigoTemporalMetodos += "PXP = -5;\n";
        this.codigoTemporalMetodos += "goto L7;\n";
        this.codigoTemporalMetodos += "L7:\n";
        this.codigoTemporalMetodos += "return;\n}\n";
    }
    //METODO PARA IMPRIMIR CUALQUIER ATRIBUTO 
    imprimirAtributoAnyC3D() {
        //Comenzamos escribiendo el nombre del método 
        this.codigoTemporalMetodos += "void imprimirAtributoAny(){\n";
        //this.codigoTemporalMetodos += "printf(\"%c\", (char)10);\n";
        this.temporalGlobal.aumentar();
        //Escribimos la primera variable que va a almacenar el puntero del stack 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= stack[(int)P];\n";
        //Escribimos la primera variable
        let primeraVariable = this.temporalGlobal.retornarString();
        //Escribimos la etiqueta inicial 
        this.codigoTemporalMetodos += "L0:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let cuartaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-1) goto L2;\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L0;\n";
        //Escribimos la etiqueta L2 
        this.codigoTemporalMetodos += "L2:\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let quintaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + quintaVariable + "==-77) goto L3;\n";
        //Escribimos la etiqueta L4: 
        this.codigoTemporalMetodos += "L4:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let septimaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + septimaVariable + "==-3) goto L6;\n";
        this.codigoTemporalMetodos += "if(" + septimaVariable + "==-2) goto L5;\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)" + septimaVariable + ");\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L4;\n";
        //Escribimos la etiqueta L5
        this.codigoTemporalMetodos += "L5:\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)10);\n";
        this.codigoTemporalMetodos += "goto L2;\n";
        //Escribimos la etiqueta L6
        this.codigoTemporalMetodos += "L6:\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)61);\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L4;\n";
        //ESCRIBIMOS EL FINAL DEL METODO 
        this.codigoTemporalMetodos += "L3:\nreturn;\n}\n";
    }
    //metodo para la impresion de text en C3D 
    textC3D() {
        /*
        void text(){
    printf("%c", (char)10);
    double t409,t410,t411,t412,t413,t414,t415,t416,t417,t109696;
    t409=stack[(int)P];
    t410=t409;
    L0:
    t411= heap[(int)t409];
    if(t411==-1) goto L1;
    t409=t409+1;
    goto L0;
    L1:
    t409=t409+1;
    L2:
    t412=heap[(int)t409];
    if(t412==-77) goto L5;
    t409=t409+1;
    goto L2;
    L5:
    t409=t409+1;
    t413=heap[(int)t409];
    if(t413==-1) goto L500;
    L6:
    t414=heap[(int)t409];
    if(t414==-1) goto L500;
    printf("%c", (char)t414);
    t409=t409+1;
    goto L6;
    L500:
    return;
    }
        */
        //Se comienza escribiendo el nombre del metodo  
        this.codigoTemporalMetodos += "void text(){\n";
        this.codigoTemporalMetodos += "printf(\"%c\", (char)10);\n";
        /*
        En el siguiente fragmento se procederá a declarar variables locales para el método, dado que
        será recursivo, el usar variables globales afectará el flujo puesto que necesitamos conservar los distintos
        valores en cada iteración
        */
        this.temporalGlobal.aumentar();
        //Este asignacion de variable servirá para poder determinar el inicio de la etiqueta y  todo su contenido  
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=stack[(int)P];\n";
        let primeraVariable = this.temporalGlobal.retornarString();
        //Se escribe la primera etiqueta para la lectura del nombre de la ewtiqueta 
        this.codigoTemporalMetodos += "L0:\n";
        this.temporalGlobal.aumentar();
        //Escribimos la variable pivote para ir recorriendo el nombre de la etiqueta 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= heap[(int)" + primeraVariable + "];\n";
        let terceraVariable = this.temporalGlobal.retornarString();
        //escribimos el condicional para verificar si ya hemos llegado al final de nuestra etiqueta 
        this.codigoTemporalMetodos += "if(" + terceraVariable + "==-1) goto L1;\n";
        //Nos desplazamos en el siguiente caracter a imprimir del nombred de la etiqueta 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Volvemos a iterar hacia la etiqueta inicial 
        this.codigoTemporalMetodos += "goto L0;\n";
        //Escribimos el codigo de la etiqueta cuando ya acabemos de escribir el nombre del nodo actual 
        this.codigoTemporalMetodos += "L1:\n";
        //Nos desplazamos hacia la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Escribimos la etiqueta L2
        this.codigoTemporalMetodos += "L2:\n";
        this.temporalGlobal.aumentar();
        //Asignamos el pivote respectivo 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let cuartaVariable = this.temporalGlobal.retornarString();
        //Escribimos las condicionales para brincar hacia las etiquetas correspondientes de la escritura de ATRIBUTOS  
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-77) goto L5;\n"; //Final de atributos
        //Seguimos desplazandonos a la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Regresamos a la etiqueta de impresion de atributos para seguir iterando 
        this.codigoTemporalMetodos += "goto L2;\n";
        //Ahora se procede a escribir el codigo para el cierre del nombre de etiqueta luego de escribir sus atributos 
        this.codigoTemporalMetodos += "L5:\n";
        //Nos desplazamos en el siguiente caracter a imprimir 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Aumentamos el contador global 
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let quintaVariable = this.temporalGlobal.retornarString();
        //Escribimos el condicional para la verificacion de existencia de texto 
        this.codigoTemporalMetodos += "if(" + quintaVariable + "==-1) goto L500;\n";
        //Escribimos la rutina para la escritura del texto entre etiquetas 
        this.codigoTemporalMetodos += "L6:\n";
        //Aumentamos el contador 
        this.temporalGlobal.aumentar();
        //Escribimos el nuevo pivote para escritura de texto 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let sextaVariable = this.temporalGlobal.retornarString();
        //Escribimos el condicional para verificacion de finalizacion de texto
        this.codigoTemporalMetodos += "if(" + sextaVariable + "==-1) goto L500;\n";
        //Escrbimos el caracter del texto entre etiquetas 
        this.codigoTemporalMetodos += "printf(\"%c\", (char)" + sextaVariable + ");\n"; //Imprimimos el nombre o valor del atributo
        //Seguimos desplazandonos a la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Regresamos a la etiqueta de impresion de atributos para seguir iterando 
        this.codigoTemporalMetodos += "goto L6;\n";
        //FINALIZAMOS EL METODO 
        this.codigoTemporalMetodos += "L500:\n";
        this.codigoTemporalMetodos += "return;\n}\n";
        //En este punto está pendiente todavía la escritura de la finalizacion de etiqueta cuando esta tiene hijos 
    }
    /*********************************************************************************************************************
    *****************************               ****              *****                      *********************************************************************************
    ***************************  ********************************  ****  ********************  ***********************************
    ***************************  ********************************  ****  **********************  *********************************
    ***************************  ********************************  ****  ***********************  ********************************
    ***************************  ***********************           ****  ***********************  ********************************
    ***************************  ********************************  ****  ***********************  ********************************
    ***************************  ********************************  ****  ***********************  ********************************
    ***************************  ********************************  ****  ***********************  ********************************
    ***************************  ********************************  ****  ***********************  ************************
    ******************************             ********            ****                          ****************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
    IMPLEMENTACION DE TRADUCCION A CODIGO DE 3 DIRECCIONES DE XQUERY
    **********************************************************************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
    **********************************************************************************************************************
  
    */
    traducirDeclaracionVariable(nodo) {
        //Primero obtenemos el valor del identificador de la variable 
        let a = nodo.hijos[0].toString();
        this.codigoTemporal += "//Declaracion de la variable " + a + "\n";
        if (this.soyNodo('VAL', nodo.hijos[1]) && nodo.hijos[1].hijos.length > 1) {
            //XQUERY07
            let instanciaResolverExpresion = new Traduccion(nodo.hijos[1], this.raizXML, null, null);
            //instanciaResolverExpresion.ArrayEtiquetas = this.ArrayEtiquetas;
            //instanciaResolverExpresion.ejExp();
            for (let entry of this.ArrayEtiquetas) {
                instanciaResolverExpresion.ArrayEtiquetas.push(entry);
                // salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameID());
            }
            instanciaResolverExpresion.recorrerArbolConsulta(nodo.hijos[1]);
            //this.codigoTemporal += nodo.hijos[1].toString()+"---------------\n";
            //console.log(nodo.hijos[1].toString());
            this.codigoTemporal += "//--------------------------------------------------------\n";
            this.codigoTemporal += instanciaResolverExpresion.codigoTemporal;
            //Ahora escribimos el valor de la variable 
            this.temporalGlobal.aumentar();
            this.codigoTemporal += "//EJECUCION DE XPATH PARA VARIABLE XQUERY\n";
            this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXQ;\n";
            for (var z = instanciaResolverExpresion.contadorConsola; z < instanciaResolverExpresion.consolaSalidaXPATH.length; z++) {
                this.codigoTemporal += "heapXQUERY[(int)HXQ]=" + instanciaResolverExpresion.consolaSalidaXPATH[z].posicion + ";\n";
                this.codigoTemporal += "HXQ = HXQ+1;\n";
            }
            this.codigoTemporal += "heapXQUERY[(int)HXQ] =-1;\n";
            this.codigoTemporal += "HXQ = HXQ+1;\n";
            this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "];\n";
            this.contadorStackXquery++;
            this.codigoTemporal += "//FIN EJECUCION DE XPATH PARA VARIABLE XQUERY\n";
        }
        else {
            //Seguidamente ejecutamos la declaracion de su valor 
            let valor = this.resolverExpresion(nodo.hijos[1]);
            let tempAnterior = this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            //Guardamos el valor de la variable 
            //Valor numerico
            if (valor.tipo == 1) {
                this.codigoTemporal += this.temporalGlobal.retornarString() + "=" + tempAnterior + ";\n";
                this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=" + this.temporalGlobal.retornarString() + ";\n";
                this.contadorStackXquery++;
            }
            //Un string 
            let valorString = valor.valor.toString();
            if (valor.tipo == 2) {
                this.codigoTemporal += this.temporalGlobal.retornarString() + "= HXQ;\n";
                for (var z = 0; z < valorString.length; z++) {
                    this.codigoTemporal += `heapXQUERY[(int)HXQ] = ${valorString.charCodeAt(z)};\n`;
                    this.codigoTemporal += `HXQ = HXQ+1;\n`;
                }
                this.codigoTemporal += `heapXQUERY[(int)HXQ] =-1;\n`;
                this.codigoTemporal += `HXQ = HXQ+1;\n`;
                this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=" + this.temporalGlobal.retornarString() + ";\n";
                this.contadorStackXquery++;
            }
            //Si el valor de la variable es booleana
            if (valor.tipo == 3) {
                /*
                 goto L1;
              L0:
              stack[(int)1] = 1;
              goto L2;
              L1:
              stack[(int)1] = 0;
              L2:
                */
                this.temporalGlobal.aumentarEtiqueta();
                let primeraEtiqueta = this.temporalGlobal.retornarStringEtiqueta();
                this.temporalGlobal.aumentarEtiqueta();
                let segundaEtiqueta = this.temporalGlobal.retornarStringEtiqueta();
                this.temporalGlobal.aumentarEtiqueta();
                let terceraEtiqueta = this.temporalGlobal.retornarStringEtiqueta();
                //Si el valor del booleano es false
                if (!valor.valor) {
                    this.codigoTemporal += "goto " + primeraEtiqueta + ";\n";
                    this.codigoTemporal += primeraEtiqueta + ":\n";
                    this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=0;\n";
                    this.codigoTemporal += "goto " + terceraEtiqueta + ";\n";
                    this.codigoTemporal += segundaEtiqueta + ":\n";
                    this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=1;\n";
                    this.codigoTemporal += terceraEtiqueta + ":\n";
                }
                else { //SI EL VALOR DEL BOOLEANO ES TRUE
                    this.codigoTemporal += "goto " + segundaEtiqueta + ";\n";
                    this.codigoTemporal += primeraEtiqueta + ":\n";
                    this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=0;\n";
                    this.codigoTemporal += "goto " + terceraEtiqueta + ";\n";
                    this.codigoTemporal += segundaEtiqueta + ":\n";
                    this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=1;\n";
                    this.codigoTemporal += terceraEtiqueta + ":\n";
                }
                this.contadorStackXquery++;
            }
        }
    }
    //XQUERY07 resuelvo conflictos
    resolverCondicion(nodo) {
        let contenido = "//imprimo resolver\n";
        this.temporalGlobal.aumentarEtiqueta();
        let MasCondiciones = false;
        //VERIFICAMOS PRIMERO QUE TIPO DE DATO ES
        if (this.soyNodo('and', nodo)) {
            //VERIFICAMOS SI UNO DE LOS HIJOS TIENE TAMBIEN UN VALOR
            if (this.soyNodo('and', nodo.hijos[0]) || this.soyNodo('or', nodo.hijos[0])) {
                //CUYO CASO LO VAMOS A RESOLVER
                contenido += this.resolverCondicion(nodo.hijos[0]);
                MasCondiciones = true;
            }
            if (this.soyNodo('and', nodo.hijos[1]) || this.soyNodo('or', nodo.hijos[1])) {
                //CUYO CASO LO VAMOS A RESOLVER
                contenido += this.resolverCondicion(nodo.hijos[1]);
                MasCondiciones = true;
            }
            if (!MasCondiciones) {
                // HACEMOS USO DE TECNICAS BASICAS DE IF SI SE CUMPLE VAMOS AL SIGUIENTE
                //SINO LLAMA AL SIGUIENETx
                let primero = this.recorrerXquery(nodo.hijos[0], null) + this.temporalGlobal.retornarStringEtiqueta() + ";\n";
                let segundo = this.temporalGlobal.retornarStringEtiqueta() + ":\n" + this.recorrerXquery(nodo.hijos[1], null);
                contenido += primero + segundo;
                this.temporalGlobal.aumentarEtiqueta();
                contenido += this.temporalGlobal.retornarStringEtiqueta() + ";\n";
            }
        } //end and
        //LO MISMO QUE ARRIBA
        if (this.soyNodo('or', nodo)) {
            if (this.soyNodo('and', nodo.hijos[0]) || this.soyNodo('or', nodo.hijos[0])) {
                //CUYO CASO LO VAMOS A RESOLVER
                contenido += this.resolverCondicion(nodo.hijos[0]);
                MasCondiciones = true;
            }
            if (this.soyNodo('and', nodo.hijos[1]) || this.soyNodo('or', nodo.hijos[1])) {
                //CUYO CASO LO VAMOS A RESOLVER
                contenido += this.resolverCondicion(nodo.hijos[1]);
                MasCondiciones = true;
            }
            if (!MasCondiciones) {
                this.temporalGlobal.aumentarEtiqueta();
                let primero = this.recorrerXquery(nodo.hijos[0], null) + this.temporalGlobal.retornarStringEtiqueta() + ";\n";
                this.temporalGlobal.aumentarEtiqueta();
                let segundo = this.recorrerXquery(nodo.hijos[1], null) + this.temporalGlobal.retornarStringEtiqueta() + ";\n";
                contenido += primero + segundo;
            }
        }
        return contenido;
    }
    ContadorParametrosXQUERY(nodo) {
        if (this.soyNodo('L_PARAMETROS', nodo)) {
            return nodo.hijos.length;
        }
        return 0;
    }
    GuardaParametrosXQUERY(nodo, posicion) {
        if (this.soyNodo('L_PARAMETROS', nodo)) {
            let conte = "";
            let contador = 0;
            //POR CADA PARAMETRO GUADRARLO
            nodo.hijos.forEach(hijo => {
                contador++;
                //conte+=this.GuardaParametrosXQUERY(hijo, contador);        
            });
            return contador;
        }
        if (this.soyNodo("DECLARACION2", nodo)) {
            let c = `//parametro ${nodo.hijos[0]}\n`;
            let tipo = nodo.hijos[2];
            switch (tipo) {
                case "boolean":
                    this.temporalGlobal.aumentar();
                    //AQUI GUARDAMOS EN POSICION DE LA LINEA DEL NUEVO NODO
                    c += "//AQUI IMPRIMIMOS BOOLEAN\n";
                    c += this.temporalGlobal.retornarString() + `=stackXQUERY[(int)${posicion}];\n`;
                    this.temporalGlobal.aumentarEtiqueta();
                    /*c+=`if(${this.temporalGlobal.retornarString()}==1) goto ${this.temporalGlobal.retornarStringEtiqueta()};\n`
                    //GUARDAMOS LA POSICION DEL NUEVO GOTO
                    let idsi = this.temporalGlobal.retornarStringEtiqueta();
                    this.temporalGlobal.aumentarEtiqueta();
                    let idno = this.temporalGlobal.retornarStringEtiqueta();
                    c+=`goto ${idno};\n`
                    c+=idsi+":\n"
                    c+=`printf("%c", (char)116);
                    printf("%c", (char)114);
                    printf("%c", (char)117);
                    printf("%c", (char)101);
                    `;
                    this.temporalGlobal.aumentar();
                    //GUARDAMOS LA SALIDA
                    let sal = this.temporalGlobal.retornarStringEtiqueta();
                    c+=`goto ${sal};\n`;
                    c+=idno+":\n"
                    c+=`printf("%c", (char)102);
                    printf("%c", (char)97);
                    printf("%c", (char)108);
                    printf("%c", (char)115);
                    printf("%c", (char)101);
                    `;
                    c+=sal+":\n"
                    c+=`printf("%c",(char)10)`;*/
                    break;
                case "decimal":
                case "integer":
                    this.temporalGlobal.aumentar();
                    c += `//AQUI guardamos integer, decimal\n`;
                    c += this.temporalGlobal.retornarString() + `=stackXQUERY[(int)${posicion}];\n`;
                    break;
                case "string":
                    this.temporalGlobal.aumentar();
                    c += `//AUQI GUARDAMOS STRING\n`;
                    c += this.temporalGlobal.retornarString() + `=stackXQUERY[(int)${posicion}];\n`;
                    break;
            }
            return c + "\n";
        }
    }
    GeneraLlamadaMetodo(nombre) {
        //Llamamos a nuestro metodo en la tabla
        let Metodo = this.ListaMetodosXQUERY.get(nombre.toLowerCase());
        if (Metodo != null) {
            let c = `//HACIENDO LA LLAMAD AL METODO ${nombre} DE LA POSICION ${Metodo.linea}\n`;
            //GUARDAMOS EN PXQ la posicion del metodo
            c += `PXQ= ${Metodo.linea};\n`;
            //GENERO POR AHORA UN TEMPORAL CON CADA ITEM
            for (let i = 1; i <= Metodo.parametros; i++) {
                this.temporalGlobal.aumentar();
                c += `stackXQUERY[(int)${Metodo.linea + i}]=${this.temporalGlobal.retornarString()};\n`;
            }
            c += nombre + "();\n";
            return c;
        }
        return "";
    }
    //METODO RESOLVER EXPRESION EXPLICITO PARA XQUERY
    //FIN DEL METODO RESOLVER EXPRESION PARA XQUERY 
    //XQUERY08
    AuxiliarGuardar() {
        let ax = "";
        let salida = this.miSalidaXQUERT.split("»");
        /*salida.push("prueba1");
        salida.push("prueba2");
        salida.push("prueba3");*/
        //contamos la cantidad de caracteres que tiene
        let cantidad = salida.length + 2;
        salida.forEach(e => {
            cantidad += e.length;
        });
        //Guardamos la posicion inicial
        let posicionInicial = 30101999 - cantidad;
        this.posicionXQUERY1 = posicionInicial;
        //GUARDAMOS H
        this.temporalGlobal.aumentar();
        let hxml = this.temporalGlobal.retornarString();
        ax += `${hxml}=H;`;
        ax += "//guardamos AUX\n";
        //PONEMOS EL AUX EN ESA POSICION
        ax += `H=${posicionInicial};\n`;
        //recorremos la salida nueva
        salida.forEach(et => {
            let e = et;
            e = e.replace(/[\n]/gi, " ");
            e = e.replace(/[,]/gi, "\n");
            e = e.replace(/[<]/gi, "");
            e = e.replace(/[>]/gi, ">>");
            for (let i = 0; i < e.length; i++) {
                ax += `heap[(int)H]=${e.charCodeAt(i)};\n`;
                ax += `H=H+1;\n`;
            }
            //GUARDAMOS UN ENTER
            ax += `heap[(int)H]=10;\n`;
            ax += `H=H+1;\n`;
        });
        //AL FINAL AGREGAMOS EL PIVOTE DE SALIDA
        ax += `heap[(int)H]=-32;\n`;
        ax += `H=H+1;\n`;
        ax += "//terminamos AUX\n";
        //TODO guardar info en un string
        //AHORA DEVOLVEMOS EL VALOR
        ax += `H=${hxml};\n`;
        return ax;
    }
    AuxiliarImpresion() {
        let con = `void impresion2(){\n`;
        //GENERAMOS AUXILIARES
        //GUARDAMOS ETIQUETAS
        this.temporalGlobal.aumentar();
        let idt = this.temporalGlobal.retornarString();
        this.temporalGlobal.aumentarEtiqueta();
        this.temporalGlobal.aumentar();
        let idtv = this.temporalGlobal.retornarString();
        let labelIf = this.temporalGlobal.retornarStringEtiqueta();
        this.temporalGlobal.aumentarEtiqueta();
        let labelSalida = this.temporalGlobal.retornarStringEtiqueta();
        //GUARDAMOS EL H DE HTML
        //RECORREMOS LA SALIDA
        con += `${idt}=HXQ;\n`;
        con += labelIf + ":\n";
        con += `${idtv}=heap[(int)${idt}];\n`;
        con += `if(${idtv}==-32) goto ${labelSalida};\n`;
        con += `printf("%c ",(int)${idtv});\n`;
        con += idt + "=1+" + idt + ";\n";
        //RETORNAMOS AL IF LABEL
        con += "goto " + labelIf + ";\n";
        //GUARDAMOS ETIQUETA
        con += `${labelSalida}:\n`;
        con += "return;\n}\n";
        this.codigoTemporalMetodos += con;
        //SUBIMOS ESTO AL METODO AUXILIAR
    } //FIN AUXILIAR IMPRESION
    AuxiliarImpresionMAIN() {
        return `\nHXQ=${this.posicionXQUERY1};\nimpresion2();\n`;
    }
    //METODO PARA RESOLER EL FOR  
    traducirFor(nodo, tipo) {
        //Primero resolvemos la consulta de xpath que lleva 
        //XQUERY07
        let instanciaResolverExpresion = new Traduccion(nodo.hijos[1].hijos[0], this.raizXML, null, null);
        //instanciaResolverExpresion.ArrayEtiquetas = this.ArrayEtiquetas;
        //instanciaResolverExpresion.ejExp();
        for (let entry of this.ArrayEtiquetas) {
            instanciaResolverExpresion.ArrayEtiquetas.push(entry);
            // salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameID());
        }
        instanciaResolverExpresion.recorrerArbolConsulta(instanciaResolverExpresion.raiz);
        //this.codigoTemporal += nodo.hijos[1].toString()+"---------------\n";
        //console.log(nodo.hijos[1].toString());
        this.codigoTemporal += "//--------------------------------------------------------\n";
        this.codigoTemporal += instanciaResolverExpresion.codigoTemporal;
        //Ahora escribimos el valor de la variable 
        this.temporalGlobal.aumentar();
        this.codigoTemporal += "//EJECUCION DE CONSULTA FOR\n";
        this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXQ;\n";
        for (var z = instanciaResolverExpresion.contadorConsola; z < instanciaResolverExpresion.consolaSalidaXPATH.length; z++) {
            this.codigoTemporal += "heapXQUERY[(int)HXQ]=" + instanciaResolverExpresion.consolaSalidaXPATH[z].posicion + ";\n";
            this.codigoTemporal += "HXQ = HXQ+1;\n";
        }
        this.codigoTemporal += "heapXQUERY[(int)HXQ] =-1;\n";
        this.codigoTemporal += "HXQ = HXQ+1;\n";
        this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=" + this.temporalGlobal.retornarString() + ";\n";
        this.contadorStackXquery++;
        this.codigoTemporal += "//FIN EJECUCION DE CONSULTA FOR \n";
        //AHORA SE PROCEDE A RESOLVER LAS CONDICIONES RESPECTIVAS 
        this.recorrerXquery(nodo.hijos[2].hijos[0], instanciaResolverExpresion);
    }
    //METODO PARA AUXILIAR DEL FOR 
    auxiliarFor() {
        //Se comienza escribiendo el nombre del metodo  
        this.codigoTemporalMetodos += "void auxiliarFor(){\n";
        /*
        En el siguiente fragmento se procederá a declarar variables locales para el método, dado que
        será recursivo, el usar variables globales afectará el flujo puesto que necesitamos conservar los distintos
        valores en cada iteración
        */
        this.codigoTemporalMetodos += "double ";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString();
        let contador = 2;
        this.temporalGlobal.aumentar();
        for (var i = 0; i < 8; i++) {
            this.codigoTemporalMetodos += "," + this.temporalGlobal.retornarString();
            this.temporalGlobal.aumentar();
            contador++;
        }
        this.codigoTemporalMetodos += ",t109696";
        this.codigoTemporalMetodos += ";\n";
        //En este punto regresamos las variables a como se encontraban al principio para que la escritura siga normal 
        this.temporalGlobal.contador = this.temporalGlobal.contador - contador;
        //Este asignacion de variable servirá para poder determinar el inicio de la etiqueta y  todo su contenido  
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=stack[(int)P];\n";
        let primeraVariable = this.temporalGlobal.retornarString();
        //Aumentamos el contador de el generador de variables temporales 
        this.temporalGlobal.aumentar();
        //Hacemos la asignacion de tipo t2 = t1 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=" + primeraVariable + ";\n";
        let segundaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "t109696=" + primeraVariable + ";\n";
        //Se escribe la primera etiqueta para la lectura del nombre de la ewtiqueta 
        this.codigoTemporalMetodos += "L0:\n";
        this.temporalGlobal.aumentar();
        //Escribimos la variable pivote para ir recorriendo el nombre de la etiqueta 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= heap[(int)" + primeraVariable + "];\n";
        let terceraVariable = this.temporalGlobal.retornarString();
        //escribimos el condicional para verificar si ya hemos llegado al final de nuestra etiqueta 
        this.codigoTemporalMetodos += "if(" + terceraVariable + "==-1) goto L1;\n";
        //Se escribe el caracter actual del nombre de la etiqueta 
        //Nos desplazamos en el siguiente caracter a imprimir del nombred de la etiqueta 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Volvemos a iterar hacia la etiqueta inicial 
        this.codigoTemporalMetodos += "goto L0;\n";
        //Escribimos el codigo de la etiqueta cuando ya acabemos de escribir el nombre del nodo actual 
        this.codigoTemporalMetodos += "L1:\n";
        //Nos desplazamos hacia la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Escribimos la etiqueta L2
        this.codigoTemporalMetodos += "L2:\n";
        this.temporalGlobal.aumentar();
        //Asignamos el pivote respectivo 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let cuartaVariable = this.temporalGlobal.retornarString();
        //Escribimos las condicionales para brincar hacia las etiquetas correspondientes de la escritura de ATRIBUTOS  
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-77) goto L5;\n"; //Final de atributos
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-3) goto L4;\n"; //Final de nombre atributo
        this.codigoTemporalMetodos += "if(" + cuartaVariable + "==-2) goto L3;\n"; //Final valor atributo
        //  this.codigoTemporalMetodos += "printf(\"%c\", (char)" + cuartaVariable + ");\n"; //Imprimimos el nombre o valor del atributo
        //Seguimos desplazandonos a la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Regresamos a la etiqueta de impresion de atributos para seguir iterando 
        this.codigoTemporalMetodos += "goto L2;\n";
        //Ahora se va a escribir el espacio entre atributos 
        this.codigoTemporalMetodos += "L3:\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L2;\n";
        //Ahora se escribe el signo igual para asignarle el valor al atributo respectivo
        this.codigoTemporalMetodos += "L4:\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L2;\n";
        //Ahora se procede a escribir el codigo para el cierre del nombre de etiqueta luego de escribir sus atributos 
        this.codigoTemporalMetodos += "L5:\n";
        //Escribimos el simbolo > 
        //Nos desplazamos en el siguiente caracter a imprimir 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Aumentamos el contador global 
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let quintaVariable = this.temporalGlobal.retornarString();
        //Escribimos el condicional para la verificacion de existencia de texto 
        this.codigoTemporalMetodos += "if(" + quintaVariable + "==-1) goto L9;\n";
        //Escribimos la rutina para la escritura del texto entre etiquetas 
        this.codigoTemporalMetodos += "L6:\n";
        //Aumentamos el contador 
        this.temporalGlobal.aumentar();
        //Escribimos el nuevo pivote para escritura de texto 
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        let sextaVariable = this.temporalGlobal.retornarString();
        //Escribimos el condicional para verificacion de finalizacion de texto
        this.codigoTemporalMetodos += "if(" + sextaVariable + "==-1) goto L7;\n";
        //Escrbimos el caracter del texto entre etiquetas 
        // this.codigoTemporalMetodos += "printf(\"%c\", (char)" + sextaVariable + ");\n"; //Imprimimos el nombre o valor del atributo
        //Seguimos desplazandonos a la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Regresamos a la etiqueta de impresion de atributos para seguir iterando 
        this.codigoTemporalMetodos += "goto L6;\n";
        //Escribimos la etiqueta para la finalizacion de escritura de texto 
        this.codigoTemporalMetodos += "L7:\n";
        this.codigoTemporalMetodos += "L8:\n";
        //Aumentamos el contador 
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "= heap[(int)" + segundaVariable + "];\n";
        let septimaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + septimaVariable + "==-1)goto L10;\n"; //fin de etiqueta con texto entre etique
        //  this.codigoTemporalMetodos += "printf(\"%c\", (char)" + septimaVariable + ");\n";
        this.codigoTemporalMetodos += segundaVariable + "=" + segundaVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L8;\n";
        this.codigoTemporalMetodos += "L10:\n";
        // this.codigoTemporalMetodos += "printf(\"%c\", (char)62);\n";
        this.codigoTemporalMetodos += "goto L500;\n";
        //Escribimos la etiqueta que se encargará de trabajar la recursividad para la impresión de todo el contenido 
        this.codigoTemporalMetodos += "L9:\n";
        //Nos desplazamos a la siguiente posicion para verificar si hay hijos 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Aumentamos el contador 
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)" + primeraVariable + "];\n";
        // this.codigoTemporalMetodos += "printf(\" % c\", (char)32);\n";
        let octavaVariable = this.temporalGlobal.retornarString();
        //Escribimos la etiqueta que contiene la recursividad 
        this.codigoTemporalMetodos += "L18:\n";
        //ESCRIBIMOS LAS CONDICIONALES PARA SABER SI FINALIZA LA RECURSIVIDAD O FINALIZA UN HIJO 
        this.codigoTemporalMetodos += octavaVariable + "=heap[(int)" + primeraVariable + "];\n";
        this.codigoTemporalMetodos += "if(" + octavaVariable + "==-2) goto L14;\n";
        this.codigoTemporalMetodos += "if(" + octavaVariable + "==-9) goto L499;\n";
        //Asignamos al puntero del stack la posicion para iniciar en la nueva iteracion 
        this.codigoTemporalMetodos += "P=" + octavaVariable + ";\n";
        //Llamamos al método para manejar la recursividad 
        this.codigoTemporalMetodos += "auxiliarFor();\n";
        //No ubicamos en la siguiente posicion 
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        //Iteramos nuevamente
        this.codigoTemporalMetodos += "goto L18;\n";
        //Escribimos el codigo para pasar de un hijo a otro  
        this.codigoTemporalMetodos += "L14:\n";
        this.codigoTemporalMetodos += primeraVariable + "=" + primeraVariable + "+1;\n";
        this.codigoTemporalMetodos += "goto L18;\n";
        //METODO PARA ESCRIBIR LA ETIQUETA FINAL DE UNA ETIQUETA CON HIJOS 
        this.codigoTemporalMetodos += "L499:\n";
        this.codigoTemporalMetodos += "L498:\n";
        this.temporalGlobal.aumentar();
        this.codigoTemporalMetodos += this.temporalGlobal.retornarString() + "=heap[(int)t109696];\n";
        let novenaVariable = this.temporalGlobal.retornarString();
        this.codigoTemporalMetodos += "if(" + novenaVariable + "==-1) goto L497;\n";
        this.codigoTemporalMetodos += "t109696 = t109696+1;\n";
        this.codigoTemporalMetodos += "goto L498;\n";
        this.codigoTemporalMetodos += "L497:\n";
        //FINALIZAMOS EL METODO 
        this.codigoTemporalMetodos += "L500:\n";
        this.codigoTemporalMetodos += "return;\n}\n";
        //En este punto está pendiente todavía la escritura de la finalizacion de etiqueta cuando esta tiene hijos 
    }
    //METODO PARA LA TRADUCCION DE FOR DE TIPO 1 
    traducirFor1(nodo, tipo) {
        //Primero resolvemos la consulta de xpath que lleva 
        //XQUERY07
        let instanciaResolverExpresion = new Traduccion(nodo.hijos[1].hijos[0], this.raizXML, null, null);
        //instanciaResolverExpresion.ArrayEtiquetas = this.ArrayEtiquetas;
        //instanciaResolverExpresion.ejExp();
        for (let entry of this.ArrayEtiquetas) {
            instanciaResolverExpresion.ArrayEtiquetas.push(entry);
            // salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameID());
        }
        instanciaResolverExpresion.recorrerArbolConsulta(instanciaResolverExpresion.raiz);
        //this.codigoTemporal += nodo.hijos[1].toString()+"---------------\n";
        //console.log(nodo.hijos[1].toString());
        this.codigoTemporal += "//--------------------------------------------------------\n";
        this.codigoTemporal += instanciaResolverExpresion.codigoTemporal;
        //Ahora escribimos el valor de la variable 
        this.temporalGlobal.aumentar();
        // this.codigoTemporal += "//EJECUCION DE CONSULTA FOR\n";
        this.codigoTemporal += this.temporalGlobal.retornarString() + "=HXQ;\n";
        for (var z = instanciaResolverExpresion.contadorConsola; z < instanciaResolverExpresion.consolaSalidaXPATH.length; z++) {
            this.codigoTemporal += "heapXQUERY[(int)HXQ]=" + instanciaResolverExpresion.consolaSalidaXPATH[z].posicion + ";\n";
            this.codigoTemporal += "HXQ = HXQ+1;\n";
        }
        this.codigoTemporal += "heapXQUERY[(int)HXQ] =-1;\n";
        this.codigoTemporal += "HXQ = HXQ+1;\n";
        this.codigoTemporal += "stackXQUERY[(int)" + this.contadorStackXquery + "]=" + this.temporalGlobal.retornarString() + ";\n";
        this.contadorStackXquery++;
        for (z = instanciaResolverExpresion.contadorConsola; z < instanciaResolverExpresion.consolaSalidaXPATH.length; z++) {
            this.codigoTemporal += "P=" + instanciaResolverExpresion.consolaSalidaXPATH[z].posicion + ";\n";
        }
        //AHORA SE PROCEDE A RESOLVER LAS CONDICIONES RESPECTIVAS 
        //this.recorrerXquery(nodo.hijos[2].hijos[0],instanciaResolverExpresion);
    }
}
exports.Traduccion = Traduccion;
