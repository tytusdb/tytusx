class ConsultaSimple extends Consulta {


    constructor(type: TipoConsulta, id: string) {
        super(type, id);
    }

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();
        entornos.forEach((e: Entorno) => {
            let flag: boolean = false;
            let nuevoEntorno: Entorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s: Simbolo) => {
                if (s instanceof Nodo) {
                    if (super.getId() === "*") {
                        flag = true;
                        nuevoEntorno.add(s);
                    } else if (s.getNombre() == super.getId()) {
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
}