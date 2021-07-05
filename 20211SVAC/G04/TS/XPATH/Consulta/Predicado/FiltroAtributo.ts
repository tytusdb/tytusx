class FiltroAtributo implements Filtro {

    private idAtrib: string;
    private compare: string;

    constructor(idAtrib: string, compare: string) {
        this.idAtrib = idAtrib;
        this.compare = compare;
    }

    public filtrar(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

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