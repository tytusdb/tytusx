import { EntornoXML } from "./EntornoXML";
import { Simbolo } from "./Simbolo";
import { Tipo } from "./Tipo";

export class TablaSimbolosXML {
    public entornoGlobal : EntornoXML

    constructor() { this.entornoGlobal = new EntornoXML(null) }

    public LlenarTabla(entornoPadre : EntornoXML, objetos) {
        var _this = this
        // TODO: IDentorno & Idobj -> Globales.ts
        objetos.forEach(element => {
            var entornoObjeto = new EntornoXML(null)

            entornoObjeto.setId(IDentorno)
            IDentorno++;
            element.SetearID(IDobj)
            IDobj++
            if (element.listaAtributos.length > 0) {
                element.listaAtributos.forEach(atributo => {
                    var simbolo = new Simbolo(Tipo.ATRIBUTO, atributo.identificador, atributo.linea, atributo.columna, atributo.valor)
                    entornoObjeto.agregar(simbolo)
                });
            }
            if (element.listaObjetos.length > 0) {
                _this.LlenarTabla(entornoObjeto, element.listaObjetos)
            }
            element.entorno = entornoObjeto
            var simbolo = new Simbolo(Tipo.STRUCT, element.identificador, element.linea, element.columna, element.valor)
            entornoPadre.agregar(simbolo)
            entornoObjeto.setAnterior(entornoPadre)
        });
    }

    public setEntornoGlobal(entorno : EntornoXML) {
        this.entornoGlobal = entorno
    }

    public getEntornoGlobal() : EntornoXML { return this.entornoGlobal }
}