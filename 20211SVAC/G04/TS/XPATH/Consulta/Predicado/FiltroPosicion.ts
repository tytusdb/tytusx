class FiltroPosicion implements Filtro {

    private posicion: string;
    private entornos: Array<Entorno>;

    constructor(posicion: string) {
        this.posicion = posicion;
    }

    public filtrar(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();
        let last = () => {return entornos.length}
        let expr = eval(this.posicion);

        if (expr <= last()) {
            newEntornos.push(entornos[expr-1]);
        }

        return newEntornos;
    }
}