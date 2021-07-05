class FiltroPosicion {
    constructor(posicion) {
        this.posicion = posicion;
    }
    filtrar(entornos) {
        let newEntornos = new Array();
        let last = () => { return entornos.length; };
        let expr = eval(this.posicion);
        if (expr <= last()) {
            newEntornos.push(entornos[expr - 1]);
        }
        return newEntornos;
    }
}
