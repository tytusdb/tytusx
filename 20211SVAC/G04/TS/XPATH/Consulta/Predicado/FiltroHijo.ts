class FiltroHijo implements Filtro {

    private idHijo: string;
    private txtHijo: string;

    constructor(idHijo: string, txtHijo: string) {
        this.idHijo = idHijo;
        this.txtHijo = txtHijo;
    }

    public filtrar(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

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