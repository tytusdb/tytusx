class LlamadaFuncion extends Instruccion implements BloqueFuncion,ValorVariable{
    id:string;
    listadoParametros:Array<string>;
    constructor(id:string,listadoParametros:Array<string>){
        super(InstruccionTipos.LLAMADA_FUNCION);
        this.id = id;
        this.listadoParametros = listadoParametros;
    }
    traspilar(): string {
        throw new Error("Method not implemented.");
    }
    generarC3D(): string {
        throw new Error("Method not implemented.");
    }
    static toInstruccion(funciones:Array<CrearFuncion>,){

    }
}