abstract class Instruccion {
    tipo:InstruccionTipos;
    constructor(tipo:InstruccionTipos){
        this.tipo = tipo;
    }
    abstract traspilar ():string;
    abstract generarC3D():string;
}