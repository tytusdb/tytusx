class ConsultaPreceding extends Consulta {

    private ignorarNodos: boolean;

    constructor(type: TipoConsulta, id: string) {
        super(type, id);
        this.ignorarNodos = true;
    }

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        let ignoreNode: Nodo;

        entornos[entornos.length - 1].getTable().reverse().forEach(s => {
            if (s instanceof Nodo) {
                if (ignoreNode == null) {
                    ignoreNode = s;
                }
            }
        });

        let entRaiz: Entorno = entornos[entornos.length - 1];
        while (entRaiz.getAnterior() != null) {
            entRaiz = entRaiz.getAnterior();
        }

        entornos = [entRaiz]
        entornos.reverse().forEach(e => {
            this.busquedaDescendente(e, newEntornos, ignoreNode);
        });


        return newEntornos;
    }

    public busquedaDescendente(entorno: Entorno, newEntornos: Array<Entorno>, ignoreNode: Nodo): void {
        let addEntorno: boolean = false;
        let nuevoEntorno: Entorno = new Entorno(entorno.getAnterior());
        entorno.getTable().reverse().forEach(s => {
            if (s instanceof Nodo) {
                if(super.getId() === "*" && !this.ignorarNodos) {
                    addEntorno = true;
                    s.getEntorno().getTable().reverse();
                    nuevoEntorno.getTable().unshift(s);
                }
                if (s.getNombre() === super.getId() && !this.ignorarNodos) {
                    s.getEntorno().getTable().reverse();
                    addEntorno = true;
                    nuevoEntorno.getTable().unshift(s);
                }
                this.busquedaDescendente(s.getEntorno(), newEntornos, ignoreNode);
            }
            if (s === ignoreNode) {
                this.ignorarNodos = false;
            }
        });
        if (addEntorno) {
            newEntornos.unshift(nuevoEntorno);
        }
    }
}