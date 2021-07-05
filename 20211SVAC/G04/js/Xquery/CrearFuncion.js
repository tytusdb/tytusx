class CrearFuncion extends Instruccion {
    constructor(id, listadoParametros, tipoRetorno) {
        super(InstruccionTipos.CREACION_FUNCION);
        this.id = id;
        this.listadoParametros = listadoParametros;
        this.tipoRetorno = tipoRetorno;
    }
    setBloquecodigo(bloqueCodigo) {
        this.bloqueFuncion = bloqueCodigo;
    }
    traspilar() {
        throw new Error("Method not implemented.");
    }
    generarC3D() {
        throw new Error("Method not implemented.");
    }
}
