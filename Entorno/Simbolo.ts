class Simbolo {

    private identificador: string;
    private value: any;
    private type:Type;
    private entorno: Entorno;
    private ambito: string;
    linea: number;
    columna: number;

    constructor(id: string, value:any, type:Type, ambito: string, linea: number, columna:number) {
        this.identificador = id;
        this.value = value;
        this.type = type;
        this.ambito = ambito;
        this.linea = linea;
        this.columna = columna;
    }

    public getType(): Type {
        return this.type;
    }

    public getAmbito(): string {
        return this.ambito;
    }

    public getImplicityValue() {
        return this.value;
    }

    public getEntorno(): Entorno {
        return this.entorno;
    }

    public setEntorno(entorno: Entorno): void {
        this.entorno = entorno;
    }
}