"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entregable = void 0;
const Simbolo_1 = require("../AST/Simbolo");
const Tabla_errores_1 = require("../AST/Tabla_errores");
const Tabla_simbolos_1 = require("../AST/Tabla_simbolos");
const Tipo_1 = require("../AST/Tipo");
const Objeto_1 = require("./Objeto");
class entregable {
    constructor() {
        this.arbol = new Objeto_1.Objeto("0", "", 0, 0, [], []);
        this.lcondi = [];
        this.reporte_gramatical = "";
        this.tabla_errores = new Tabla_errores_1.Tabla_errores();
        this.tabla_simbolos = new Tabla_simbolos_1.Tabla_simbolos();
    }
    //public arbol:{[id:number] : Objeto}={};
    //public lcondi:{[id:number] : Array<Atributo>}={};
    CrearTabla() {
        this.visitar(this.arbol, 0);
    }
    visitar(nodo, padre) {
        //guardo mi simbolo
        var simbolo = new Simbolo_1.Simbolo(nodo.identificador, Tipo_1.Tipo.OBJETO, nodo.texto, nodo.linea, nodo.columna, padre);
        this.tabla_simbolos.agregar(simbolo);
        var id = this.tabla_simbolos.num_registro;
        for (let atri of nodo.listaAtributos) {
            var simbolo = new Simbolo_1.Simbolo(atri.identificador, Tipo_1.Tipo.ATRIBUTO, atri.valor, atri.linea, atri.columna, id);
            this.tabla_simbolos.agregar(simbolo);
        }
        for (let obj of nodo.listaObjetos) {
            this.visitar(obj, id);
        }
    }
}
exports.entregable = entregable;
exports.entregable = entregable;
