class FiltroAtributo {
    constructor(idAtrib, compare) {
        this.idAtrib = idAtrib;
        this.compare = compare;
    }
    filtrar(entornos) {
        let newEntornos = new Array();
        entornos.forEach(e => {
            e.getTable().forEach(s => {
                if (s instanceof Nodo) {
                    s.getEntorno().getTable().forEach(s => {
                        if (s instanceof Atributo) {
                            if (s.getNombre() === this.idAtrib && s.getValor() === this.compare) {
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
