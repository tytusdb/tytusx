import { updateFunctionExpression } from "typescript";
import { OpBinaria } from "../Xpath/OpBinaria";
import { Primitivo } from "../Xpath/Primitivo";
import { TipoSeleccion } from "../Xpath/TipoSeleccion";
import { TipoVal } from "../Xpath/TipoVal";
import { Fila } from "./Fila";

function sonAmbitosIguales(ambito1:string[], ambito2:string[]) {
    if (ambito1.length === ambito2.length) {
        for (let i = 0; i < ambito1.length; i++) {
            if (ambito1[i] != ambito2[i]) {
                return false
            }
        }
    } else {
        return false
    }
    return true
}

function esSimboloIgual(elemBusqueda: any, fila:Fila) {
    if (elemBusqueda.nombre == fila.nombre &&
        sonAmbitosIguales(elemBusqueda.listaAmbito, fila.listaAmbito)) {
            return true
    }
    return false
}

export class Tabla {
    filas:Array<Fila> = []

    constructor() {
    }

    addFila(fila:Fila) {
        this.filas.push(fila)
    }

    buscar(resXpath:any, elemBusqueda = {
        nombre: "",
        tipo: "",
        listaAmbito: ['GLOBAL'],
        selector: "/",
        inidiceRestringido: false,
        indice: 0
    }):string {
        let texto = "" 

        for (let set of resXpath) {
            if (set.tipo === TipoSeleccion.ACCESO_NODO_RAIZ && set.predicado == null) {
                for (let fila of this.filas) {
                    if (fila.nombre === set.id && fila.listaAmbito[0] === 'GLOBAL') {
                        texto += fila.valor
                    }
                }
            }
    
            if (set.tipo === TipoSeleccion.SELECT_NODOS_FROM_NODO) {
                elemBusqueda.nombre = set.id
                if (set.selector === "//" && elemBusqueda.listaAmbito.length === 1 && set.next == null) {
                    elemBusqueda.selector = "//"
                }

                if (set.predicado != null) {
                    let opBinaria: OpBinaria = set.predicado
                    let res:Primitivo = opBinaria.ejecutar()
                    if (res.tipo === TipoVal.ENTERO) {
                        elemBusqueda.inidiceRestringido = true
                        elemBusqueda.indice = res.valor - 1
                    }
                }

                if (set.next != null) {
                    elemBusqueda.listaAmbito.unshift(set.id)
                    texto += this.buscar([set.next], elemBusqueda)
                } else {
                    let cont = 0;
                    for (let fila of this.filas) {
                        if (esSimboloIgual(elemBusqueda, fila) || (elemBusqueda.listaAmbito.length === 1) && elemBusqueda.nombre === fila.nombre) {
                            let condicion = elemBusqueda.inidiceRestringido? cont === elemBusqueda.indice :true;
                            texto += fila.valor
                            cont += 1
                        }
                    }
                }
            }

            if (set.tipo === TipoSeleccion.SELECT_NODOS_FROM_NODO) {
                
            }

            elemBusqueda = {
                nombre: "",
                tipo: "",
                listaAmbito: ['GLOBAL'],
                selector:"/",
                inidiceRestringido: false,
                indice:0
            }
            texto += "\n"
        }
        return texto
    }

}