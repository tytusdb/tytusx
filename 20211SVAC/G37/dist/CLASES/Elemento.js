"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elemento = void 0;
const Ambito_1 = require("./Ambito");
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
class Elemento {
    constructor(identificador, texto, linea, columna, lista_atributos, lista_elementos) {
        this.identificador = identificador;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.lista_atributos = lista_atributos;
        this.lista_elementos = lista_elementos;
        //this.ambito = new Ambito(null);
        //console.log("Hijos insertados: ",lista_elementos);
    }
    construirTablaSimbolos(ambitoAnterior) {
        console.log("INICIARE A EJECUTAR \n\n");
        this.ambito = new Ambito_1.Ambito(ambitoAnterior);
        // SI la this.lista_atributos esta vacia, el foreach no se ejecuta, ni da error
        this.lista_atributos.forEach(atributo => {
            var _a;
            //console.log('encontre->',e);
            const newSimbolo = new Simbolo_1.Simbolo(atributo.identificador, Tipo_1.Tipo.ATRIBUTO, atributo.linea, atributo.columna, atributo.valor); // SIMBOLO TIPO ATRIBUTO
            (_a = this.ambito) === null || _a === void 0 ? void 0 : _a.agregar(atributo.identificador, newSimbolo);
        });
        // SI la this.lista_elementos esta vacia, el foreach no se ejecuta, ni da error
        this.lista_elementos.forEach(elemento => {
            var _a;
            elemento.construirTablaSimbolos(this.ambito); // contruye la tabla de simbolos del elemento
            let newSimbolo = new Simbolo_1.Simbolo(elemento.identificador, Tipo_1.Tipo.ELEMENTO, elemento.linea, elemento.columna, elemento); // Almaceno el elemento en el Ambito actual
            (_a = this.ambito) === null || _a === void 0 ? void 0 : _a.agregar(elemento.identificador, newSimbolo);
        });
        return this.ambito; // Podria retornar un ambito que no contiene ni Etiquetas ni Atributos..
    }
}
exports.Elemento = Elemento;
