class ConsultaParent extends Consulta {

    constructor(type: TipoConsulta, id: string, filtros: Array<Filtro>) {
        super(type, id, filtros);
    }

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

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

    private addEntorno(entornos: Array<Entorno>, entorno: Entorno) {
        if (entornos.find(e => e === entorno) == undefined) {
            entornos.push(entorno);
        }
    }
}