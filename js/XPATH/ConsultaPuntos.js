class ConsultaPuntos {
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach(e => {
            if (e.getAnterior() != null) {
                this.addEntorno(newEntornos, e.getAnterior());
            }
        });
        return newEntornos;
    }
    addEntorno(entornos, entorno) {
        if (entornos.find(e => e === entorno) == undefined) {
            entornos.push(entorno);
        }
    }
}
