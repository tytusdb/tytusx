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
    tipoVariableTexto() {
        let tipos = ["ENTERO", "STRING", "DECIMAL", "BOOLEAN"];
        return tipos[this.valorVariable.tipoDato];
    }
    traspilar() {
        return `var ${this.id} = ${this.valorVariable.valor};`;
    }
    generarC3D() {
        throw new Error("Method not implemented.");
    }
}
