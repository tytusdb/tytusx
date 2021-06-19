import { simbolo } from "./simbolo"

export class entorno{
    public anterior: entorno
    public tabla: {[id:string] : simbolo}
    public consola: string
    constructor(anterior){
        this.anterior = anterior
        this.tabla = {}
        this.consola = ""
    }
    agregar(id:string,simbolo:simbolo){
        this.tabla[id.toLocaleLowerCase()] = simbolo
    }
    existeActual(id:string){
        let existe = this.tabla[id.toLocaleLowerCase()]
        if (existe != null){
            return true
        }
        return false
    }
    existe(id:string){
        let ts:entorno = this
        while (ts != null){
            let existe = ts.tabla[id.toLocaleLowerCase()]
            if (existe != null){
                return true
            }
            ts = ts.anterior
        }
        return false
    }
    getSimbol(id:string){
        let ts: entorno = this
        while (ts != null){
            let existe = ts.tabla[id.toLocaleLowerCase()]
            if (existe != null){
                return existe
            }
            ts = ts.anterior
        }
        return null
    }
    appEnd(cadena: string){
        return this.consola+= cadena + "\n"
    }
}