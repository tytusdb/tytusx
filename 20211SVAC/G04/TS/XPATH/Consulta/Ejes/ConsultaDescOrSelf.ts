class ConsultaDescOrSelf extends Consulta {

    constructor(type: TipoConsulta, id: string) {
        super(type, id);
    }

    run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach(e => {
            this.busquedaDescendente(e, newEntornos);
        });

        return newEntornos;
    }

    public busquedaDescendente(entorno: Entorno, newEntornos: Array<Entorno>): void {
        let flag: boolean = false;
        let nuevoEntorno: Entorno = new Entorno(entorno.getAnterior());
        entorno.getTable().forEach(s => {
            if (s instanceof Nodo && s.getNombre() === super.getId()) {
                flag = true;
                nuevoEntorno.add(s);
            }
        });
        if (flag) {
            newEntornos.push(nuevoEntorno);
        }

        entorno.getTable().forEach(s => {
            if (s instanceof Nodo) {
                this.busquedaDescendente(s.getEntorno(), newEntornos);
            }
        });
    }
}