import { simbolo } from "./simbolo"

export class entornoXml{
    public anterior: entornoXml
    public tabla: {[index: number] : simbolo}
    constructor(anterior){
        this.anterior = anterior
        this.tabla = {}
    }
    agregar(n:number,simbolo:simbolo){
        this.tabla[n] = simbolo
    }
    existeActual(n:number, id:string){
        let existe = this.tabla[n]
        if (existe != null && existe.id == id){
            return true
        }
        return false
    }
    existe(n:number,id:string){
        let ts:entornoXml = this
        while (ts != null){
            let existe = ts.tabla[n]
            if (existe != null && existe.id == id){
                return true
            }
            ts = ts.anterior
        }
        return false
    }
    getSimbol(n:number,id:string){
        let ts: entornoXml = this
        while (ts != null){
            let existe = ts.tabla[n]
            if (existe != null && existe.id == id){
                return existe
            }
            ts = ts.anterior
        }
        return null
    }
}