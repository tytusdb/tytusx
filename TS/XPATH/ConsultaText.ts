class ConsultaText implements Consulta {

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        console.log(entornos);
        entornos.forEach((e: Entorno) => {
            let flag: boolean = false;
            let nuevoEntorno: Entorno = new Entorno(e);
            e.getTable().forEach((s: Simbolo) => {
                //Recorro los simbolos viendo si tienen texto
                if (s instanceof Nodo && !(s.getTexto() === "")) {
                    //recorro los simbolos de el entorno anterior
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