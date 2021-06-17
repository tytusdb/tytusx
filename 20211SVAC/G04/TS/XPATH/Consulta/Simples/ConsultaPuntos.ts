class ConsultaPuntos implements Consulta {

    public run (entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach(e => {
            if (e.getAnterior() != null) {
                this.addEntorno(newEntornos, e.getAnterior());
            }
        });

        return newEntornos
    }

    private addEntorno(entornos: Array<Entorno>, entorno: Entorno) {
        if (entornos.find(e => e === entorno) == undefined) {
            entornos.push(entorno);
        }
    }
}