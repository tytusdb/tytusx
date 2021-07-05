class NodoComplemento extends Codigo3d{
    private salida: string;


    constructor(salida: string,linea: number, columna: number, ) {
        super(linea, columna);
        this.salida = salida;
    }

    public toString():string{
        return this.salida + "\n";
    }
}