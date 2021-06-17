class ConsultaText implements Consulta {

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach((e: Entorno) => {
            let flag: boolean = false;
            let nuevoEntorno: Entorno = new Entorno(e);
            e.getTable().forEach((s: Simbolo) => {
                if (s instanceof Nodo && !(s.getTexto() === "")) {
                    flag = true;
                    s.setShowTextOnly(true);
                    nuevoEntorno.add(s);
                }
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });

        return newEntornos;
    }
}