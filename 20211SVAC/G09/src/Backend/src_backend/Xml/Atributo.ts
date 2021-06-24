import { Graficas } from "../Graficas/Graficas"
import { Etiqueta } from "./Etiqueta"
import { Fila } from "./Fila"
import { Tipos } from "./Tipos"

export class Atributo {
    nombre:string
    valor:string
    linea:number
    columna:number
    idSent:number
    etiquetaContendora:Etiqueta = null
    constructor(nombre:string, valor:string, linea:number, columna:number, idSent:number) {
        this.nombre = nombre
        this.valor = valor
        this.linea = linea 
        this.columna = columna 
        this.idSent = idSent
    }

    getAmbito():Array<string> {
        let listaAmbito:Array<string> = []
        for(let etiqueta:Etiqueta = this.etiquetaContendora; etiqueta != null; etiqueta = etiqueta.padre) {
            listaAmbito.push(etiqueta.getName())
        }   
        listaAmbito.push("GLOBAL")
        return listaAmbito
    }

    getAsRowTable() {
        return(new Fila(
            this.nombre,
            Tipos.ATRIBUTO,
            this.getAmbito(),
            this.linea,
            this.columna,
            this.imprimir()
        ))
    }

    imprimir():string {
        let texto:string  = ""
        texto = this.nombre + "=" + this.valor
        return texto
    }

    getCstDotA(idPadre:number):string {
        let texto = ""
        texto += Graficas.getElement(this.idSent, "ATRIBUTO", idPadre)
        texto += Graficas.getElement(this.idSent+1, "NombreAtributo", this.idSent)
        texto += Graficas.getElement(this.idSent+2, this.nombre, this.idSent+1)
        texto += Graficas.getElement(this.idSent+4, "IgualAtributo", this.idSent)
        texto += Graficas.getElement(this.idSent+5, "=", this.idSent+4)
        texto += Graficas.getElement(this.idSent+6, "ValorAtributo", this.idSent)
        texto += Graficas.getElement(this.idSent+7, this.valor.split("\"").join(""), this.idSent+6)
        return texto
    }
}