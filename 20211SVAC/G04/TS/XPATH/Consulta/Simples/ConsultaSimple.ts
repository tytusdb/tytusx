class ConsultaSimple extends Consulta {

    private isDescendant: boolean;

    public constructor(type: TipoConsulta, id: string, filtros: Array<Filtro>);

    public constructor(type: TipoConsulta, id: string, filtros: Array<Filtro>, isDescendant: boolean);

    public constructor(...args: Array<any>) {
        if (args.length === 3) {
            super(args[0], args[1], args[2]);
            return;
        }
        if (args.length === 4) {
            super(args[0], args[1], args[2]);
            this.isDescendant = args[3];
            return;
        }
    }

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();
        entornos.forEach((e: Entorno) => {
            this.busqueda(e, newEntornos);
        });
        super.getFiltros().forEach(f => {newEntornos = f.filtrar(newEntornos)});
        return newEntornos;
    }

    private busqueda(e: Entorno, newEntornos: Array<Entorno>): void {
        e.getTable().forEach((s: Simbolo) => {
            if (s instanceof Nodo) {
                if (super.getId() === "*") {
                    this.addEntorno(newEntornos, e, s);
                } else if (s.getNombre() == super.getId()) {
                    this.addEntorno(newEntornos, e, s);
                }
                if (this.isDescendant) {
                    this.busqueda(s.getEntorno(), newEntornos);
                }
            }
        });
    }

    private addEntorno(entornos: Array<Entorno>, anterior: Entorno, simbolo: Simbolo) {
        let nuevoEntorno: Entorno = new Entorno(anterior.getAnterior());
        nuevoEntorno.add(simbolo);
        entornos.push(nuevoEntorno);
    }
}