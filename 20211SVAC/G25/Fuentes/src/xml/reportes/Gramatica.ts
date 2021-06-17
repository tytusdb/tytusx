class Gramatica {
    private produccion:String 
    private regla:String;

    constructor(produccion:String, regla:String){
        this.produccion = produccion;
        this.regla = regla;
    }

    getProduccion() {
        return this.produccion;
    }

    getRegla() {
        return this.regla;
    }
}