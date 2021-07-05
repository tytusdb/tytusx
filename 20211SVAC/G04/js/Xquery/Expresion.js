class Expresion extends Instruccion {
    constructor(tipoDato, valor) {
        super(InstruccionTipos.EXPRESION);
        this.tipoDato = tipoDato;
        this.valor = valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    traspilar() {
        throw new Error("Method not implemented.");
    }
    generarC3D() {
        throw new Error("Method not implemented.");
    }
}
