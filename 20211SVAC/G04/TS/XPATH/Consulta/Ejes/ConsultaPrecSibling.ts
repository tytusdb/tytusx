class ConsultaPrecSibling implements Consulta {

    private id: string;
    private ignorarNodos: boolean;

    constructor(id: string) {
        this.id = id;
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

        let parent: ConsultaPuntos = new ConsultaPuntos();
        entornos = parent.run(entornos);
        entornos = this.getHijos(entornos);

        entornos.forEach((e: Entorno) => {
            let flag: boolean = false;
            let nuevoEntorno: Entorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s: Simbolo) => {
                if (s instanceof Nodo) {
                    if (this.id === "*" && !this.ignorarNodos) {
                        flag = true;
                        nuevoEntorno.add(s);
                    } else if (s.getNombre() == this.id && !this.ignorarNodos) {
                        flag = true;
                        nuevoEntorno.add(s);
                    }
                    if (s === ignoreNode) {
                        this.ignorarNodos = false;
                    }
                }
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });

        return newEntornos;
    }

    private getHijos(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();
        entornos.forEach((e: Entorno) => {
            e.getTable().forEach((s: Simbolo) => {
                if (s instanceof Nodo) {
                    if ((s as Nodo).getEntorno != null) {
                        let nuevoEntorno: Entorno = (<Nodo>s).getEntorno();
                        nuevoEntorno.setAnterior(e);
                        newEntornos.push(nuevoEntorno);
                    }
                }
            });
        });
        return newEntornos;
    }
}