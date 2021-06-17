class ConsultaFollowing implements Consulta {

    private id: string;
    private ignorarNodos: boolean;

    constructor(id: string) {
        this.id = id;
        this.ignorarNodos = true;
    }

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        let ignoreNode: Nodo;

        entornos[0].getTable().forEach(s => {
            if (s instanceof Nodo) {
                if (ignoreNode == null) {
                    ignoreNode = s;
                }
            }
        });

        let entRaiz: Entorno = entornos[0];
        while (entRaiz.getAnterior() != null) {
            entRaiz = entRaiz.getAnterior();
        }

        entornos = [entRaiz]
        entornos.forEach(e => {
            this.busquedaDescendente(e, newEntornos, ignoreNode);
        });


        return newEntornos;
    }

    public busquedaDescendente(entorno: Entorno, newEntornos: Array<Entorno>, ignoreNode: Nodo): void {
        let addEntorno: boolean = false;
        let nuevoEntorno: Entorno = new Entorno(entorno.getAnterior());
        entorno.getTable().forEach(s => {
            if (s instanceof Nodo) {
                if(this.id === "*" && !this.ignorarNodos) {
                    addEntorno = true;
                    nuevoEntorno.add(s);
                }
                if (s.getNombre() === this.id && !this.ignorarNodos) {
                    addEntorno = true;
                    nuevoEntorno.add(s);
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

        entorno.getTable().forEach(s => {
        });
    }
}