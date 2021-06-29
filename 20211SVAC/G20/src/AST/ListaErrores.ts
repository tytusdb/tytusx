import { Error } from "./Error"

export class ListaErrores {
    public errores : Error[]
    constructor() {
        this.errores = []
    }
    limpiarArreglo() {
        this.errores = []
    }
    agregarError(error: Error) {
        this.errores.push(error)
    }
    getErrores() : string {
        var concatena = ""
        if (this.errores.length > 0) {
            this.errores.forEach(element => {
                concatena += `${element.getNo()}. Fila: ${element.getFila()} Columna: ${element.getColumna()} Tipo: ${element.getTipo()} Descripcion ${element.getDescripcion()}\n`
            });
        } else concatena = "No se encontraron erroes"
        return concatena
    }
}