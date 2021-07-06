class Expresion extends Instruccion {
    constructor(tipoDato, valor) {
        super(InstruccionTipos.EXPRESION);
        this.tipoDato = tipoDato;
        this.valor = valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    traspilarUltimo() {
        return "return " + this.valor + ";";
    }
    traspilar() {
        return this.valor + ";";
    }
    generarC3D() {
        throw new Error("Method not implemented.");
    }
}
