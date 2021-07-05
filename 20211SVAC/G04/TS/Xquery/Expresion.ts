class Expresion extends Instruccion implements BloqueFuncion,ValorVariable{
    tipoDato:TiposDatos;
    valor:string;
    constructor(tipoDato:TiposDatos,valor:string){
        super(InstruccionTipos.EXPRESION);
        this.tipoDato = tipoDato;
        this.valor = valor;
    }
    
    setValor(valor:string){
        this.valor = valor;
    }
    traspilarUltimo(): string {
        return "return "+this.valor+";";
    }

    traspilar(): string {
        return this.valor+";";
    }
    generarC3D(): string {
        throw new Error("Method not implemented.");
    }
}