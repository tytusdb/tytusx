import { Entorno } from "../AST/Entorno"
import { Tipo, TipoNodo, TipoSelector } from "../AST/Tipo"

export class NodoXpath {
    id : string
    tipo : any
    axes : any
    listaSelectores : []
    expresion : any
    linea : number
    columna : number
    global : any
    resultado : any

    constructor(tipo : any, axes : any, listaSelectores : any, expresion : any, linea : number, columna: number) {
        this.id = ""
        this.tipo = tipo
        this.axes = axes
        this.listaSelectores = listaSelectores
        this.expresion = expresion
        this.linea = linea
        this.columna = columna
        this.global = null
        this.resultado = null
    }

    public getId() : string { return this.id }
    public setId(id : string) : void { this.id = id }
    public getTipo() : any { return this.tipo }
    public setTipo(tipo : any) : void { this.tipo = tipo }
    public getAxes() : any { return this.axes }
    public setAxes(axes : any) : void { this.axes = axes }
    public getListaSelectores() : any { return this.listaSelectores }
    public setListaSelectores(listaSelectores : any) : void { this.listaSelectores = listaSelectores }
    public getExpresion() : any { return this.expresion }
    public setExpresion(expresion : any) : void { this.expresion = expresion }
    public getLinea() : number { return this.linea }
    public setLinea(linea : number) : void { this.linea = linea }
    public getColumna() : number { return this.columna }
    public setColumna(columna : number) : void { this.columna = columna }
    public getGlobal() : any { return this.global }
    public setGlobal(global : any) : any { this.global = global }
    public getResultado() : any { return this.resultado }
    public setResultado(resultado : any) : any { this.resultado = resultado }

    public agregarSelect(selector) : void { this.listaSelectores.push(selector) }
    public containsAny(source, target) : boolean {
        var res = source.filter(item => { return  target.indexof(item) > 1 })
        return res.length > 0
    }
    public getValorImplicito(ent : Entorno[]) {
        if (ent.length < 1) return [[], []]

        if ((this.getTipo() == TipoNodo.SELECTOR_EXPRESION) || (this.getTipo() == TipoNodo.SELECTOR_AXES)) {
            var entornoActual = ent
            var busquedaGlobal = 13

            this.listaSelectores.forEach(selector => {
                if (selector == TipoSelector.DOBLE_SLASH ||
                    selector == TipoSelector.PUNTO_DOSSLASH) {
                        busquedaGlobal = 14
                    } 
                else if (selector == TipoSelector.DOSPUNTOS_DOSSLASH ||
                    selector == TipoSelector.DOSPUNTOS_SLASH) {
                        var entornoAux = []
                        entornoActual.forEach(entorno => {
                            if (entorno.getAnterior() != null) {
                                if (EntornoYaExiste(entornoAux, entorno.getAnterior().getId()) == false) {
                                    entornoAux.push(entorno.getAnterior())
                                }
                            }
                        });

                        if (entornoAux.length > 0) {
                            if (selector == TipoSelector.DOSPUNTOS_DOSSLASH) {
                                busquedaGlobal = 14
                                entornoActual = this.getGlobal()
                            } else {
                                entornoActual = entornoAux
                            }
                        } else {
                            return [[],[]]
                        }
                    }
            });

            if (this.getTipo() == TipoNodo.SELECTOR_EXPRESION) {
                this.resultado = this.expresionXpath.getValorImplicito(entornoActual, busquedaGlobal)
                return this.resultado
            } else if (this.getTipo() == TipoNodo.SELECTOR_AXES) {
                this.resultado = this.axes.getValorImplicito(entornoActual, this.getGlobal(), busquedaGlobal)
                return this.resultado
            }
        } else if (this.getTipo() == TipoNodo.EXPRESION) {
            this.resultado = this.expresionXpath.getValorImplicito(ent, 13)
            return this.resultado
        } else if (this.getTipo() == TipoNodo.AXES) {
            this.resultado = this.axes.getValorImplicito(ent, this.getGlobal(), 13)
            return this.resultado
        }
    }
}