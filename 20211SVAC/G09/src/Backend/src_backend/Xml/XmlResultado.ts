import { Graficas } from "../Graficas/Graficas";
import { Etiqueta } from "./Etiqueta";
import { EtiquetaInicio } from "./EtiquetaInicio";
import { Tabla } from "./Tabla";

export class XmlResultado {
    etiquitaInicio: EtiquetaInicio
    etiquetasCuerpo: Array<Etiqueta>

    constructor(etiquitaInicio: EtiquetaInicio, etiquetasCuerpo: Array<Etiqueta>) {
        this.etiquitaInicio = etiquitaInicio
        this.etiquetasCuerpo = etiquetasCuerpo
    }
    
    imprimir():string {
        let texto:string = ""
        this.etiquetasCuerpo.forEach(etiqueta => {
            texto += etiqueta.imprimir()
        })
        return texto
    }

    getAsTable():Tabla {
        let tabla:Tabla = new Tabla()
        this.etiquetasCuerpo.forEach(etiqueta => {
            etiqueta.getAsTable().filas.forEach(fila => {
                tabla.addFila(fila)
            })
        })
        return tabla
    }

    getErroresSemanticos():string {
        let texto = ""
        this.etiquetasCuerpo.forEach(etiqueta => {
            texto += etiqueta.getErroresSemanticos()
        })
        return texto
    }

    getCstDotA():string {
        let texto = ""
        texto += "digraph {\n"
        texto += Graficas.defNodo(0, "XML")
        texto += Graficas.getElement(1, "TAG_CONFIGURACION", 0)
        texto += this.etiquitaInicio.getCstDotA(1)
        if (this.etiquetasCuerpo.length > 0) {
            let cont = 3
            for (let etiqueta of this.etiquetasCuerpo) {
                if (cont-3 != this.etiquetasCuerpo.length-1) {
                    texto += Graficas.getElement(cont, "LISTA_ETIQUETAS", cont+1)
                    texto += etiqueta.getCstDotA(cont)
                } else {
                    texto += Graficas.getElement(cont, "LISTA_ETIQUETAS", 0)
                    texto += etiqueta.getCstDotA(cont)
                }
                cont += 1
            }
        }
        texto += "}"
        return texto
    }

    getCstDotD():string {
        let texto = ""
        texto += "digraph {\n"
        texto += Graficas.defNodo(0, "XML")
        texto += Graficas.getElement(1, "TAG_CONFIGURACION", 0)
        texto += this.etiquitaInicio.getCstDotA(1)
        if (this.etiquetasCuerpo.length > 0) {
            let cont = 3
            for (let etiqueta of this.etiquetasCuerpo) {
                if (cont === 3) {
                    texto += Graficas.getElement(cont, "LISTA_ETIQUETAS", 0)
                    texto += etiqueta.getCstDotD(cont)
                } else {
                    texto += Graficas.getElement(cont, "LISTA_ETIQUETAS", cont-1)
                    texto += etiqueta.getCstDotD(cont)
                }
                cont += 1
            }
        }
        texto += "}"
        return texto
    }
}