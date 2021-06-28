import { Simbolo } from "./Simbolo"

export class Entorno {
    public tabla
    public anterior
    
    constructor(anterior) {
        this.tabla = {}
        this.anterior = anterior
    }
    
    public getAnterior() { return this.anterior }
    public getSimbolo(id : string) {
        id = id.toLowerCase()
        for (var e = this; e != null; e = e.anterior) {
            if (e.tabla[id] !== undefined) {
                return e.tabla[id]
            }
        }
        return null
    }

    public agregar(id : string, simbolo : Simbolo) {
        id = id.toLowerCase()
        simbolo.setIndentificador(simbolo.getIndentificador().toLowerCase())
        this.tabla[id] = simbolo
    }

    public eliminar(id : string) {
        id = id.toLowerCase()
        for (var e = this; e != null; e = e.anterior) {
            var value = e.tabla[id]
            if (value !== undefined) {
                delete e.tabla[id]
                return true
            }
        }
        return false
    }
    
    public existe(id : string) {
        id = id.toLowerCase()
        for (var e = this; e != null; e = e.anterior) {
            var value = e.tabla[id]
            if (value !== undefined) {
                return true
            }
        }
        return false
    }

    public existeEnActual(id : string) {
        id = id.toLowerCase()
        if (this.tabla[id] !== undefined) {
            return true
        }
        return false
    }

    public reemplazar(id : string, nuevoValor : string) {
        id = id.toLowerCase()
        for (var e = this; e != null; e = e.anterior) {
            var value = e.tabla[id]
            if (value !== undefined) {
                e.tabla[id] = nuevoValor
            }
        }
    }
}