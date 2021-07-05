class Else{
    tipoElse:ElseTipos;
    instruccionElse:Instruccion;
    constructor(valorVariable:Instruccion){
        if(valorVariable == null)this.tipoElse = ElseTipos.VACIO;else this.tipoElse = ElseTipos.NO_VACIO;
        this.instruccionElse  = valorVariable;
    }
}