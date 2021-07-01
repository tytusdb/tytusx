"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraduceXML = void 0;
const Entorno_1 = require("../AST/Entorno");
const Tipo_1 = require("../AST/Tipo");
const indexAnalizador_1 = __importDefault(require("../indexAnalizador"));
const TranslateXPath_1 = require("./TranslateXPath");
class TraduceXML {
    constructor(listaNodos) {
        this.contS = 0;
        this.contH = 0;
        this.indice = 0;
        this.heap = new Array();
        this.stack = new Array();
        this.listaConsultas = listaNodos;
        this.strXPathTraduccion = "";
        this.strTraduccion = '';
    }
    getHeap() {
        return this.heap;
    }
    getStack() {
        return this.stack;
    }
    getContS() {
        return this.contS;
    }
    getContH() {
        return this.contS;
    }
    getStrTraduccion() {
        return this.strTraduccion;
    }
    getEncabezado() {
        let encabezado = '/*------HEADER------*/ \n'
            + '#include <stdio.h> \n'
            + '#include <math.h> \n'
            + '\n'
            + 'double heap[30101999]; \n'
            + 'double stack[30101999]; \n'
            + 'double XPStack[30101999];\n'
            + 'double XPHeap[30101999];\n'
            + 'double HP;\n'
            + 'double SP;\n'
            + 'double S; \n'
            + 'double H; \n';
        return encabezado;
    }
    getMain(cuerpo) {
        let main;
        main = '/*------MAIN------*/ \n'
            + 'int main() { \n'
            + '    S = 0; \n'
            + '    H = 0; \n'
            + '\n/********* INICIA TRADUCCION XML **********/ \n'
            + cuerpo + '\n'
            + '\n/********* TERMINA TRADUCCION XML **********/ \n'
            + '\n/********* INICIA TRADUCCION XPATH **********/ \n'
            + '\t HP = 0;\n\t SP = 0;\n'
            + this.strXPathTraduccion + '\n'
            + '\n/********* TERMINA TRADUCCION XPATH **********/ \n'
            + '    return 0; \n'
            + '} \n';
        return main;
    }
    getCodeC() {
        var codigo3d;
        codigo3d = this.getEncabezado();
        codigo3d = codigo3d + this.getDeclaraTemps();
        //Hacer traduccion de xpath
        if (this.listaConsultas.length > 0) {
            let traductorXPath = new TranslateXPath_1.TranslateXPath(this.listaConsultas, indexAnalizador_1.default.global, this.heap, this.stack);
            this.strXPathTraduccion = traductorXPath.traducirXPath();
            let strFuncs = traductorXPath.getFuncionesUtilizadas();
            codigo3d += traductorXPath.getDeclaraTempsXPATH() + "\n";
            //Ahora obtener las funciones que se utilizaron para la traduccion.
            codigo3d += strFuncs;
        }
        //Obtener el main
        codigo3d = codigo3d + this.getMain(this.strTraduccion);
        return codigo3d;
    }
    getDeclaraTemps() {
        let temps = 'double ';
        for (let c = 0; c < this.stack.length; c++) {
            temps = temps + 't' + c.toString();
            temps = temps + ((c == this.stack.length - 1) ? ';' : ', ');
            if ((c % 100) == 0) {
                temps = temps + '\n';
            }
        }
        temps = temps + '\n';
        temps = temps + '\n';
        return temps;
    }
    traducirXML() {
        console.log('/* Inicio Traduccion */');
        this.traducir(indexAnalizador_1.default.global, -5);
        this.strTraduccion = this.getCodeC();
        console.log('/* Fin Traduccion */');
        return this.strTraduccion;
    }
    traducir(entrada, finalPadre) {
        let tabla = entrada.tsimbolos;
        tabla.forEach((elem) => {
            if (elem.valor.padre !== null || elem.valor.padre == undefined) {
                if (elem.valor.valor instanceof Entorno_1.Entorno) {
                    this.strTraduccion = this.strTraduccion + '\n /*--- SE AGREGA NUEVO NODO ---*/';
                    elem.valor.setPosicion(this.contS);
                    //Al iniciar una etiqueta nueva, se coloca el num de Finalizacion que tendra este padre (-5, -10, etcc..)
                    this.strTraduccion = this.strTraduccion + '\n /*--- EL AMBITO DE "' + elem.valor.nombre + '" TERMINA CON: ' + finalPadre + ' ---*/';
                    this.strTraduccion = this.strTraduccion + '\n\t heap[(int)H] = ' + finalPadre + ' ; \n';
                    this.strTraduccion = this.strTraduccion + '\t H = H + 1; \n';
                    this.heap.push(finalPadre);
                    this.contH++;
                    //Iniciar con la traduccion de la etiqueta
                    this.strTraduccion = this.strTraduccion + this.getIDAsignacionHeap(elem.valor.nombre.toString(), "ETIQUETA");
                    this.traducir(elem.valor.valor, finalPadre - 5);
                    //Al finalizar una etiqueta colocar finalizacion del ambito ( -5, -10, -15, etc.. )
                    this.strTraduccion = this.strTraduccion + '\n /*--- FINALIZACION DE NODO "' + elem.valor.nombre + '" ---*/';
                    this.strTraduccion = this.strTraduccion + '\n\t heap[(int)H] = ' + finalPadre + ' ; \n';
                    this.strTraduccion = this.strTraduccion + '\t H = H + 1; \n';
                    this.heap.push(finalPadre);
                    this.contH++;
                }
                else {
                    if (elem.valor.valor !== false && elem.valor.valor !== false) {
                        this.strTraduccion = this.strTraduccion + '\n /*--- SE AGREGA NUEVO SIMBOLO ---*/';
                        elem.valor.setPosicion(this.contS);
                        if (elem.valor.getTipo() === Tipo_1.Tipo.ATRIBUTO) {
                            this.strTraduccion = this.strTraduccion + this.getIDAsignacionHeap(elem.valor.nombre.toString(), "ATRIBUTO");
                        }
                        this.strTraduccion = this.strTraduccion + this.getVALAsignacionHeap(elem.valor.valor.toString());
                    }
                }
            }
        });
    }
    getIDAsignacionHeap(palabra, tipo) {
        let asignacion = '\n\t /* ' + tipo + ' "' + palabra + '" EN HEAP*/ \n';
        asignacion = asignacion + '\t t' + this.contS + ' = H-1;\n';
        /* Coloca un -1 para indicar que el valor es un nodo(etiqueta) o un -2 si es atributo*/
        let numFinalizacion = -1;
        if (tipo === "ATRIBUTO") {
            numFinalizacion = -2;
            asignacion = asignacion
                + '\t heap[(int)H] = ' + numFinalizacion + '; \n'
                + '\t H = H + 1; \n';
            this.heap.push(numFinalizacion);
            this.contH++;
        }
        /* Descompone la palabra en caracteres y los asigna al Heap */
        palabra.split('').forEach((element) => {
            asignacion = asignacion
                + '\t heap[(int)H] = ' + element.charCodeAt(0) + '; \n'
                + '\t H = H + 1; \n';
            this.heap.push(element.charCodeAt(0));
            this.contH++;
        });
        /* Coloca un -1 para indicar que el valor es un nodo(etiqueta) o un -2 si es atributo y ya termino*/
        asignacion = asignacion
            + '\t heap[(int)H] = ' + numFinalizacion + '; \n'
            + '\t H = H + 1; \n';
        this.heap.push(numFinalizacion);
        this.contH++;
        asignacion = asignacion
            + '\t stack[(int)' + this.contS + '] = t' + this.contS + '; \n';
        this.stack.push(this.contS);
        this.contS++;
        return asignacion;
    }
    getVALAsignacionHeap(palabra) {
        let asignacion = '\n\t /* VALOR "' + palabra + '" EN HEAP*/ \n';
        asignacion = asignacion + '\t t' + this.contS + ' = H;\n';
        asignacion = asignacion
            + '\t heap[(int)H] = -3; \n'
            + '\t H = H + 1; \n';
        this.heap.push(-3);
        this.contH++;
        /* Descompone la palabra en caracteres y los asigna al Heap */
        palabra.split('').forEach((element) => {
            asignacion = asignacion
                + '\t heap[(int)H] = ' + element.charCodeAt(0) + '; \n'
                + '\t H = H + 1; \n';
            this.heap.push(element.charCodeAt(0));
            this.contH++;
        });
        /* Coloca un -3 para indicar que el valor es una cadena y ya termino*/
        asignacion = asignacion
            + '\t heap[(int)H] = -3; \n'
            + '\t H = H + 1; \n';
        this.heap.push(-3);
        this.contH++;
        asignacion = asignacion
            + '\t stack[(int)' + this.contS + '] = t' + this.contS + '; \n';
        this.stack.push(this.contS);
        this.contS++;
        return asignacion;
    }
}
exports.TraduceXML = TraduceXML;
