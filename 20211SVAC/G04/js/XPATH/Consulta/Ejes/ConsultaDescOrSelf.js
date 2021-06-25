class ConsultaDescOrSelf extends Consulta {
    constructor(type, id) {
        super(type, id);
    }
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach(e => {
            this.busquedaDescendente(e, newEntornos);
        });
        return newEntornos;
    }
    busquedaDescendente(entorno, newEntornos) {
        let flag = false;
        let nuevoEntorno = new Entorno(entorno.getAnterior());
        entorno.getTable().forEach(s => {
            if (s instanceof Nodo && s.getNombre() === super.getId()) {
                flag = true;
                nuevoEntorno.add(s);
            }
        });
        if (flag) {
            newEntornos.push(nuevoEntorno);
        }
        entorno.getTable().forEach(s => {
            if (s instanceof Nodo) {
                this.busquedaDescendente(s.getEntorno(), newEntornos);
            }
        });
    }
}
