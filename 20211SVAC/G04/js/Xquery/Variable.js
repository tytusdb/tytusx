class Variable extends Instruccion {
    constructor(tipo, id, valorVariable, ambito) {
        super(InstruccionTipos.VARIABLE);
        this.ambito = ambito;
        this.tipo = tipo;
        this.id = id;
        this.valorVariable = valorVariable;
    }
    tipoVariable() {
        return this.valorVariable.tipoDato;
    }
    traspilar() {
        throw new Error("Method not implemented.");
    }
    generarC3D() {
        throw new Error("Method not implemented.");
    }
}
