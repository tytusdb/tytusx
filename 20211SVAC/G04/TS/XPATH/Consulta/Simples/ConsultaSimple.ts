class ConsultaSimple implements Consulta {

    private identificador: string;

    constructor(id: string) {
        this.identificador = id;
    }

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();
        entornos.forEach((e: Entorno) => {
            let flag: boolean = false;
            let nuevoEntorno: Entorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s: Simbolo) => {
                if (s instanceof Nodo) {
                    if (this.identificador === "*") {
                        flag = true;
                        nuevoEntorno.add(s);
                    } else if (s.getNombre() == this.identificador) {
                        flag = true;
                        nuevoEntorno.add(s);
                    }
                }
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });
        return newEntornos;
    }

    getIdentificador() {
        return this.identificador;
    }
}