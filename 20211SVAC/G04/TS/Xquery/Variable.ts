class Variable extends Instruccion implements BloqueFuncion{
    tipo:number;
    id:string;
    valorVariable:ValorVariable;
    ambito:string;
    constructor(tipo:number,id:string,valorVariable:ValorVariable,ambito:string){
        super(InstruccionTipos.VARIABLE);
        this.ambito = ambito;
        this.tipo = tipo;
        this.id = id;
        this.valorVariable = valorVariable;
    }
    tipoVariable():TiposDatos{
        return (this.valorVariable as Expresion).tipoDato;
    }
    traspilar(): string {
        throw new Error("Method not implemented.");
    }
    generarC3D(): string {
        throw new Error("Method not implemented.");
    }
}