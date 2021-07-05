class LlamadaFuncion extends Instruccion {
    constructor(id, listadoParametros) {
        super(InstruccionTipos.LLAMADA_FUNCION);
        this.id = id;
        this.listadoParametros = listadoParametros;
    }
    traspilar() {
        throw new Error("Method not implemented.");
    }
    generarC3D() {
        throw new Error("Method not implemented.");
    }
    static toInstruccion(funciones) {
    }
}
