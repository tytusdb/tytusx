class ConsultaSelf {

    public run(entornos: Array<Entorno>, id: string): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach(e => {
            let flag: boolean = false;
            let nuevoEntorno: Entorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s: Simbolo) => {
                if (s.getNombre() === id && s instanceof Nodo) {
                    flag = true;
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