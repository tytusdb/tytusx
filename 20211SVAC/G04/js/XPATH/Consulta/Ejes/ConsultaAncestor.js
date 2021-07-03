class ConsultaAncestor extends Consulta {
    constructor(type, id, filtros) {
        super(type, id, filtros);
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
