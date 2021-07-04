import { EntornoXML } from "./EntornoXML";
import { Tipo } from "./Tipo";

export class ReporteTablaSimbolos {
    public arreglo: any[];
    constructor () { this.arreglo = [] }

    limpiararreglo() : void { this.arreglo = [] }

    public GenerarArreglo(entornoPadre : EntornoXML, nombreAmbito : string) : void {
        entornoPadre.geTabla().forEach(simbolo => {
            var atributoAux = {
                Nombre: simbolo.getIndentificador(),
                Tipo: "Atributo",
                Ambito: nombreAmbito,
                Fila: simbolo.getLinea(),
                Columna: simbolo.getColumna()
            }

            if (simbolo.getTipo() == Tipo.ATRIBUTO) {
                this.arreglo.push(atributoAux)
            } else if (simbolo.getTipo() == Tipo.STRUCT) {
                atributoAux = { ...atributoAux, Tipo: "Objeto" }
                this.arreglo.push(atributoAux)
                this.GenerarArreglo(simbolo.getValor().getEntorno(), simbolo.getIndentificador())
            }
        });
    }
}