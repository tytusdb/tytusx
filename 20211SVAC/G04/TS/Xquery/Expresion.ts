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
    traspilar(): string {
        throw new Error("Method not implemented.");
    }
    generarC3D(): string {
        throw new Error("Method not implemented.");
    }
}