class LlamadaFuncion extends Instruccion {
    constructor(id, listadoParametros) {
        super(InstruccionTipos.LLAMADA_FUNCION);
        this.id = id;
        this.listadoParametros = listadoParametros;
    }
    traspilar() {
        return `${this.id}(${this.listadoParametros.join(",")});`;
    }
    generarC3D() {
        return "holi g3d en llamadafuncion";
    }
    static toInstruccion(funciones) {
    }
}
