export interface RepGramatical {
    produccion: string,
    regla: string
}

export class Gramatical {
    public listaReporte: Array<RepGramatical>
    constructor() {
        this.listaReporte = []
    }

    agregar(producccion: string, regla: string) {
        let objetoReporte: RepGramatical = {
            produccion: producccion,
            regla: regla
        }
        this.listaReporte.push(objetoReporte)
    }
}
