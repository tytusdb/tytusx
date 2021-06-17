class ConsultaNode {
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            let flag = false;
            let nuevoEntorno = new Entorno(e);
            e.getTable().forEach((s) => {
                if (s instanceof Nodo) {
                    if (!(s.getTexto() === "")) {
                        flag = true;
                        s.setShowTextOnly(true);
                        nuevoEntorno.add(s);
                    }
                    s.getEntorno().getTable().forEach(ss => {
                        if (ss instanceof Nodo) {
                            flag = true;
                            nuevoEntorno.add(ss);
                        }
                    });
                }
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });
        return newEntornos;
    }
}
