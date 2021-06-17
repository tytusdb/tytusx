"use strict";
class Entorno {
    constructor(anterior) {
        this.tabla = {};
        this.anterior = anterior;
    }
    agregar(id, simbolo) {
        simbolo.identificador = simbolo.identificador;
        this.tabla[id] = simbolo;
    }
    eliminar(id) {
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                delete e.tabla[id];
                return true;
            }
        }
        return false;
    }
    existe(id) {
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                return true;
            }
        }
        return false;
    }
    existeEnActual(id) {
        if (this.tabla[id] !== undefined) {
            return true;
        }
        return false;
    }
    getSimbolo(id) {
        for (let e = this; e != null; e = e.anterior) {
            if (e.tabla[id] !== undefined) {
                return e.tabla[id];
            }
        }
        return null;
    }
    reemplazar(id, nuevoValor) {
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                e.tabla[id] = nuevoValor;
            }
        }
    }
    registrarObjetoEnTS(objeto, entornoPadre) {
        if (!(objeto instanceof Objeto)) {
            return;
        }
        console.log("simboloPadre " + objeto.identificador);
        const entornoObjeto = new Entorno(null);
        if (objeto.listaAtributos != null && objeto.listaAtributos.length > 0) {
            objeto.listaAtributos.forEach((atributo) => {
                if (atributo instanceof Atributo) {
                    const simboloAtributo = new Simbolo(Tipo.ATRIBUTO, atributo.identificador, atributo.linea, atributo.columna, atributo.valor);
                    entornoObjeto.agregar(simboloAtributo.identificador, simboloAtributo);
                    console.log("simboloHijo Atributo " + simboloAtributo.identificador + " = " + simboloAtributo.valor);
                }
            });
        }
        if (objeto.listaObjetos != null && objeto.listaObjetos.length > 0) {
            objeto.listaObjetos.forEach((objetoHijo) => {
                if (objetoHijo instanceof Objeto) {
                    this.registrarObjetoEnTS(objetoHijo, entornoObjeto);
                    const simboloObjeto = new Simbolo(Tipo.OBJETO, objetoHijo.identificador, objetoHijo.linea, objetoHijo.columna, objetoHijo);
                    entornoObjeto.agregar(simboloObjeto.identificador, simboloObjeto);
                    console.log("simboloHijo Objeto " + simboloObjeto.identificador + " = " + simboloObjeto.valor.texto);
                }
            });
        }
        objeto.entorno = entornoObjeto;
        const simbolo = new Simbolo(Tipo.OBJETO, objeto.identificador, objeto.linea, objeto.columna, objeto);
        entornoPadre.agregar(simbolo.identificador, simbolo);
        console.log("finaliza padre " + objeto.identificador);
    }
}
