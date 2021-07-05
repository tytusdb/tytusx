import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Consulta } from "../XPath/Consulta";
export class FuncionXQuery {
    constructor(tipoFuncion, identificador, listaNodos, linea, columna, desde, hasta, otraFuncion) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipoFuncion;
        this.identificador = identificador;
        this.listaNodos = listaNodos;
        this.desde = desde;
        this.hasta = hasta;
        this.otraFuncion = otraFuncion;
    }
    getTipo() {
        return this.tipo;
    }
    get3Dir(XQueryEnt) {
        let code = "\t*/--- FUNCION XQUERY --*/\n";
        let s = this.getValor(XQueryEnt);
        console.log("S: ", s);
        return code;
    }
    getSobreEntornoXML(entorno) {
        let ls = [];
        if (this.identificador != undefined) {
            if (this.listaNodos != undefined && this.listaNodos.length > 0) {
                let consTemp = new Consulta(this.listaNodos, this.linea, this.columna);
                let temp = consTemp.ejecutar(entorno);
                temp.forEach((s) => {
                    let test = s.valor;
                    if (this.tipo != TipoFuncionXQ.DATA) {
                        //Para cada et buscar si tiene texto.
                        this.reemplazarTexto(test);
                    }
                    ls = ls.concat(this.getOnlyTextos(test));
                });
            }
            else {
                if (this.tipo != TipoFuncionXQ.DATA) {
                    //Para cada et buscar si tiene texto.
                    this.reemplazarTexto(entorno);
                }
                ls = ls.concat(this.getOnlyTextos(entorno));
            }
        }
        else if (this.otraFuncion != undefined) {
            //Es del tipo substring(upper-case($x/hola), 2, 3)
            //Resolver funcion interior.
            let interior = this.otraFuncion.getSobreEntornoXML(entorno);
            //Para el resultado del interior, aplicar la funcion principal
            interior.forEach((s) => {
                let x = s.valor;
                if (!(typeof x.valor === "string")) {
                    if (this.tipo != TipoFuncionXQ.DATA) {
                        //Para cada et buscar si tiene texto.
                        s.valor = this.aplicarFuncionTexto(x);
                    }
                    ls = ls.concat(s);
                }
            });
        }
        return ls;
    }
    getValorInicial(XQueryEnt) {
        if (this.identificador != undefined) {
            //0. Lista Redefinida.
            let listaRedefinida = [];
            //1. Obtener simbolo
            let ls = XQueryEnt.obtenerSimbolo(this.identificador);
            console.log("LS: ", ls);
            //2. Obtener consulta completa (listaNodos)
            if (ls != null) {
                if (this.listaNodos != undefined && this.listaNodos.length > 0) {
                    let consTemp = new Consulta(this.listaNodos, this.linea, this.columna);
                    ls.valor.forEach((s) => {
                        let auxEntorno = s.valor;
                        listaRedefinida = listaRedefinida.concat(consTemp.ejecutar(auxEntorno));
                    });
                    let nuevoSimbolo = new Simbolo(Tipo.XQ_VAR, this.identificador, listaRedefinida, this.linea, this.columna);
                    XQueryEnt.sobreEscribirSimbolo(this.identificador, nuevoSimbolo);
                }
                else {
                    listaRedefinida = ls;
                }
            }
            else {
                console.log("Simbolo no existe: $", this.identificador);
            }
            return XQueryEnt.obtenerSimbolo(this.identificador);
        }
    }
    getValor(XQueryEnt) {
        if (this.identificador != undefined) {
            let listaS = this.getValorInicial(XQueryEnt);
            if (this.tipo != TipoFuncionXQ.DATA) {
                listaS.valor.forEach((s) => {
                    let et = s.valor;
                    //Para cada et buscar si tiene texto.
                    this.reemplazarTexto(et);
                });
            }
            let nuevaLista = [];
            listaS.valor.forEach((s) => {
                let et = s.valor;
                nuevaLista = nuevaLista.concat(this.getOnlyTextos(et));
            });
            let nuevoSimbolo = new Simbolo(Tipo.XQ_VAR, this.identificador, nuevaLista, this.linea, this.columna);
            XQueryEnt.sobreEscribirSimbolo(this.identificador, nuevoSimbolo);
            listaS = XQueryEnt.obtenerSimbolo(this.identificador);
            return listaS;
        }
        else if (this.otraFuncion != undefined) {
            let ls = [];
            let interior = this.otraFuncion.getValor(XQueryEnt);
            //Para el resultado del interior, aplicar la funcion principal
            interior.valor.forEach((s) => {
                let x = s.valor;
                if (!(typeof x.valor === "string")) {
                    if (this.tipo != TipoFuncionXQ.DATA) {
                        //Para cada et buscar si tiene texto.
                        s.valor = this.aplicarFuncionTexto(x);
                    }
                    ls = ls.concat(s);
                }
            });
            let nuevoSimbolo = new Simbolo(Tipo.XQ_VAR, interior.nombre, ls, this.linea, this.columna);
            XQueryEnt.sobreEscribirSimbolo(interior.nombre, nuevoSimbolo);
            return XQueryEnt.obtenerSimbolo(interior.nombre);
        }
    }
    getOnlyTextos(etiqueta) {
        let listaTextos = [];
        for (let i = 0; i < etiqueta.tsimbolos.length; i++) {
            if (etiqueta.tsimbolos[i].valor.getTipo() === Tipo.STRING) {
                listaTextos.push(etiqueta.tsimbolos[i].valor);
            }
            else if (etiqueta.tsimbolos[i].valor.getTipo() === Tipo.ETIQUETA) {
                listaTextos = listaTextos.concat(this.getOnlyTextos(etiqueta.tsimbolos[i].valor.valor));
            }
        }
        return listaTextos;
    }
    aplicarFuncionTexto(str) {
        switch (this.getTipo()) {
            case TipoFuncionXQ.UPPERCASE:
                return str.toUpperCase();
            case TipoFuncionXQ.SUBSTRING:
                if (this.desde != undefined && this.hasta != undefined) {
                    return str.substring(this.desde - 1, this.hasta + 1);
                }
                break;
            case TipoFuncionXQ.LOWERCASE:
                return str.toLowerCase();
            case TipoFuncionXQ.STRING:
                return str.toString();
            case TipoFuncionXQ.NUMBER:
                return +str;
            default:
                return str;
        }
    }
    reemplazarTexto(etiqueta) {
        for (let i = 0; i < etiqueta.tsimbolos.length; i++) {
            if (etiqueta.tsimbolos[i].valor.getTipo() === Tipo.STRING) {
                let x = etiqueta.tsimbolos[i].valor;
                //Ver que tipo de funcion es para saber que hacer.
                let y = this.aplicarFuncionTexto(x.valor);
                etiqueta.tsimbolos[i].valor.valor = y;
            }
            else if (etiqueta.tsimbolos[i].valor.getTipo() === Tipo.ETIQUETA) {
                this.reemplazarTexto(etiqueta.tsimbolos[i].valor.valor);
            }
        }
    }
}
export var TipoFuncionXQ;
(function (TipoFuncionXQ) {
    TipoFuncionXQ[TipoFuncionXQ["UPPERCASE"] = 0] = "UPPERCASE";
    TipoFuncionXQ[TipoFuncionXQ["SUBSTRING"] = 1] = "SUBSTRING";
    TipoFuncionXQ[TipoFuncionXQ["DATA"] = 2] = "DATA";
    TipoFuncionXQ[TipoFuncionXQ["LOWERCASE"] = 3] = "LOWERCASE";
    TipoFuncionXQ[TipoFuncionXQ["NUMBER"] = 4] = "NUMBER";
    TipoFuncionXQ[TipoFuncionXQ["STRING"] = 5] = "STRING";
})(TipoFuncionXQ || (TipoFuncionXQ = {}));
