class ConsultaParent extends Consulta {
    constructor(type, id) {
        super(type, id);
    }
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach(e => {
            e.getAnterior().getTable().forEach(s => {
                if (s instanceof Nodo) {
                    if (s.getNombre() === super.getId()) {
                        this.addEntorno(newEntornos, e.getAnterior());
                    }
                }
            });
        });
        return newEntornos;
    }
    addEntorno(entornos, entorno) {
        if (entornos.find(e => e === entorno) == undefined) {
            entornos.push(entorno);
        }
    }
}
