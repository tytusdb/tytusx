class LlamadaFuncion extends Instruccion implements BloqueFuncion,ValorVariable{
    id:string;
    listadoParametros:Array<string>;
    constructor(id:string,listadoParametros:Array<string>){
        super(InstruccionTipos.LLAMADA_FUNCION);
        this.id = id;
        this.listadoParametros = listadoParametros;
    }
    traspilar(): string {
        return  `${this.id}(${this.listadoParametros.join(",")});`;
    }

    generarC3D(): string {
        return "holi g3d en llamadafuncion";
    }
    static toInstruccion(funciones:Array<CrearFuncion>,){

    }
}