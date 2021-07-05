class Else {
    constructor(valorVariable) {
        if (valorVariable == null)
            this.tipoElse = ElseTipos.VACIO;
        else
            this.tipoElse = ElseTipos.NO_VACIO;
        this.instruccionElse = valorVariable;
    }
}
