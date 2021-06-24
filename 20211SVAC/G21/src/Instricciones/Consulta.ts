import { strict } from "assert";
import { AST } from "../AST/AST";
import { Simbolo } from "../Entornos/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";

class Consulta implements Instruccion {
    listaAccesos: Array<string>;
    linea: number;
    columna: number;

    constructor(listaAccesos: Array<string>, linea: number, columna: number) {
        this.listaAccesos = listaAccesos;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: Simbolo, arbol: AST) {
        //entorno global
        if (ent.id === this.listaAccesos[0]) {
            //eliminando valor de raiz de consulta
            this.listaAccesos.splice(0, 1)
            //salida
            var resultado: string = this.funcionRecursiva(ent, this.listaAccesos)
            console.log('Salida: \n' + resultado)
        } else {
            //error semantico
            console.log('Error semantico, no existe la raiz')
        }
    }

    funcionRecursiva(ent: Simbolo, keys: Array<string>): string {
        //llave
        var key: string = keys[0];
        var salida: string = '';
        keys.splice(0, 1);
        //validando simbolo en enterno
        if (ent.existe(key)) {
            //obtener coincidencias
            var simbolos: Simbolo[] = ent.getSimbolo(key);
            if (keys.length == 0) {
                //recorriendo simbolos
                for (let sim of simbolos) {
                    salida += this.FuncionGenerarXML(sim);
                }
            } else {
                for (let sim of simbolos) {
                    salida += this.funcionRecursiva(sim, keys.slice());
                }
            }
        }
        return salida;
    }

    FuncionGenerarXML(simbolo: Simbolo) {

        var texto = '';
        let atr_temp = '';
        //validando si tiene atributos
        if (simbolo.entorno.length > 0) {
            for (let atr of simbolo.entorno) {
                if (atr.tipo == 'atributo') atr_temp += ' ' + atr.id + '="' + atr.valor + '"';
            }
        }
        if (simbolo.tipo == 'etiqueta') {
            if (atr_temp != '') texto += '<' + simbolo.id + ' ' + atr_temp + '>' + simbolo.valor + '</' + simbolo.id + '>\n';
            else texto += '<' + simbolo.id + '>' + simbolo.valor + '</' + simbolo.id + '>\n';
        } else {
            texto += '<' + simbolo.id + '="' + simbolo.valor + '"/>\n';
        }
        return texto;
    }

}


