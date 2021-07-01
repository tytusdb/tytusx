import { Entorno } from "./Entorno"
import { Simbolo } from "./Simbolo";
import { Tipo } from "./Tipo";

export class TablaSimbolos {
    public entornoGlobal : Entorno

    constructor() { this.entornoGlobal = new Entorno(null) }

    public LlenarTabla(entornoPadre : Entorno, objetos) {
        var _this = this
        objetos.forEach(element => {
            var entornoObjeto = new Entorno(null)
            if (element.listaAtributos.length > 0) {
                element.listaAtributos.forEach(atributo => {
                    var simbolo = new Simbolo(Tipo.ATRIBUTO, atributo.identificador, atributo.linea, atributo.columna, atributo.valor)
                    entornoPadre.agregar(simbolo.getIndentificador(), simbolo)
                });
            }
            if (element.listaObjetos.length > 0) {
                _this.LlenarTabla(entornoObjeto, element.listaObjetos)
            }
            element.entorno = entornoObjeto
            var simbolo = new Simbolo(Tipo.STRUCT, element.identificador, element.linea, element.columna, element.valor)
            entornoPadre.agregar(simbolo.getIndentificador(), simbolo)
        });
    }

    public setEntornoGlobal(entorno : Entorno) {
        this.entornoGlobal = entorno
    }
}