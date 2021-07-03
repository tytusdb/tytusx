class ReporteGramatical {
    constructor() {
        this.listadoGramatical = new Array();
    }
    run(raiz) {
        this.recursiva(raiz);
        return this.listadoGramatical;
    }
    recursiva(entrada) {
        if (entrada instanceof NodoPadre) {
            if (entrada.getProduccion() != "")
                this.listadoGramatical.push([entrada.getProduccion(), entrada.getReglaSemantica()]);
            entrada.getHijos().forEach(e => {
                this.recursiva(e);
            });
        }
        if (entrada instanceof NodoHijo) {
            if (entrada.getProduccion() != "")
                this.listadoGramatical.push([entrada.getProduccion(), entrada.getReglaSemantica()]);
        }
    }
}
