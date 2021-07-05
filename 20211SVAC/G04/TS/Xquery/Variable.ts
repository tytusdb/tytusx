class Variable extends Instruccion implements BloqueFuncion{
    tipo:number;
    id:string;
    valorVariable:Expresion;
    ambito:string;
    constructor(tipo:number,id:string,valorVariable:Expresion,ambito:string){
        super(InstruccionTipos.VARIABLE);
        this.ambito = ambito;
        this.tipo = tipo;
        this.id = id;
        this.valorVariable = valorVariable;
    }
    tipoVariable():TiposDatos{
        return this.valorVariable.tipoDato;
    }
    tipoVariableTexto():string{
        let tipos = ["ENTERO","STRING","DECIMAL","BOOLEAN"];
        return tipos[this.valorVariable.tipoDato];
    }
    traspilar(): string {
        return `var ${this.id} = ${this.valorVariable.valor};`;
    }
    generarC3D(): string {
        throw new Error("Method not implemented.");
    }
}