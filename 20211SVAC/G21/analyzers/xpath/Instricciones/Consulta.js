"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
class Consulta {
    constructor(listaAccesos, linea, columna) {
        this.listaAccesos = listaAccesos; 
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, arbol) {
        //entorno global
        if (ent.id === this.listaAccesos[0]) {
            //eliminando valor de raiz de consulta
            this.listaAccesos.splice(0, 1);
            //salida
            var resultado = this.funcionRecursiva(ent, this.listaAccesos);
            console.log('Salida: \n' + resultado);
            return resultado;
        }
        else {
            //error semantico
            console.log('Error semantico, no existe la raiz');
            return 'Error semantico, no existe la raiz'
        }
    }
    funcionRecursiva(ent, keys) {
        //llave
        var key = keys[0];
        var salida = '';
        keys.splice(0, 1);
        //validando simbolo en enterno
        if (ent.existe(key)) {
            //obtener coincidencias
            var simbolos = ent.getSimbolo(key);
            if (keys.length == 0) {
                //recorriendo simbolos
                for (let sim of simbolos) {
                    salida += this.FuncionGenerarXML(sim);
                }
            }
            else {
                for (let sim of simbolos) {
                    salida += this.funcionRecursiva(sim, keys.slice());
                }
            }
        }
        return salida;
    }
    FuncionGenerarXML(simbolo) {
        var texto = '';
        let atr_temp = '';
        //validando si tiene atributos
        if (simbolo.entorno.length > 0) {
            for (let atr of simbolo.entorno) {
                if (atr.tipo == 'atributo')
                    atr_temp += ' ' + atr.id + '="' + atr.valor + '"';
            }
        }
        if (simbolo.tipo == 'etiqueta') {
            if (atr_temp != '')
                texto += '<' + simbolo.id + ' ' + atr_temp + '>' + simbolo.valor + '</' + simbolo.id + '>\n';
            else
                texto += '<' + simbolo.id + '>' + simbolo.valor + '</' + simbolo.id + '>\n';
        }
        else {
            texto += '<' + simbolo.id + '="' + simbolo.valor + '"/>\n';
        }
        return texto;
    }
}
