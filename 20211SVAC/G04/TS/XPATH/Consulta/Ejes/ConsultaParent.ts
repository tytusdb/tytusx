class ConsultaParent implements Consulta {

    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach(e => {

            e.getAnterior().getTable().forEach(s => {
                if (s instanceof Nodo) {
                    if (s.getNombre() === this.id) {
                        this.addEntorno(newEntornos, e.getAnterior());
                    }
                }
            });

        });

        return newEntornos;
    }

    private addEntorno(entornos: Array<Entorno>, entorno: Entorno) {
        if (entornos.find(e => e === entorno) == undefined) {
            entornos.push(entorno);
        }
    }
}