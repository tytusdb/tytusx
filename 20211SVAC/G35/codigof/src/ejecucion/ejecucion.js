"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ejecucion = void 0;
const errores_1 = require("../arbol/errores");
const error_1 = require("../arbol/error");
const salida_1 = require("../arbol/salida");
const entorno_1 = require("./entorno");
const entornos_1 = require("./entornos");
const etiqueta_1 = require("./etiqueta");
const atributo_1 = require("./atributo");
const Expresion_1 = require("./Expresion/Expresion");
const Simbolo_1 = require("./Expresion/Simbolo");
const salidaXPATH_1 = require("../ejecucion/salidaXPATH");
const Funcion_1 = require("./Expresion/Funcion");
class Ejecucion {
    constructor(raiz, raizXML, raiz2) {
        this.contadorxml = 0;
        this.ArrayEtiquetas = new Array();
        this.arrayPosicionPadres = new Array();
        this.consolaSalidaXPATH = new Array();
        this.auxiliarEtiquetaResolverExpresion = null;
        this.controladorPredicado = false;
        this.controladorPredicadoInicio = false;
        this.controladorText = false;
        // arrayPosicionPadres = new Array<number>();
        //consolaSalidaXPATH = new Array<Etiqueta>();
        //auxiliarEtiquetaResolverExpresion = new Array<Etiqueta>();
        this.auxiliarAxe = "";
        this.dobleSimpleAxe = false;
        this.controladorAncestor = false;
        this.arrayAncestor = new Array();
        this.padresDobleAcceso = new Array();
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
        this.nodoConsulta = null;
        this.txtSalida = "";
        this.txtSalida2 = "";
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
        return label.replace(/[\n\"\'\`]+/g, "");
    }
    getDotXML() {
        this.contadorxml = 0;
        this.dotXML = "digraph G {\n";
        if (this.raizXML != null) {
            this.generacionDotXML(this.raizXML);
        }
        this.dotXML += "\n}";
        return this.dotXML;
    }
    generacionDotXML(nodo) {
        if (nodo instanceof Object) {
            let idPadre = this.contadorxml;
            this.dotXML += `node${idPadre}[label="${this.getStringValue(nodo.label)}"];\n`;
            if (nodo.hasOwnProperty("hijos")) {
                nodo.hijos.forEach((nodoHijo) => {
                    let idHijo = ++this.contadorxml;
                    this.dotXML += `node${idPadre} -> node${idHijo};\n`;
                    if (nodoHijo instanceof Object) {
                        this.generacionDotXML(nodoHijo);
                    }
                    else {
                        this.dotXML += `node${idHijo}[label="${this.getStringValue(nodoHijo)}"];`;
                    }
                });
            }
        }
    }
    getDot2() {
        this.contador2 = 0;
        this.dot2 = "digraph G {\n";
        if (this.raiz2 != null) {
            this.generacionDot2(this.raiz2);
        }
        this.dot2 += "\n}";
        return this.dot2;
    }
    generacionDot2(nodo) {
        if (nodo instanceof Object) {
            let idPadre = this.contador2;
            this.dot2 += `node${idPadre}[label="${this.getStringValue(nodo.label)}"];\n`;
            if (nodo.hasOwnProperty("hijos")) {
                nodo.hijos.forEach((nodoHijo) => {
                    let idHijo = ++this.contador2;
                    this.dot2 += `node${idPadre} -> node${idHijo};\n`;
                    if (nodoHijo instanceof Object) {
                        this.generacionDot2(nodoHijo);
                    }
                    else {
                        this.dot2 += `node${idHijo}[label="${this.getStringValue(nodoHijo)}"];`;
                    }
                });
            }
        }
    }
    ejecutar() {
        const instrucciones = this.recorrerXML(this.raizXML);
        if (instrucciones instanceof Array) {
            const entorno = new entorno_1.Entorno();
            salida_1.Salida.getInstance().clear();
            instrucciones.forEach(element => {
                entorno.setEtiqueta(element);
                this.ArrayEtiquetas.push(element);
            });
            entornos_1.Entornos.getInstance().push(entorno);
        }
        //EDVIN AQUI PONE TU CODIGO DE EJECUTAR
        //this.recorrerExpresion(this.raiz); //<--Use esto para probar el resolverExpresion, pero no sirve para nada
        //Para utilizar el resolverExpresion solo hacer ResolverExpresion(Nodo) con el nodo que querras resolver
        //Retorna un objeto de tipo Expresion con tipo(string, number, bool) y su valor
        /*ACA EMPIEZA LA EJECUCION DE LA CONSULTA DE XPATH
        */
        this.recorrerArbolConsulta(this.raiz);
        //EJECUCION XQUERY
        this.recorrerXquery(this.raiz2, null);
    }
    getSalida() {
        return salida_1.Salida.getInstance().lista;
    }
    imprimirErrores() {
        if (errores_1.Errores.getInstance().hasErrors()) {
            errores_1.Errores.getInstance().getErrors().forEach((error) => {
                console.log(error.descripcion);
            });
        }
    }
    //EDVIN
    /*
    
    AQUI FALTA EL METODO RECORRER, ESE LO AGREGAS DE TU CODIGO
    
    */
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
                    this.CODIGO = nodoHijo.hijos[0];
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
            this.CODIGO = nodo.hijos[0];
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
            let poss = nodo.hijos[0].linea;
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
            let NuevaEtiqueta = new etiqueta_1.Etiqueta(id, atributos, hijoEtiqueta, textoo, poss);
            return NuevaEtiqueta;
        }
    }
    /**
     * Funcion para determinar si no tengo funciones anidadas
     * @param nodo
     */
    puedoEjecutar(nodo) {
        //S
        if (this.soyNodo('S', nodo)) {
            for (let nodoHijo of nodo.hijos) {
                const resp = this.puedoEjecutar(nodoHijo);
                if (!resp)
                    return false;
            }
        }
        //INSTRUCCIONES
        if (this.soyNodo('INSTRUCCIONES', nodo)) {
            for (let nodoHijo of nodo.hijos) {
                //Ejecuto solo los nodos que sean DECLARACION_FUNCION
                if (this.soyNodo('DECLARACION_FUNCION', nodoHijo)) {
                    const res = this.puedoEjecutar(nodoHijo);
                    if (!res)
                        return false;
                }
            }
        }
        //DECLARACION_FUNCION
        if (this.soyNodo('DECLARACION_FUNCION', nodo)) {
            for (let nodoHijo of nodo.hijos) {
                //Si es el nodo INSTRUCCIONES
                if (this.soyNodo('INSTRUCCIONES', nodoHijo)) {
                    for (let nodoInst of nodoHijo.hijos) {
                        if (this.soyNodo('DECLARACION_FUNCION', nodoInst)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
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
    resolverExpresion(nodo, entorno) {
        if (this.soyNodo('VAL', nodo)) {
            //Para verificar si lo que se va a examinar es una ruta o un elemento unicamente
            //Sí la cantidad de hijos es mayor a 1, significa que tenemos una ruta 
            if ((nodo.hijos.length > 1)
                && (this.soyNodo('identificador2', nodo.hijos[0].hijos[0]))) {
                let exp1 = this.resolverExpresion(nodo.hijos[0], entorno);
                if (exp1.tipo == 4) {
                    let a1 = exp1.valor;
                    for (let j = 1; j < nodo.hijos.length; j++) {
                        //Se le agregan los nodos de la consulta actual a nodoConsulta
                        //recordando, nodo consulta trae los nodos de la consulta original
                        //Esto significa, que a la larga, estamos agregandole ramas al para armar la consulta deseada
                        a1.nodoConsulta.hijos.push(nodo.hijos[j]);
                    }
                    let expresionFinal = this.resolverExpresion(a1.nodoConsulta, entorno);
                    return expresionFinal;
                }
                //return new Expresion({tipo_:TIPO_DATO.ETIQUETA,valor_:instanciaResolverExpresion});
            }
            else if (nodo.hijos.length > 1 || this.soyNodo('SIMPLE', nodo.hijos[0]) || this.soyNodo('DOBLE', nodo.hijos[0]) || this.soyNodo('identificador', nodo.hijos[0].hijos[0]) || this.soyNodo('atributo', nodo.hijos[0].hijos[0])) {
                let instanciaResolverExpresion = new Ejecucion(nodo, this.raizXML, null);
                //instanciaResolverExpresion.ArrayEtiquetas = this.ArrayEtiquetas;
                //instanciaResolverExpresion.ejExp();
                if (this.consolaSalidaXPATH.length > 0) {
                    for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length; i++) {
                        instanciaResolverExpresion.ArrayEtiquetas.push(this.consolaSalidaXPATH[i]);
                        // salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameID());
                    }
                }
                else {
                    for (let j of this.ArrayEtiquetas) {
                        instanciaResolverExpresion.ArrayEtiquetas.push(j);
                    }
                }
                instanciaResolverExpresion.recorrerArbolConsulta(instanciaResolverExpresion.raiz);
                instanciaResolverExpresion.nodoConsulta = nodo;
                /*  let arrayRetorno = new Array<Etiqueta>();
                  for (var i = instanciaResolverExpresion.contadorConsola; i < instanciaResolverExpresion.consolaSalidaXPATH.length - 1;i++)
                  {
                    arrayRetorno.push(instanciaResolverExpresion.consolaSalidaXPATH[i]);
                  }*/
                return new Expresion_1.Expresion({ tipo_: 4 /* ETIQUETA */, valor_: instanciaResolverExpresion });
            }
            return this.resolverExpresion(nodo.hijos[0], entorno);
        }
        else if (this.soyNodo('X', nodo)) {
            return this.resolverExpresion(nodo.hijos[0], entorno);
        }
        else if (this.soyNodo('E', nodo)) {
            return this.resolverExpresion(nodo.hijos[0], entorno);
        }
        else if (this.soyNodo('entero', nodo)) {
            var valor_ = Number(nodo.hijos[0]);
            return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
        }
        else if (this.soyNodo('doble', nodo)) {
            var valor_ = Number(nodo.hijos[0]);
            return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
        }
        else if (this.soyNodo('string_s', nodo)) {
            let valor_ = nodo.hijos[0].toString();
            var result = valor_.substring(1, valor_.length - 1);
            return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: result });
        }
        else if (this.soyNodo('string_d', nodo)) {
            let valor_ = nodo.hijos[0].toString();
            var result = valor_.substring(1, valor_.length - 1);
            return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: result });
        }
        else if (this.soyNodo('identificador2', nodo)) {
            let id_ = nodo.hijos[0].toString();
            //var sim=entorno.buscarVariable(id_,nodo.linea);
            var sim = entorno.buscarVariable(id_, nodo.linea);
            if (sim != null) {
                return new Expresion_1.Expresion({ tipo_: sim.tipo, valor_: sim.valor });
            }
        }
        else if (this.soyNodo('booleano', nodo)) {
            let valor_ = JSON.parse(nodo.hijos[0].toString().toLowerCase());
            return new Expresion_1.Expresion({ tipo_: 3 /* BOOLEAN */, valor_: valor_ });
        }
        else if (this.soyNodo('last', nodo)) {
            let valor_ = (this.consolaSalidaXPATH.length) - this.contadorConsola;
            return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: valor_ });
        }
        //LLAMADA DE FUNCIONES
        else if (this.soyNodo('LLAMADA_FUNCION', nodo)) {
            return this.llamarFuncion(nodo, entorno);
        }
        //NEGATIVO
        else if (this.soyNodo('negativo', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
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
        else if (this.soyNodo('+', nodo)) {
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
            let expresion1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let expresion2 = this.resolverExpresion(nodo.hijos[1], entorno);
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
        //ACCESO_ARREGLO
        else if (this.soyNodo('ACCESO_ARREGLO', nodo)) {
            //  Acceso array
            //    /     \
            //  id      [E]
            let identificador = nodo.hijos[0].toString();
            let sim = entorno.buscarVariable(identificador, nodo.linea);
            if (sim != null) {
                if (sim.tipo == 6) {
                    let indice = this.resolverExpresion(nodo.hijos[1], entorno);
                    if (indice.tipo == 1) {
                        if ((indice.valor > 0) && (indice.valor <= sim.valor.length)) {
                            return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: sim.valor[indice.valor - 1] });
                        }
                    }
                    errores_1.Errores.getInstance().push(new error_1.Error({
                        tipo: "semantico",
                        linea: (nodo.linea + 1).toString(),
                        descripcion: ('Error en el indice al que intenta acceder'),
                    }));
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({
                        tipo: "semantico",
                        linea: (nodo.linea + 1).toString(),
                        descripcion: ('La variable a la que intenta acceder, no es un arreglo'),
                    }));
                }
            }
        }
        //DECLARA_ARREGLO
        else if (this.soyNodo('DECLARA_ARREGLO', nodo)) {
            let valor1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let valor2 = this.resolverExpresion(nodo.hijos[1], entorno);
            if ((valor1.tipo == 1) && (valor2.tipo == 1)) {
                //si ambos son numeros
                if (valor1.valor <= valor2.valor) {
                    //Valor1 debe ser menor a valor2
                    let nuevoArray = [];
                    let longitud = valor2.valor - valor1.valor;
                    for (let i = 0; i <= longitud; i++) {
                        nuevoArray[i] = i + valor1.valor;
                    }
                    return new Expresion_1.Expresion({ tipo_: 6 /* ARREGLO */, valor_: nuevoArray });
                }
                else { //error: valor1 > valor2
                    errores_1.Errores.getInstance().push(new error_1.Error({
                        tipo: "semantico",
                        linea: (nodo.linea + 1).toString(),
                        descripcion: ('El primer valor debe ser menor al segundo para poder declarar el arreglo'),
                    }));
                }
            }
            else { //valo1 o valor2 no es tipo number
                errores_1.Errores.getInstance().push(new error_1.Error({
                    tipo: "semantico",
                    linea: (nodo.linea + 1).toString(),
                    descripcion: ('Error en el valor que intenta asignar'),
                }));
            }
        }
        //To_STRING
        else if (this.soyNodo('TO_STRING', nodo)) {
            let valor1 = this.resolverExpresion(nodo.hijos[0], entorno);
            if ((valor1.tipo != 0)) {
                //Si no es error, se ejecuta
                let resultado = valor1.valor;
                return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: resultado });
            }
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (nodo.linea + 1).toString(),
                descripcion: ('Error al convertir a string'),
            }));
        }
        //To number
        else if (this.soyNodo('TO_NUMBER', nodo)) {
            let valor1 = this.resolverExpresion(nodo.hijos[0], entorno);
            if ((valor1.tipo != 0)) {
                //Si no es error, se ejecuta
                //booleanos deben retornar 1 o 0
                if (valor1.tipo == 3) {
                    if (valor1.valor) {
                        return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: 1 });
                    }
                    return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: 0 });
                }
                else if (valor1.tipo == 4) {
                    //Si es una etiqeuta se convierte a number su valor
                    let ejecucionAux = valor1.valor;
                    if (ejecucionAux.consolaSalidaXPATH.length > 0) {
                        let indiceEtiqeuta = ejecucionAux.consolaSalidaXPATH.length - 1;
                        let valorEtiqueta = ejecucionAux.consolaSalidaXPATH[indiceEtiqeuta].valor;
                        //console.log(ejecucionAux);
                        let numberValor = Number(valorEtiqueta);
                        if (!isNaN(numberValor)) {
                            return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: numberValor });
                        }
                    }
                }
                let resultado = valor1.valor;
                if (!isNaN(resultado)) {
                    return new Expresion_1.Expresion({ tipo_: 1 /* NUMBER */, valor_: resultado });
                }
            }
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (nodo.linea + 1).toString(),
                descripcion: ('Error al convertir a number'),
            }));
        }
        //to upper
        else if (this.soyNodo('LOWER', nodo)) {
            let valor1 = this.resolverExpresion(nodo.hijos[0], entorno);
            if ((valor1.tipo != 0)) {
                //Si no es error, se ejecuta
                if (valor1.tipo == 4) {
                    let txtRes1 = "";
                    let a1 = valor1.valor;
                    //console.log(a1);
                    for (let j = a1.contadorConsola; j < a1.consolaSalidaXPATH.length; j++) {
                        txtRes1 += a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta() + " ";
                    }
                    let txtRes2 = txtRes1.toLowerCase();
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: txtRes2 });
                }
                let resultado = valor1.valor;
                let mayus = resultado.toString().toLowerCase();
                return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: mayus });
            }
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (nodo.linea + 1).toString(),
                descripcion: ('Error al convertir a string'),
            }));
        }
        //to upper
        else if (this.soyNodo('UPPER', nodo)) {
            let valor1 = this.resolverExpresion(nodo.hijos[0], entorno);
            if ((valor1.tipo != 0)) {
                //Si no es error, se ejecuta
                if (valor1.tipo == 4) {
                    let txtRes1 = "";
                    let a1 = valor1.valor;
                    //console.log(a1);
                    for (let j = a1.contadorConsola; j < a1.consolaSalidaXPATH.length; j++) {
                        txtRes1 += a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta() + " ";
                    }
                    let txtRes2 = txtRes1.toUpperCase();
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: txtRes2 });
                }
                let resultado = valor1.valor;
                let mayus = resultado.toString().toUpperCase();
                return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: mayus });
            }
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (nodo.linea + 1).toString(),
                descripcion: ('Error al convertir a string'),
            }));
        }
        //sub1
        else if (this.soyNodo('SUBSTRING1', nodo)) {
            let valor1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let valor2 = this.resolverExpresion(nodo.hijos[1], entorno);
            if ((valor1.tipo != 0) && (valor2.tipo != 0) && ((valor1.tipo == 2) || (valor1.tipo == 4)) && (valor2.tipo == 1)) {
                //Si no es error, se ejecuta
                let txtRes1 = "";
                if (valor1.tipo == 4) {
                    let a1 = valor1.valor;
                    //console.log(a1);
                    for (let j = a1.contadorConsola; j < a1.consolaSalidaXPATH.length; j++) {
                        txtRes1 += a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta();
                    }
                    let txtRes2 = txtRes1.substring(valor2.valor - 1);
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: txtRes2 });
                }
                let resultado = valor1.valor;
                let txtResultado = resultado.toString().substring(valor2.valor - 1);
                return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: txtResultado });
            }
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (nodo.linea + 1).toString(),
                descripcion: ('Error al convertir a string'),
            }));
        }
        //sub2
        else if (this.soyNodo('SUBSTRING2', nodo)) {
            let valor1 = this.resolverExpresion(nodo.hijos[0], entorno);
            let valor2 = this.resolverExpresion(nodo.hijos[1], entorno);
            let valor3 = this.resolverExpresion(nodo.hijos[1], entorno);
            if ((valor1.tipo != 0) && (valor2.tipo != 0) && (valor3.tipo != 0) && ((valor1.tipo == 2) || (valor1.tipo == 4)) && (valor2.tipo == 1) && (valor3.tipo == 1)) {
                //Si no es error, se ejecuta
                let txtRes1 = "";
                if (valor1.tipo == 4) {
                    let a1 = valor1.valor;
                    //console.log(a1);
                    for (let j = a1.contadorConsola; j < a1.consolaSalidaXPATH.length; j++) {
                        txtRes1 += a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta();
                    }
                    let indiceFinal = txtRes1.length - valor3.valor;
                    let txtRes2 = txtRes1.substring(valor2.valor - 1, indiceFinal);
                    return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: txtRes2 });
                }
                let resultado = valor1.valor;
                let indiceFinal = resultado.length - valor3.valor;
                let txtResultado = resultado.toString().substring(valor2.valor - 1, indiceFinal);
                return new Expresion_1.Expresion({ tipo_: 2 /* STRING */, valor_: txtResultado });
            }
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (nodo.linea + 1).toString(),
                descripcion: ('Error al convertir a string'),
            }));
        }
        return new Expresion_1.Expresion({ tipo_: 0 /* ERROR */, valor_: "ErrorExpresion" });
    } //FIN RESOLVER EXP
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
    recorrerExpresion(nodo) {
        if (this.soyNodo('INICIO', nodo)) {
            this.recorrerExpresion(nodo.hijos[0]);
        }
        if (this.soyNodo('L', nodo)) {
            this.recorrerExpresion(nodo.hijos[0]);
        }
        if (this.soyNodo('CONSULTA', nodo)) {
            this.recorrerExpresion(nodo.hijos[0]);
        }
        if (this.soyNodo('SIMPLE', nodo)) {
            this.recorrerExpresion(nodo.hijos[0]);
        }
        if (this.soyNodo('PREDICADO', nodo)) {
            var a1 = this.resolverExpresion(nodo.hijos[1], null);
            console.log(a1);
        }
    }
    /*
    +
    +
    +
    +IMPLEMENTACION XPATH IMPLEMENTACION XPATH IMPLEMENTACION XPATH IMPLEMENTACION XPATH
    +
    +
    +
    */
    //METODO PARA RECORRER EL ARBOL DE CONSULTAS 
    recorrerArbolConsulta(nodo) {
        //NODO INICIO 
        if (this.tipoNodo('INICIO', nodo)) {
            return this.recorrerArbolConsulta(nodo.hijos[0]);
        }
        //NODO L, ES LA LISTA DE CONSULTAS 
        if (this.tipoNodo('L', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            //SE RECORREN TODOS LOS NODOS QUE REPRESENTAN UNA CONSULTA 
            for (var i = 0; i < nodo.hijos.length; i++) {
                this.recorrerArbolConsulta(nodo.hijos[i]);
                this.reiniciar();
            }
        }
        //PARA RECORRER TODOS LOS ELEMENTOS QUE COMPONEN LA CONSULTA 
        if (this.tipoNodo('CONSULTA', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            //salidaXPATH.getInstance().push(nodo.hijos.length);
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
            //return this.recorrer(nodo.hijos[0]);
            //salidaXPATH.getInstance().push(nodo.hijos.length);
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
            //return this.recorrer(nodo.hijos[0]);
            //Establecemos que se tiene un acceso de tipo DOBLE BARRA 
            this.controladorDobleSimple = true;
            this.recorrerArbolConsulta(nodo.hijos[0]);
        }
        //PARA VERIFICAR EL TIPO DE ACCESO, EN ESTE CASO: /
        if (this.tipoNodo('SIMPLE', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            //Establecemos que se tiene un acceso de tipo DOBLE BARRA 
            this.controladorDobleSimple = false;
            this.recorrerArbolConsulta(nodo.hijos[0]);
        }
        //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES UN IDENTIFICADOR  
        if (this.tipoNodo('identificador', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            const str = nodo.hijos[0];
            //verificamos si es una etiqueta doble o simple
            //salidaXPATH.getInstance().push(str);
            this.busquedaElemento(str);
            /*
            EN ESTA PARTE SE VA A PROCEDER PARA IR A BUSCAR EL ELEMENTO SEGÚN TIPO DE ACCESO
            */
            //return;
        }
        //PARA VERIFICAR SI LO QUE SE VA A ANALIZAR ES UN PREDICADO  
        if (this.tipoNodo('PREDICADO', nodo)) {
            this.controladorPredicado = true;
            const identificadorPredicado = nodo.hijos[0];
            //Primero se procede a la búsqueda del predicado
            this.busquedaElemento(identificadorPredicado);
            //Seguidamente se resuelve la expresión
            let resultadoExpresion = this.resolverExpresion(nodo.hijos[1], null);
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
            //Si Solicita implementar el axe child
            if (this.auxiliarAxe == "child") {
                this.recorrerArbolConsulta(nodo.hijos[0]);
            }
            //Si necesitsa implementar el axe attribute
            if (this.auxiliarAxe == "attribute") {
                //Le cambiamos la etiqueta de identificador a atributo para fines de optimizacion de codigo
                nodo.hijos[0].label = "atributo";
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
                        for (let att of entry.atributos) {
                            salidaXPATH_1.salidaXPATH.getInstance().push(att.dameNombre() + "=" + att.dameValor());
                        }
                        this.complementoAnnyAtributte(entry);
                    }
                }
                else {
                    let limite = this.consolaSalidaXPATH.length;
                    for (var i = this.contadorConsola; i < limite; i++) {
                        let entry = this.consolaSalidaXPATH[i];
                        for (let att of entry.atributos) {
                            salidaXPATH_1.salidaXPATH.getInstance().push(att.dameNombre() + "=" + att.dameValor());
                        }
                        this.complementoAnnyAtributte(entry);
                    }
                }
            }
            //Acceso sin prioridad
            else {
                if (!this.inicioRaiz) {
                    for (let entry of this.ArrayEtiquetas) {
                        for (let att of entry.atributos) {
                            salidaXPATH_1.salidaXPATH.getInstance().push(att.dameNombre() + "=" + att.dameValor());
                        }
                    }
                }
                else {
                    let limite = this.consolaSalidaXPATH.length;
                    for (var i = this.contadorConsola; i < limite; i++) {
                        let entry = this.consolaSalidaXPATH[i];
                        for (let att of entry.atributos) {
                            salidaXPATH_1.salidaXPATH.getInstance().push(att.dameNombre() + "=" + att.dameValor());
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
                    if (this.consolaSalidaXPATH[i].dameValor() == "" || this.consolaSalidaXPATH[i].dameValor() == " ") {
                    }
                    else {
                        salidaXPATH_1.salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameValor());
                    }
                    this.complementoText(this.consolaSalidaXPATH[i]);
                }
            }
            else {
                //si necesita solo el texto del actual 
                for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length; i++) {
                    if (this.consolaSalidaXPATH[i].dameValor() == "" || this.consolaSalidaXPATH[i].dameValor() == " ") {
                    }
                    else {
                        salidaXPATH_1.salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameValor());
                    }
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
            for (let b of a.atributos) {
                salidaXPATH_1.salidaXPATH.getInstance().push(b.dameNombre() + "=" + b.dameValor());
            }
            this.complementoAnnyAtributte(a);
        }
    }
    complementoAnyElement(objeto) {
        for (let entry of objeto.hijos) {
            this.consolaSalidaXPATH.push(entry);
            this.complementoAnyElement(entry);
        }
    }
    //Metodo para complementar la implementación de text
    complementoText(nodo) {
        //Se recorren los nodos de la etiqueta para imprimir su valor si tuvieran
        for (let entry of nodo.hijos) {
            //Señales de que NO tiene valor
            if (entry.dameValor() == "" || entry.dameValor() == " ") {
            }
            else {
                //Se imprime de una vez en la consola final
                salidaXPATH_1.salidaXPATH.getInstance().push(entry.dameValor());
            }
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
                //Iniciamos la búsqueda en el último elementro encontrado dentro de la lista final
                let auxiliarContadorConsola = 0;
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite; i++) {
                    let auxiliarBusqueda = this.consolaSalidaXPATH[i];
                    //Examinamos cada uno de los hijos de ese elemento
                    for (var j = 0; j < auxiliarBusqueda.hijos.length; j++) {
                        //Si coincide la busqueda, se agrega a la lista final y se activan las banderas respectivas
                        let temporal = auxiliarBusqueda.hijos[j];
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
            }
        }
        else { //ELSE PARA BUSCAR CON EL TIPO DE ACCESO //
            //nuevamente verificamos si se inicia en la raiz o en el elemento en cuestion 
            if (!this.inicioRaiz) {
                //this.arrayPosicionPadres.push(0);
                //En caso de iniciar en la raiz partimos del array de etiquetas 
                for (let entry of this.ArrayEtiquetas) {
                    let auxiliarBusqueda = entry;
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
                let auxiliarContadorConsola = 0;
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite; i++) {
                    let auxiliarBusqueda = this.consolaSalidaXPATH[i];
                    //Revisamos cada uno de los hijos
                    for (var j = 0; j < auxiliarBusqueda.hijos.length; j++) {
                        //Si coinciden los valores respectivos
                        let temporal = auxiliarBusqueda.hijos[j];
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
    getSalidaXPATH() {
        return salidaXPATH_1.salidaXPATH.getInstance().lista;
    }
    //METODO PARA LA LIMPIEZA DE LO QUE SE MUESTRA EN CONSOLA
    clearXPATH() {
        salidaXPATH_1.salidaXPATH.getInstance().clear();
    }
    //METODO PARA REINICIAR TODO AL MOMENTO DE EJECUTAR UNA NUEVA CONSULTA 
    reiniciar() {
        if (!this.controladorText) {
            if (this.pathCompleto) {
                for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length; i++) {
                    let entry = this.consolaSalidaXPATH[i];
                    //salidaXPATH.getInstance().push(this.consolaSalidaXPATH.pop().DameValorFormatoEtiqueta());
                    if (!this.controladorAtributoImpresion) {
                        salidaXPATH_1.salidaXPATH.getInstance().push(entry.DameValorFormatoEtiqueta());
                    }
                    else {
                        for (let att of entry.atributos) {
                            let attTemp = att;
                            salidaXPATH_1.salidaXPATH.getInstance().push(attTemp.dameNombre() + "=" + attTemp.dameValor());
                        }
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
    }
    //METODO PARA BUSCAR TODOS LOS PADRES DE UN NODO 
    metodoAncestor(nombre) {
        //En cualquier de los dos casos, se comienza desde el punto más alto puesto que ambos comandos incluyen a TODOS LOS PADRES
        for (let entry of this.ArrayEtiquetas) {
            if (entry.dameID() == nombre) {
            }
        }
    }
    recorrerXquery(nodo, entorno_) {
        if (this.soyNodo('INICIO', nodo)) {
            if (entorno_ == null) {
                let nuevoEntorno = new entorno_1.Entorno(null);
                this.recorrerXquery(nodo.hijos[0], nuevoEntorno);
                entornos_1.Entornos.getInstance().push(nuevoEntorno);
            }
            else {
                this.recorrerXquery(nodo.hijos[0], entorno_);
            }
        }
        else if (this.soyNodo('S', nodo)) {
            this.recorrerXquery(nodo.hijos[0], entorno_);
        }
        else if (this.soyNodo('L_INS', nodo)) {
            for (let i = 0; i < nodo.hijos.length; i++) {
                /*if (this.soyNodo('RETURN', nodo.hijos[i])){
                  return;
                }*/
                this.recorrerXquery(nodo.hijos[i], entorno_);
            }
        }
        else if (this.soyNodo('DECLARACION', nodo)) {
            this.ejecutarDeclaracion(nodo, entorno_);
        }
        else if (this.soyNodo('DECLARAR_FUNCION', nodo)) {
            this.ejecutarDeclaracionFuncion(nodo, entorno_);
        }
        else if (this.soyNodo('SALIDA', nodo)) {
            this.ejecutarSalida(nodo, entorno_);
        }
        else if (this.soyNodo('REASIGNACION', nodo)) {
            this.ejecutarReasignacion(nodo, entorno_);
        }
        else if (this.soyNodo('FOR1', nodo)) {
            this.ejecutarFOR1(nodo, entorno_);
        }
        else if (this.soyNodo('RETURN', nodo)) {
            this.ejecutarReturn(nodo, entorno_);
        }
    } //FIN RECORRER XQUERY
    ejecutarDeclaracion(nodo, entorno_) {
        let identificador = nodo.hijos[0].toString();
        let resultado = this.resolverExpresion(nodo.hijos[1], entorno_);
        if (resultado.tipo == 0) {
            //Si el resultado es tipo 0 (error), mostrar error
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (nodo.linea + 1).toString(),
                descripcion: ('Error en el valor que intenta asignar'),
            }));
            return;
        }
        let nuevoSimbolo = new Simbolo_1.Simbolo({ identificador_: identificador, tipo_: resultado.tipo, valor_: resultado.valor });
        entorno_.insertarVariable(nuevoSimbolo, nodo.linea);
    }
    ejecutarDeclaracion2(nodo, entorno_) {
        let identificador = nodo.hijos[0].toString();
        let resultado = this.valorInicialFuncion(identificador);
        let nuevoSimbolo = new Simbolo_1.Simbolo({ identificador_: identificador, tipo_: resultado.tipo, valor_: resultado.valor });
        entorno_.insertarVariable(nuevoSimbolo, nodo.linea);
    }
    ejecutarReasignacion(nodo, entorno_) {
        let identificador = nodo.hijos[0].toString();
        let resultado = this.resolverExpresion(nodo.hijos[1], entorno_);
        if (resultado.tipo == 0) {
            //Si el resultado es tipo 0 (error), mostrar error
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: (nodo.linea + 1).toString(),
                descripcion: ('Error en el valor que intenta asignar'),
            }));
            return;
        }
        let simbolo1 = entorno_.buscarVariable(identificador, nodo.linea);
        if (simbolo1 != null) {
            simbolo1.valor = resultado.valor;
            simbolo1.tipo = resultado.tipo;
        }
    }
    ejecutarSalida(nodo, entorno_) {
        //let texto="";
        let L_Expresiones = nodo.hijos[0];
        for (let i = 0; i < L_Expresiones.hijos.length; i++) {
            let nodo_Exp = L_Expresiones.hijos[i];
            let resultado = this.resolverExpresion(nodo_Exp, entorno_);
            if (resultado.tipo == 0) {
                //si es expresion tipo error, no se imprime
                continue;
            }
            if (resultado.tipo == 4) {
                let a1 = resultado.valor;
                //console.log(a1);
                for (let j = a1.contadorConsola; j < a1.consolaSalidaXPATH.length; j++) {
                    this.txtSalida += a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta() + "»";
                    this.txtSalida2 += a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta() + " ";
                    //console.log(a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta());
                    //console.log(a1.consolaSalidaXPATH[j].valor);
                }
                continue;
            }
            this.txtSalida += resultado.valor + "»";
            this.txtSalida2 += resultado.valor + " ";
            //console.log(resultado);
            //texto+=resultado.valor.toString();
        }
        this.txtSalida += "\n»\n";
        this.txtSalida2 += "\n";
        console.log(this.txtSalida2);
    }
    ejecutarDeclaracionFuncion(nodo, entorno_) {
        let identificador = nodo.hijos[1].toString();
        let clave = identificador + "$";
        if (nodo.hijos[2].hijos.length > 0) {
            //tiene parametros
            for (let i = 0; i < nodo.hijos[2].hijos.length; i++) {
                clave += "E_";
            }
        }
        let nuevoEntorno = new entorno_1.Entorno(entorno_);
        let l_params = nodo.hijos[2];
        let tipoFuncion = this.obtenerTipo(nodo.hijos[4].hijos[0].toString());
        let valorInicial = this.valorInicialFuncion(nodo.hijos[4].hijos[0].toString());
        let bloque = nodo.hijos[5];
        let nuevaFuncion = new Funcion_1.Funcion({ identificador_: clave, tipo_: tipoFuncion, L_params_: l_params, L_ins_: bloque, entorno_: nuevoEntorno, valor_: valorInicial });
        entorno_.insertarFuncion(nuevaFuncion, nodo.linea);
        //this.entornoPrincipal.insertarFuncion(nuevaFuncion,nodo.linea);
        entornos_1.Entornos.getInstance().push(nuevoEntorno);
    }
    //obtenemos enumTipo de la funcion de acuerdo al texto
    obtenerTipo(cadena) {
        if (cadena.toLowerCase() == "decimal") {
            return 1 /* NUMBER */;
        }
        else if (cadena.toLowerCase() == "integer") {
            return 1 /* NUMBER */;
        }
        else if (cadena.toLowerCase() == "number") {
            return 1 /* NUMBER */;
        }
        else if (cadena.toLowerCase() == "string") {
            return 2 /* STRING */;
        }
        else if (cadena.toLowerCase() == "boolean") {
            return 3 /* BOOLEAN */;
        }
        return 0 /* ERROR */;
    }
    //Valores iniciales del return de la funcion
    //0,"",false,null
    valorInicialFuncion(cadena) {
        if (cadena.toLowerCase() == "decimal") {
            return 0;
        }
        else if (cadena.toLowerCase() == "integer") {
            return 0;
        }
        else if (cadena.toLowerCase() == "number") {
            return 0;
        }
        else if (cadena.toLowerCase() == "string") {
            return "";
        }
        else if (cadena.toLowerCase() == "boolean") {
            return false;
        }
        return "nulo";
    }
    llamarFuncion(nodo, entorno) {
        /*La llamada a una funcion viene de la siguiente manera
          *         Funcion
          *         /    \
          *       id    Parametros
          */
        //let entorno:Entorno=new Entorno(entorno_);
        let identificador = nodo.hijos[0].toString();
        let clave = identificador + "$";
        let paramAtributo = nodo.hijos[1];
        if (nodo.hijos[1].hijos.length > 0) {
            //tiene parametros
            for (let i = 0; i < nodo.hijos[1].hijos.length; i++) {
                clave += "E_";
            }
        }
        //console.log(entorno);
        let funcion1 = entorno.buscarFuncion(clave, nodo.linea);
        //let funcion1=this.entornoPrincipal.buscarFuncion2(clave,nodo.linea);
        if (funcion1 != null) {
            //console.log("SI EXISTE");
            let nodoParams = funcion1.L_params;
            let nodoBloque = funcion1.L_ins;
            //ENTORNO AQUI PUEDE SER LA CLAVE DE LA RECURSIVIDAD
            let entornoAux = new entorno_1.Entorno(funcion1.entorno);
            //Este for puede ir dentro del siguiente if
            for (let i = 0; i < nodoParams.hijos.length; i++) {
                let paramActual = nodoParams.hijos[i];
                this.ejecutarDeclaracion2(paramActual, entornoAux);
            }
            //Preguntar si tiene parametros. Si los tiene, asignarles valor
            if (nodoParams.hijos.length > 0) {
                for (let j = 0; j < nodoParams.hijos.length; j++) {
                    let idActual = nodoParams.hijos[j].hijos[0].toString();
                    //CLAVE RECURSIVIDAD EN ESTE ENTORNO
                    let expActual = this.resolverExpresion(paramAtributo.hijos[j], entorno);
                    let simbolo1 = entornoAux.buscarVariable(idActual, nodo.linea);
                    simbolo1.valor = expActual.valor;
                    simbolo1.tipo = expActual.tipo;
                    //console.log(simbolo1);
                }
            }
            //Una vez asignado el valor de los parametros, procedemos a recorrer las instrucciones
            if (nodoBloque.hijos.length > 0) {
                this.recorrerFuncion(nodoBloque, entornoAux, funcion1);
            }
            entornos_1.Entornos.getInstance().push(entornoAux);
            return new Expresion_1.Expresion({ tipo_: funcion1.tipo, valor_: funcion1.valor });
        }
        return new Expresion_1.Expresion({ tipo_: 0 /* ERROR */, valor_: "ErrorExpresionFuncion" });
    }
    recorrerFuncion(nodo, entorno, funcion_) {
        if (this.soyNodo('BLOQUE', nodo)) {
            /*if (nodo.hijos.length>0){
              let nuevoEntorno:Entorno=new Entorno(entorno);
              this.recorrerFuncion(nodo.hijos[0],nuevoEntorno,funcion_);
            }*/
            this.recorrerFuncion(nodo.hijos[0], entorno, funcion_);
        }
        else if (this.soyNodo('L_INS', nodo)) {
            for (let i = 0; i < nodo.hijos.length; i++) {
                if (this.soyNodo('RETURN', nodo.hijos[i])) {
                    let resultado = this.resolverExpresion(nodo.hijos[i].hijos[0], entorno);
                    //console.log(resultado);
                    if (funcion_.tipo != resultado.tipo) {
                        errores_1.Errores.getInstance().push(new error_1.Error({
                            tipo: "semantico",
                            linea: ((nodo.hijos[i].hijos[0].linea) + 1).toString(),
                            descripcion: ('La funcion no retorna el tipo de dato asignado'),
                        }));
                        return;
                    }
                    funcion_.valor = resultado.valor;
                    return;
                }
                this.recorrerFuncion(nodo.hijos[i], entorno, funcion_);
            }
        }
        else if (this.soyNodo('S_IF', nodo)) {
            this.ejecutarIf(nodo, entorno, funcion_);
        }
        else if (this.soyNodo('DECLARACION', nodo)) {
            this.ejecutarDeclaracion(nodo, entorno);
        }
    }
    ejecutarIf(nodo, entorno, funcion) {
        let L_cond = nodo.hijos[0];
        let cantCondiciones = L_cond.hijos.length;
        let tieneElse = false;
        //Preguntar si el ultimo es else
        if (this.soyNodo('ELSE', L_cond.hijos[cantCondiciones - 1])) {
            //console.log("utlimo es else");
            tieneElse = true;
        }
        if (tieneElse) {
            for (let i = 0; i < L_cond.hijos.length - 1; i++) {
                //Recorrer todas las condiciones, menos la ultima (Else)
                let condicionActual = L_cond.hijos[i];
                /* la condicion viene asi
                          if
                      /       \
                      E       Return
                */
                let expresion1 = this.resolverExpresion(condicionActual.hijos[0], entorno);
                if (expresion1.tipo != 3) {
                    //Error, la expresion no es bool
                    errores_1.Errores.getInstance().push(new error_1.Error({
                        tipo: "semantico",
                        linea: ((condicionActual.hijos[0].linea) + 1).toString(),
                        descripcion: ('La expresion en el if no es tipo booleano'),
                    }));
                    return;
                }
                if (expresion1.valor) {
                    let resultado = this.resolverExpresion(condicionActual.hijos[1].hijos[0], entorno);
                    //console.log(resultado);
                    funcion.valor = resultado.valor;
                    return;
                }
            }
            //al llegar aca, no se ejecuto ninguna condicion, por lo tanto, se ejecuta el else
            let resultado = this.resolverExpresion(L_cond.hijos[cantCondiciones - 1].hijos[0].hijos[0], entorno);
            //console.log(resultado);
            funcion.valor = resultado.valor;
            return;
        }
        else {
            //Mismo procedimiento, pero el ultimo NO ES ELSE
            for (let i = 0; i < L_cond.hijos.length; i++) {
                //Recorrer todas las condiciones
                let condicionActual = L_cond.hijos[i];
                /* la condicion viene asi
                          if
                      /       \
                      E       Return
                */
                let expresion1 = this.resolverExpresion(condicionActual.hijos[0], entorno);
                if (expresion1.tipo != 3) {
                    //Error, la expresion no es bool
                    errores_1.Errores.getInstance().push(new error_1.Error({
                        tipo: "semantico",
                        linea: ((condicionActual.hijos[0].linea) + 1).toString(),
                        descripcion: ('La expresion en el if no es tipo booleano'),
                    }));
                    return;
                }
                if (expresion1.valor) {
                    let resultado = this.resolverExpresion(condicionActual.hijos[1].hijos[0], entorno);
                    //console.log(resultado);
                    funcion.valor = resultado.valor;
                    return;
                }
            }
        }
    }
    ejecutarFOR1(nodo_, entorno_) {
        //nodo[0]=id
        let identificador = nodo_.hijos[0].hijos[0].toString();
        //nodo[1]=Exp
        let valor = this.resolverExpresion(nodo_.hijos[1].hijos[0], entorno_);
        let nuevoSimbolo = new Simbolo_1.Simbolo({ identificador_: identificador, tipo_: valor.tipo, valor_: valor.valor });
        entorno_.insertarVariable(nuevoSimbolo, nodo_.linea);
        //nodo[2]= return
        if (this.soyNodo('RETURN', nodo_.hijos[2])) {
            let resultado = this.resolverExpresion(nodo_.hijos[2].hijos[0], entorno_);
            if (resultado.tipo == 0) {
                //si es expresion tipo error, no se imprime
                return;
            }
            if (resultado.tipo == 4) {
                let a1 = resultado.valor;
                //console.log(a1);
                for (let j = a1.contadorConsola; j < a1.consolaSalidaXPATH.length; j++) {
                    this.txtSalida += a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta() + "»";
                    this.txtSalida2 += a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta() + " ";
                    console.log(a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta());
                    //console.log(a1.consolaSalidaXPATH[j].valor);
                }
                return;
            }
            else if (resultado.tipo == 6) {
                for (let j = 0; j < resultado.valor.length; j++) {
                    this.txtSalida += resultado.valor[j].toString() + "»";
                    this.txtSalida2 += resultado.valor[j].toString() + "\n";
                    //console.log(a1.consolaSalidaXPATH[j].valor);
                }
                return;
            }
            this.txtSalida += resultado.valor + "»";
            this.txtSalida2 += resultado.valor + "\n";
            //console.log(resultado);
            //texto+=resultado.valor.toString();
            this.txtSalida += "\n»\n";
            console.log(this.txtSalida2);
            //console.log(resultado);
        }
        else if (this.soyNodo('RETURN_IF', nodo_.hijos[2])) {
        }
    }
    ejecutarReturn(nodo, entorno_) {
        let resultado = this.resolverExpresion(nodo.hijos[0], entorno_);
        if (resultado.tipo == 0) {
            //si es expresion tipo error, no se imprime
            return;
        }
        if (resultado.tipo == 4) {
            /*let a1 = <Ejecucion>resultado.valor;
            //console.log(a1);
            for (let j=a1.contadorConsola;j<a1.consolaSalidaXPATH.length;j++){
              this.txtSalida+=a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta();
              this.txtSalida2+=a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta()+" ";
              //console.log(a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta());
              //console.log(a1.consolaSalidaXPATH[j].valor);
              return;
            }*/
            //---------
            let a1 = resultado.valor;
            //console.log(a1);
            for (let j = a1.contadorConsola; j < a1.consolaSalidaXPATH.length; j++) {
                this.txtSalida += a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta() + "»";
                this.txtSalida2 += a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta() + " ";
                //console.log(a1.consolaSalidaXPATH[j].DameValorFormatoEtiqueta());
                //console.log(a1.consolaSalidaXPATH[j].valor);
            }
            return;
            //-------
        }
        this.txtSalida += resultado.valor + "»";
        this.txtSalida2 += resultado.valor + "\n";
        //console.log(resultado);
        //texto+=resultado.valor.toString();
        this.txtSalida += "\n»\n";
        console.log(this.txtSalida2);
    }
}
exports.Ejecucion = Ejecucion;
