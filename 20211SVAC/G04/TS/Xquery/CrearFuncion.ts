class CrearFuncion extends Instruccion{
    id:string;
    listadoParametros:Array<Parametro>;
    tipoRetorno:TiposDatos;
    bloqueFuncion:Array<BloqueFuncion>;

    constructor(id:string,listadoParametros:Array<Parametro>,tipoRetorno:TiposDatos){
        super(InstruccionTipos.CREACION_FUNCION);
        this.id = id;
        this.listadoParametros = listadoParametros;
        this.tipoRetorno = tipoRetorno;
    }

    setBloquecodigo(bloqueCodigo:Array<BloqueFuncion>){
        this.bloqueFuncion = bloqueCodigo;
    }
    traspilar(): string {
        throw new Error("Method not implemented.");
    }
    generarC3D(): string {
        throw new Error("Method not implemented.");
    }

}