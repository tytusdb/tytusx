class FiltroHijo {
    constructor(idHijo, txtHijo) {
        this.idHijo = idHijo;
        this.txtHijo = txtHijo;
    }
    filtrar(entornos) {
        let newEntornos = new Array();
        entornos.forEach(e => {
            e.getTable().forEach(s => {
                if (s instanceof Nodo) {
                    s.getEntorno().getTable().forEach(s => {
                        if (s instanceof Nodo) {
                            if (s.getNombre() === this.idHijo && s.getTexto() === this.txtHijo) {
                                newEntornos.push(e);
                            }
                        }
                    });
                }
            });
        });
        return newEntornos;
    }
}
